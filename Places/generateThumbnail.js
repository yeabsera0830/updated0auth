const compress = require('compress-images')
const fs = require('fs')
const path = require('path')
<<<<<<< HEAD
const output_path = __dirname + "/thumbnails/"
=======
const output_path = "thumbnails/"
>>>>>>> 84b5d4a389ffdfb01e8172bac72e2bf21a8f7920

module.exports = async function compressImage(input_path) {
    var check = false
    if (!fs.existsSync(input_path)) {
        return {
            status: 400,
            message: "File Doesn't Exits"
        }
    }
    const ext = path.extname(input_path).toLowerCase()
    if (ext == '.svg') {
        var check = null
        var f = path.basename(input_path)
        var source = fs.createReadStream(input_path)
        var dest = fs.createWriteStream(path.resolve(output_path, f))
        source.pipe(dest)
        check = source.on('end', () => false)
        check = source.on('error', () => true)
        if (check._readableState.pipes.path == null) {
            return {
                status: 400,
                message: "Error Occured on generating an svg for this thumbnail"
            }
        } else {
            return {
                status: 200
            }
        }
    }

    const acceptedTypes = ['.png', '.gif', '.jpeg', '.jpg']
    if (acceptedTypes.indexOf(ext) == -1) {
        return {
            status: 400,
            message: "File type not accepted"
        }
    }

    await compress(input_path, output_path, {
            compress_force: false, statistic: true, autoupdate: true, pathLog: './log/lib/compress-images'}, false,
            {jpg: {engine: 'jpegRecompress', command: ['--quality', 'low', '--min', '30']}},
            {png: {engine: 'pngquant', command: ['--quality=20-50']}},
            {svg: {engine: 'svgo', command: '--multipass'}},
            {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}},
            function(err, completed){
                if(err !== null){
                    if(err.engine === 'jpegRecompress'){
                        compress(err.input, err.output, {compress_force: false, statistic: true, autoupdate: true}, false,
                            {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
                            {png: {engine: false, command: false}},
                            {svg: {engine: false, command: false}},
                            {gif: {engine: false, command: false}}, 
                            function(err) {
                                if(err !== null){
                                    return {
                                        status: 400
                                    }
                                }                                       
                        })
                    }
            }
        })
        return {
            status: 200
        }
<<<<<<< HEAD
}
=======
}

>>>>>>> 84b5d4a389ffdfb01e8172bac72e2bf21a8f7920
