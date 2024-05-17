import path from 'path';

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
    ],
  },
});

