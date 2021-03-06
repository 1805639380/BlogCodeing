const path = require('path');//引入path模块
function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
const CompressionPlugin = require('compression-webpack-plugin')


module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('assets', resolve('./src/assets'))
            .set('views', resolve('./src/views'))
            .set('network', resolve('./src/network'))
        //注意 store 和 router 没必要配置
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html|\.css/,
                    threshold: 10240,
                    deleteOriginalAssets: false,
                    minRatio: 0.8
                })]
            }
        }
    }
}