<h1 align="center">jsdoctomd</h1>

简体中文 | [English](README.md)

## 介绍

`jsdoctomd` 是一个可以将带有JSDoc注释的JS或TS文件转换为markdown的工具。

## 安装

```shell
# npm
npm i @binbinji/jsdoctomd -D
# yarn
yarn add @binbinji/jsdoctomd -D
# pnpm
pnpm add @binbinji/jsdoctomd -D
```

## 示例

### JS
![js example](https://github.com/user-attachments/assets/2d6e56e3-467d-45f3-902e-c53ab4737a5f)

### TS

![ts example](https://github.com/user-attachments/assets/1bcf0079-25ae-4552-aaf9-39204884afb2)

## API

| 参数 | 类型 | 是否可选 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| `input` | `string` | `false` | `-` | `想解析的文件内容` |
| `extname` | `string` | `false` | `-` | `文件类型，比如js或者ts` |
| `generate` | `(func: generateFunction) => string` | `true` | `-` | `自定义markdown格式` |

## 使用指南

### js脚本

可以通过js脚本读文件，转化，生成md文件。 

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

### 使用gulp

也可以使用 [gulp](https://gulpjs.com/) 来自动化工作流。

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