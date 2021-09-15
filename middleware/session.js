const session = require('express-session');

// 初始化session数据
module.exports = session({
    name:'SESSIONID',  // session会话名称存储在cookie中的键名
    secret:'%#%￥#……%￥', // 必填项，用户session会话加密（防止用户篡改cookie）
    cookie:{  //设置session在cookie中的其他选项配置
      path:'/',
      secure:false,  //默认为false, true 只针对于域名https协议
      maxAge:60000*24,  //设置有效期为24分钟，说明：24分钟内，不访问就会过期，如果24分钟内访问了。则有效期重新初始化为24分钟。
    }
  })