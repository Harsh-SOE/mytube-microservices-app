const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (options, webpack) => {
  return {
    ...options,
    plugins: [
      ...options.plugins,
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'proto/history.proto'),
            to: path.join(__dirname, '../../dist/apps/history/proto'),
          },
          {
            from: path.join(__dirname, 'proto/health.proto'),
            to: path.join(__dirname, '../../dist/apps/history/proto'),
          },
          {
            from: path.join(__dirname, 'scripts/entrypoint.dev.bash'),
            to: path.join(__dirname, '../../dist/apps/history/scripts'),
          },
          {
            from: path.join(__dirname, 'scripts/entrypoint.prod.bash'),
            to: path.join(__dirname, '../../dist/apps/history/scripts'),
          },
        ],
      }),
    ],
  };
};
