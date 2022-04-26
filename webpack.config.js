const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rulesForJavascript = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic'
                }
            ]
        ]
    }
}

const rulesForCss = {
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader'
    ]
}

module.exports = (env, argv) => {

    const { mode } = argv;
    const isProduction = mode === 'production';

    return {

        //entry point default: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isProduction 
                ?  '[name].[contenthash].js' 
                : 'main.js',
        },
        module: {
            rules: [
                rulesForJavascript,
                rulesForCss
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({ template: 'src/index.html' })
        ],
        devServer: {
            open: true, //auto open browser
            port: 3000,
            compress: true
        },
        devtool: 'source-map'
    }
}

//Para hacer el build npm run y el alias de mi script en este caso npm run build

//Conceptos clave:
/*
    Entrypoint: un entry point es el archivo que me permite generar las configuraciones necesarias para generar mi empaquetado a servir
    Loader: un loader es una configuracion que me permite cargar archivos que normalmente no son interpretados por webpack ej: react, css, etc...
    Plugin: añade funcionalidades a webpack
    SourceMap: genera un archivo para mejor debbug .map
    ContentHash: me ayuda a generar archivos para temas de cache

 */