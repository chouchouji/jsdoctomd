function formatType(types: string) {
  if (types.includes('|')) {
    return types.split('|').map((type) => type.trim())
  }

  return [types]
}

export function generateMD(func: {
  functionName: string
  description: string
  content: string
  args: any[]
  returnType: string
  fileType: string
  example: string
}): string {
  const { functionName, description, content, args, returnType, fileType, example } = func

  return `
# ${functionName}
      
${description}

### Source Code
      
\`\`\`${fileType}
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
