const chokidar = require("chokidar");
const execsh = require("exec-sh");

// console.log('test')
// 监听目录的变化
chokidar.watch("./",{
    persistent:true,
    ignored:["node_modules","CodeSpecificationTool/eslint.js"]
}).on("all",(event,path)=>{
    // console.log(path)
    // 判断文件是否被改变   
    if(event === "change"){ 
        //  --fix 修复代码
        execsh(`npx eslint ${path} --fix`,function(err){
            if(err){
                console.log("code error",err.code);
            }
        })
    }
})

