const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
 
 
module.exports = {
  mode: "development",
  entry: './src/index.js', optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'  
  }, 
  devServer:{
		//设置服务器访问的基本目录
		// contentBase:path.resolve(__dirname, 'dist'), // 要求服务器访问dist目录
		host:'localhost', // 设置服务器ip地址，可以是localhost
		port:8080, // 设置端口号
		open:true, //自动拉起浏览器
		hot:false //模块热跟新
	},
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './dist/index.html'),
      inject: 'html'
    }),
  ]
};