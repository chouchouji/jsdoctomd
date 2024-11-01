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
}): string {
  const { functionName, description, content, args, returnType, fileType } = func

  return `
# ${functionName}
      
${description}
      
\`\`\`${fileType}
${content.trim()}
\`\`\`
      
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
