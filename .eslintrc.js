module.exports = {
    "root":true,  // 在当前目录寻找.eslintrc的配置文件,停止在父级目录中寻找
    "env": {
        "browser": true, // 浏览器环境中的全局变量
        "es2021": true,  // 启用除了 modules 以外的所有 ECMAScript 6 特性
        "node":true   // Node.js 全局变量和 Node.js 作用域
    },
    "extends": "eslint:recommended", //规则继承
    "parserOptions": {
        "ecmaVersion": 12  // 指定解析js的ecma版本
    },
    // "ignorePatterns": ["./node_modules/"],
    // 可以修改默认的规则
    //关闭规则：'off' 或 0  警告规则：'warn' 或 1    错误退出：'error' 或 2  
    "rules": {
        "no-empty":1, //  禁止空块语句  
        "no-unused-vars":1,
        // 强制使用一致的反勾号、双引号或单引号 (quotes)
        // double   要求尽可能地使用双引号
        "quotes": ["error", "double", {  
            "avoidEscape": true,  // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
            "allowTemplateLiterals": true  //允许字符串使用反勾号
        }],
    }
};