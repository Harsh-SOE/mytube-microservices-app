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
            from: path.join(__dirname, 'proto/authz.proto'),
            to: path.join(__dirname, '../../dist/apps/authz/proto'),
          },
          {
            from: path.join(__dirname, 'proto/health.proto'),
            to: path.join(__dirname, '../../dist/apps/authz/proto'),
          },
          {
            from: path.join(__dirname, 'scripts/entrypoint.bash'),
            to: path.join(__dirname, '../../dist/apps/authz/scripts'),
          },
          {
            from: path.join(__dirname, 'scripts/openfga.bash'),
            to: path.join(__dirname, '../../dist/apps/authz/scripts'),
          },
          {
            from: path.join(__dirname, 'scripts/models/auth.model.json'),
            to: path.join(__dirname, '../../dist/apps/authz/scripts/models'),
          },
        ],
      }),
    ],
  };
};
