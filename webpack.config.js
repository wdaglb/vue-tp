const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const ExtractCss = require('extract-text-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin')
const transfer = require('transfer-webpack-plugin')

const srcDir = path.resolve(process.cwd(), 'resources/')
const publicPath = path.join(__dirname, 'public')
const nodeModPath = path.resolve(__dirname, './node_modules')
let maps = []

const entries = function () {
    const dir = path.resolve(srcDir, 'assets')
    const files = glob.sync(dir + '/**/*.js')
    let map = { }
    for (let i = 0; i < files.length; i++) {
        let filepath = files[i]
        const _i = filepath.lastIndexOf('.')
        let paths = filepath.substring(0, _i).split('/').splice(-2)
        let filename = 'lib/' + paths.join('/')
        map[filename] = filepath
    }
    return map
}

module.exports = {
    entry: entries(),
    // devtool: "in"
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: publicPath + 'lib',
        host: '127.0.0.1',
        compress: true
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 400,
        ignored: /node_modules/
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractCss.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000,
                            outputPath: '/lib/images/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {  //导入的时候不用写拓展名
        extensions: [' ', '.js', '.vue', '.scss', '.css'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new ExtractCss('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib/vendor'
        }),
        new uglify()
    ]
}