let config = {};
/* 生产环境 */
if (process.env.NODE_ENV === 'production') {
    config.Domain =  'http://m.miniso.cn/openapi';
} else {
    config.Domain = 'http://api.wxo2020.xyz';
}
export default config.Domain