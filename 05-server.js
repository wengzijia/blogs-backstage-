const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const fs = require('fs');



// 导入模板引擎模块
const artTemplate = require('art-template');
const express_template = require('express-art-template');

// 挂载路由中间件
const router = require('./router/router.js');
const frontRouter = require("./router/frontRouter.js")

let  authMiddleware = require('./middleware/auth.js');
let  session =  require("./middleware/session.js");

//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template); 
//设置视图引擎为上面的html
app.set('view engine', 'html');


//初始化session数据
app.use(session);

//设置托管静态资源中间件
app.use('/uploads',express.static(path.join(__dirname , '/uploads')));
app.use('/static',express.static(path.join(__dirname , '/static')));

//post参数接受中间件
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//定义一个过滤器dateFormat
artTemplate.defaults.imports.dateFormat = function(time,format = 'YYYY-MM-DD HH:mm:ss'){
    return moment.unix(time).format(format);
}

artTemplate.defaults.imports.dealDate = function(date,format = 'YYYY-MM-DD HH:mm:ss'){
    return moment(date).format(format);
}

// 允许跨域请求
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    next()
})

// 前台api接口(不需要验证session权限)
app.use('/api',frontRouter)


//设置中间件,统一校验session权限(仅针对后台)
app.use(authMiddleware)


// 后台路由中间件((需要验证session权限))
app.use(router)



app.listen(3696,()=>{
    console.log('server is running at port 3696')
})


