import { parse } from 'comment-parser'
import esprima from 'esprima'
import { generateMD } from './generate'
import { isEmpty } from './utils'

function formatExample(sources: string[]) {
  if (isEmpty(sources)) {
    return ''
  }

  return sources
    .filter((item) => !item.includes('@example'))
    .map((item) => item.slice(3))
    .join('\n')
}

function getFormatJsdoc(comment: string): {
  description: string
  returnType: string
  args: any[]
  example: string
} {
  const [jsdoc] = parse(comment)

  const returns = jsdoc.tags.find((item) => item.tag === 'returns')
  const example = jsdoc.tags.find((item) => item.tag === 'example')
  const args = jsdoc.tags
    .filter((item) => item.tag === 'param')
    .map((item) => ({
      name: item.name,
      type: item.type,
      optional: item.optional,
      default: item.default,
      desc: item.description,
    }))

  return {
    description: jsdoc.description,
    returnType: returns?.type || 'void',
    example: example?.source ? formatExample(example.source.map((item) => item.source)) : '',
    args,
  }
}

function getFunctionName(content: string): string {
  const tokens = esprima.tokenize(content)

  let functionName = ''
  let lastToken: { type: string; value: string } = { type: '', value: '' }
  for (let i = 0; i < tokens.length; i++) {
    if (i >= 1) {
      lastToken = tokens[i - 1]
    }

    const { type, value } = lastToken
    const isFunction = type === 'Keyword' && ['function', 'const'].includes(value)

    if (tokens[i].type === 'Identifier' && isFunction) {
      functionName = tokens[i].value
      break
    }
  }

  return functionName
}

function parseFile(file: string) {
  const codes = file.split('\n')
  const length = codes.length - 1

  const result: { comment: string; content: string }[] = []

  let comment = ''
  let content = ''

  codes.forEach((code, idx) => {
    if (code === '/**' || idx === length) {
      if (content && comment) {
        result.push({
          comment,
          content,
        })
      }

      comment = '/**\n'
      content = ''
    } else if (comment && (code.startsWith(' * ') || code.startsWith(' */'))) {
      comment += `${code}\n`
    } else if (!code.startsWith(' * ') || !code.startsWith(' */')) {
      content += `${code}\n`
    }
  })

  return result.filter(Boolean)
}

export function jsdocToMD(options: { input: string; extname: string }) {
  const { input, extname } = options

  const parsedFiles = parseFile(input)

  const mds = parsedFiles.map((file) => {
    const { comment, content } = file

    const { description, returnType, args, example } = getFormatJsdoc(comment)
    const functionName = getFunctionName(content)

    return generateMD({ functionName, content, description, returnType, args, extname, example })
  })

  return mds.join('\n').trim()
}
