const path = require('path');
const fs = require( 'fs' );

function fetchClientFiles() {
    var entries = new Array();
    try {
        const folder = './client/scripts';
        const files = fs.readdirSync(folder);

        // files object contains all files names
        files.forEach(file => {
            entries.push( folder + '/' + file);
            console.log( "File : ", folder + '/' + file );
        });

    } catch (err) {
        console.log(err);
    }
    return entries;
}

module.exports = {
    entry: fetchClientFiles(),
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib', 'client', 'scripts')
    }
};