const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = (env) =>  {
    const globalConfig = require('./config/config.json')[env.NODE_ENV];
    const localConfig = require('./config/config.local.json')[env.NODE_ENV];
    console.log('=========================', env.NODE_ENV)
    return {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader'
                    },
                    exclude: /(node-modules)/
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node-modules/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(s[ac]ss)$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|j?g|svg|gif)$/,
                    use: ['file-loader']
                }
                
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.tsx', '.json', '.css']
        },
        devServer: {
            historyApiFallback: true,
            compress: true,
            hot: true,
            port: 3000
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: 'index.html'
            }),
            new webpack.DefinePlugin({
                env_config: JSON.stringify({ ...globalConfig, ...localConfig })
            })

        ]
    }
}