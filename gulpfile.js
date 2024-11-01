import { src, dest } from 'gulp'
import rename from 'gulp-rename'
import { Transform } from 'stream'
import { jsdocToMD } from './dist/index.js'

function generateMDFiles() {
  return src('example/*.{ts,js}')
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
    .pipe(dest('docs'))
}

export default generateMDFiles
