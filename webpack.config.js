const path = require("path")

module.exports = {
  mode: "production",
	entry: ["./src/index.js"],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ],
  },
  output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	}
};