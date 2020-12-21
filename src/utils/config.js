let config = {};
/* 生产环境 */
if (process.env.NODE_ENV === 'production') {
    
} else {
    config.Domain = 'http://www.jiepai110.net';
}
export default config.Domain