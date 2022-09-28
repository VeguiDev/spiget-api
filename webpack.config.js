const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: [
                "/node_modules/",
                "/src/cli",
                "/src/test"
            ],
        }, ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.browser.json" })]
    },
    output: {
        library: "spigetapi",
        libraryTarget: "umd",
        libraryExport: "default",
        filename: 'spiget-api.umd.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "production"
};