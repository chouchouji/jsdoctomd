import { jsdocToMD } from '../dist/index.js'
import { fileURLToPath } from 'url'

const arrayJsEntry = fileURLToPath(new URL('./array.js', import.meta.url))
jsdocToMD({ entry: arrayJsEntry, output: arrayJsEntry.replace('.js', '.md') })

const isTsEntry = fileURLToPath(new URL('./is.ts', import.meta.url))
jsdocToMD({ entry: isTsEntry, output: isTsEntry.replace('.ts', '.md') })
