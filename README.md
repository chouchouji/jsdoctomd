<h1 align="center">jsdoctomd</h1>

English | [简体中文](README.zh-CN.md)

## Intro

`jsdoctomd` is a tool that converts JS or TS files with JSDoc comments into markdown.

## Installation

```shell
# npm
npm i @binbinji/jsdoctomd -D
# yarn
yarn add @binbinji/jsdoctomd -D
# pnpm
pnpm add @binbinji/jsdoctomd -D
```

## Example

### JS
![js example](https://github.com/user-attachments/assets/2d6e56e3-467d-45f3-902e-c53ab4737a5f)

### TS

![ts example](https://github.com/user-attachments/assets/1bcf0079-25ae-4552-aaf9-39204884afb2)

## API

| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `input` | `string` | `false` | `-` | `the file content you want to parse` |
| `extname` | `string` | `false` | `-` | `the file extname, such as js or ts` |
| `generate` | `(func: generateFunction) => string` | `true` | `-` | `custom your markdown content` |

## Usage

### Use javascript script

You can write a javascript file to read file, parse and generate related md files.

```js
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
```

### Use gulp

You can also use [gulp](https://gulpjs.com/) to automate workflow.

```js
// gulpfile.js

import { src, dest } from 'gulp'
import rename from 'gulp-rename'
import { Transform } from 'stream'
import { jsdocToMD } from '@binbinji/jsdoctomd'

function generateMDFiles() {
  return src('example/*.{ts,js}') // the files will be converted to md
    .pipe(
      new Transform({
        objectMode: true,
        transform(file, _enc, cb) {
          const extname = file.extname.slice(1)
          const output = jsdocToMD({ input: file.contents.toString(), extname })
          file.contents = Buffer.from(output)

          cb(null, file)
        },
      }),
    )
    .pipe(rename({ extname: '.md' }))
    .pipe(dest('docs')) // the output dir
}

export default generateMDFiles
```