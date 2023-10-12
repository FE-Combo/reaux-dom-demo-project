const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

function resolve(relativePath) {
  return path.resolve(__dirname, `../${relativePath}`);
}

const config = {
  target: "web",
  mode: "development",
  entry: [resolve("src/index")],
  output: {
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".scss", ".sass"],
    modules: [path.join(path.resolve(__dirname, "../"),"/"), "node_modules"],
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /(\.js|\.jsx|\.ts|\.tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')]
          }
        }
      }, {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", 
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {},
                ],
              ],
            },
          },
      }],
      }, {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {},
                  ],
                ],
              },
            },
          },
          {
            loader:'less-loader', 
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ],
      },
      {
        test: /\.(scss|sass)$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[path][name]__[local]__[sha256:hash:base64:5]",
            },
          },
        }, {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {},
                ],
              ],
            },
          },
        }, 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg|webp|gif|ttf|woff)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[path][name].[contenthash].[ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|webp|gif|ttf|woff)$/i,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: "static/[path][name].[contenthash].[ext]",
            }
          }
        ],
        type: 'javascript/auto'
      },
      {
        test: /\.(mp3|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "static/[path][name].[contenthash].[ext]",
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: resolve("public/index.html")
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProgressPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ForkTSCheckerPlugin(),
    new webpack.DefinePlugin({
      API_PREFIX: JSON.stringify("/api")
    })
  ]
};

module.exports = config;
