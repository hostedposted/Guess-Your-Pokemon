const path = require("path")

module.exports = {
  mode: "production",
	entry: ["./all_src/index.js"],
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
    ],
  },
  output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "all_dist"),
	}
};