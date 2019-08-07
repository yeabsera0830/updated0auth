const compress = require('compress-images')

module.exports = async (input_path, output_path) => {
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
} 