"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const compression_webpack_plugin_1 = __importDefault(require("compression-webpack-plugin"));
// import FaviconsWebpackPlugin from "favicons-webpack-plugin";
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
require("webpack-dev-server");
const config = {
    devtool: false,
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
        hints: false
    },
    mode: "production",
    entry: "./src/ts/main.ts",
    output: {
        path: path_1.default.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new compression_webpack_plugin_1.default(),
        new html_webpack_plugin_1.default({
            template: "./src/index.html"
        }),
        new copy_webpack_plugin_1.default({
            patterns: [{ from: path_1.default.join(__dirname, "src", "favicon.ico"), to: path_1.default.join(__dirname, "dist", "favicon.ico") }]
        })
    ],
    devServer: {
        static: {
            directory: path_1.default.join(__dirname, "dist")
        },
        compress: true,
        port: 9000,
        hot: true
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 20000,
            maxSize: 200000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};
exports.default = config;
