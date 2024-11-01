import { parse } from 'comment-parser'
import esprima from 'esprima'
import fs from 'fs'
import { generateMD } from './generate'
import { getFileType } from './utils'

function getFormatJsdoc(comment: string): {
  description: string
  returnType: string
  args: any[]
} {
  const [jsdoc] = parse(comment)

  const returns = jsdoc.tags.find((item) => item.tag === 'returns')
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

export function jsdocToMD(options: { entry: string; output: string }) {
  const { entry, output } = options
  const file = fs.readFileSync(entry, 'utf-8')
  const fileType = getFileType(entry)

  const parsedFiles = parseFile(file)

  const mds = parsedFiles.map((file) => {
    const { comment, content } = file

    const { description, returnType, args } = getFormatJsdoc(comment)
    const functionName = getFunctionName(content)

    return generateMD({ functionName, content, description, returnType, args, fileType })
  })

  fs.writeFileSync(output, mds.join('\n').trim(), 'utf-8')
}
