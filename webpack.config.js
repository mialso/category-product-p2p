import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (env) => ({
    target: 'es2020',
    entry: './src/index.tsx',
    mode: env.prod ? 'production' : 'development',
    output: {
        path: path.resolve('./', 'build'),
        chunkFormat: 'module',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
});

