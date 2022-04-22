const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'
    const isDev = !isProd

    const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: [
                'core-js/stable',
                'regenerator-runtime/runtime',
                './index.js'
            ]
        },
        output: {
            filename: filename('js'),
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: filename('css')
            })
        ],
        devtool: isDev ? 'source-map' : false,
        devServer: {
            port: 5000,
            open: true,
            hot: true,
            watchFiles: './',
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader, "css-loader"
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
    }
}