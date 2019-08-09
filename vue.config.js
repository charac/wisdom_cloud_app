/**
 * vue.config.js配置项
 */

const path = require('path');
const chalk = require('chalk');  // 文字打印颜色
// const CompressionPlugin = require("compression-webpack-plugin")   // 开启Gzip
// const CompressionPlugin = require('compression-webpack-plugin'); //Gzip
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // Webpack包文件分析器
console.log(chalk.green('当前运行环境',process.env.NODE_ENV))
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	// 输出的基本路径
	publicPath: './',
	// 输出文件目录
    outputDir: 'dist',
	// 输出页面
	indexPath: 'index.html',
	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: 'static',
	// 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
	// lintOnSave: process.env.NODE_ENV !== 'production',
	lintOnSave: false,
	//是否使用包含运行时编译器的 Vue 构建版本
	runtimeCompiler: false,
	//是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
	parallel: require('os').cpus().length > 1,
	//生产环境是否生成 sourceMap 文件，一般情况不建议打开 true为打开
	productionSourceMap: false,
	// webpack配置
	//对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	chainWebpack: config => {
		// 修复HMR
        config.resolve.symlinks(true);
		/**
		 * 删除懒加载模块的 prefetch，降低带宽压力
		 * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
		 * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
		 */
		//config.plugins.delete('prefetch');
		if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
			// 打包文件带hash
			config.output.filename('[name].[hash].js').end()
		} else {// 为开发环境修改配置...
		}
		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()
	},
	//调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
	configureWebpack: config => {
		Object.assign(config, { // 开发生产共同配置  引用路径
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
					'@com': path.resolve(__dirname, './src/components'),
					'@config': path.resolve(__dirname, './src/config'),
					'@views': path.resolve(__dirname, './src/views'),
					'@layout': path.resolve(__dirname, './src/layout/'),
                    'vue$': 'vue/dist/vue.esm.js'
                }
            }
		})
		// 打包去掉系统中的config debugger
		if (process.env.NODE_ENV === 'production') {
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
			config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
		}
		// 开启Gzip压缩
		if(process.env.NODE_ENV === 'production'){
            return{
                plugins: [
                    new CompressionPlugin({
                        test:/\.js$|\.html$|.\css/, //匹配文件名
                        threshold: 10240,//对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    })
                ]
            }
        }
    },
    /**
     * 配置项对css预处理
     */
	css: {
		// 当为true时，css文件名可省略 module 默认为 false
		modules: false,  // 设置为true时，使用全局element-ui会造成无法找到字体和图标文件 .woff .ttf
		// 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
		// 默认生产环境下是 true，开发环境下是 false
	 	// extract: true,   // true时影响热更新
		// 开启 CSS source maps，一般不建议开启
		sourceMap: false,
	},
	/** 
	 * webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
	 *
	 */
	devServer: {
		// host: 'localhost',
		// host: '172.20.10.3',
		host: '192.168.4.18',
		// host: '192.168.0.107',
		port: 9522, // 端口号
		https: false, // https:{type:Boolean}
		// open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/ 
		hotOnly: true, // 热更新
		// overlay: {
		// 	warnings: false,
		// 	errors: false
		// },
		// lintOnSave: false,
		// proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
		// proxy: { //配置自动启动浏览器
		// 	"/rest/*": {
		// 		target: "http://172.16.1.12:7071",
		// 		changeOrigin: true,
		// 		// ws: true,//websocket支持
		// 		secure: false
		// 	},
		// 	"/pbsevice/*": {
		// 		target: "http://172.16.1.12:2018",
		// 		changeOrigin: true,
		// 		//ws: true,//websocket支持
		// 		secure: false
		// 	},
		// }
	},	
	// 第三方插件(全局使用less\sass\style)
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				path.resolve(__dirname, './src/styles/variable.less'),  // 公共变量
				path.resolve(__dirname, './src/styles/mixin.less'),  // 公共函数
			],
		},
	},
	
};