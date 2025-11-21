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
            from: path.join(__dirname, 'proto/reaction.proto'),
            to: path.join(__dirname, '../../dist/apps/reaction/proto'),
          },
          {
            from: path.join(__dirname, 'proto/health.proto'),
            to: path.join(__dirname, '../../dist/apps/reaction/proto'),
          },
          {
            from: path.join(__dirname, 'scripts/entrypoint.dev.bash'),
            to: path.join(__dirname, '../../dist/apps/reaction/scripts'),
          },
          {
            from: path.join(__dirname, 'scripts/entrypoint.prod.bash'),
            to: path.join(__dirname, '../../dist/apps/reaction/scripts'),
          },
          {
            from: path.join(__dirname, 'scripts/dislike.lua'),
            to: path.join(__dirname, '../../dist/apps/reaction/scripts'),
          },
          {
            from: path.join(__dirname, 'scripts/like.lua'),
            to: path.join(__dirname, '../../dist/apps/reaction/scripts'),
          },
          {
            from: path.join(__dirname, 'scripts/unlike.lua'),
            to: path.join(__dirname, '../../dist/apps/reaction/scripts'),
          },
          {
            from: path.join(__dirname, 'scripts/undislike.lua'),
            to: path.join(__dirname, '../../dist/apps/reaction/scripts'),
          },
        ],
      }),
    ],
  };
};
