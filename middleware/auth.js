module.exports = (req,res,next)=>{
    let {flag} = req.body;
    // 有些路由需要放行,既不需要校验session权限,如/login,/logout
    let path = req.path.toLowerCase(); // 转换为小写
    let unPermissionPath = ['/login','/logout','/dologin','/ajaxlogin','/register','/ajaxregister','/ajaxemail']
    if(!unPermissionPath.includes(path)){
        // console.log(req);
        // 不在放行内则需要校验
        console.log(req.path,"session校验")
        if(req.session.userInfo){
            //权限正确
            next();
        }else{
            //权限失败
            if(flag === 'ajax'){
                res.json({
                    code:30004,
                    message:"请重新登录"
                })
                return;
            }else{
                res.redirect('/login');
                return;
            }
        }
    }else{
        //正常放行的路由
        next();
    }
}