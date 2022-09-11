const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/rcr",  //rcr 代理, 记得修改request
        createProxyMiddleware({
            target:process.env.SERVER_PORT+ "/manage",
            changeOrigin: true,
            pathRewrite: {
                "/rcr": "",
            },
        })
    );
};
