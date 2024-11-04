import { generateFunction } from './type'

function formatType(types: string) {
  if (types.includes('|')) {
    return types.split('|').map((type) => type.trim())
  }

  return [types]
}

export function generateMD(func: generateFunction): string {
  const { functionName, description, content, args, returnType, extname, example } = func

  return `
# ${functionName}
      
${description}

### Source Code
      
\`\`\`${extname}
${content.trim()}
\`\`\`

### Usage

${example}
      
### Arguments
      
| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
${args.map((item) => `| \`${item.name}\` | ${'_' + formatType(item.type).join(' \\| ') + '_'} | \`${item.optional}\` | \`${item.default}\` | \`${item.desc}\` |`).join('\n')}
      
### Returns

| Type |
| ---  |
| ${returnType}  |
`
}
