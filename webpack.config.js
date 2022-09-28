const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "crypto": require.resolve('crypto-browserify')
        }
    },
    output: {
        library: "spigetapi",
        libraryTarget: "umd",
        libraryExport: "default",
        filename: 'spiget-api.umd.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};