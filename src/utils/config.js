let config = {};
/* 生产环境 */
if (process.env.NODE_ENV === 'production') {
    
} else {
    // config.Domain = 'http://127.0.0.1:3000';
    config.Domain = 'http://47.112.113.38:3000';
}
export default config.Domain