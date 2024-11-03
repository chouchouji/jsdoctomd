import fs from 'fs'
import { fileURLToPath } from 'url'
import { jsdocToMD } from '@binbinji/jsdoctomd'

function generateMD() {
  const examplePath = fileURLToPath(new URL('../example', import.meta.url))
  const docsPath = fileURLToPath(new URL('../docs', import.meta.url))
  const exampleFiles = fs.readdirSync(examplePath)

  exampleFiles.forEach((file) => {
    const [fileName, extname] = file.split('.')
    const input = fs.readFileSync(`${examplePath}/${file}`, 'utf-8')

    const output = jsdocToMD({ input, extname })

    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath)
    }
    fs.writeFileSync(`${docsPath}/${fileName}.md`, output)
  })
}

generateMD()
