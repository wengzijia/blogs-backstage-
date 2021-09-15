const { mode } = require("crypto-js");
const  express = require("express");
const router = express.Router();


// 导入模型M
const query = require("../model/query-promise.js");


// 获取所有的分类
router.get("/cate",async (req,res)=>{
    let sql = `select * from classification where int_show = 1`;
    let result = await query(sql);
    res.json(result)
})


// 获取文章详情
router.get("/detail",async(req,res)=>{
    let { id } = req.query;
    id = parseInt(id); // id 转为整形
    id = isNaN(id) ? 0 : id; // 是否NaN,是的话取0,不是的话取id自己,这样的话就不会出错
    let sql = `select t1.*,t2.name from article_table t1 left join classification t2 on t1.cat_id = t2.id where t1.id = ${id}`;
    let result = await query(sql);
    res.json(result[0] || {})
})


// 获取首页分页的文章
router.get("/article",async(req,res)=>{
    let {page=1,pagesize=3} = req.query;

    // 起始位置: (当前页-1) * 每页显示的条数
    let offset = (page-1) * pagesize;
    let sql = `select  t1.*,t2.name from article_table t1 left join classification  t2 on t1.cat_id = t2.id 
                where t1.is_delete = 0 and t1.isverify = 1  limit ${offset},${pagesize}`;
    let result = await query(sql);
    res.json(result)
})


// 获取分类页面的文章
router.get("/cateArticle",async(req,res)=>{
    let {page=1,pagesize=2,cat_id} = req.query;
    let offset = (page-1) * pagesize;
    // console.log(cat_id);
    let sql = `select t1.*,t2.name from article_table t1 left join classification t2 on t1.cat_id = t2.id 
                where t1.cat_id = ${cat_id} and t1.is_delete =0 and t1.isverify = 1 limit ${offset},${pagesize}`;
    let result = await query(sql);
    res.json(result)
})
 
 
// 错误处理
 router.get("*",(req,res)=>{
     res.json({
         message:404
     })
 })

module.exports = router