let express = require("express")
let  bodyParser = require("body-parser")
var path = require('path');
let ueditor = require("ueditor")
let router = require("./router/router")
let  jsonParse = bodyParser.json()
let urlencoded = bodyParser.urlencoded({extended:false})

let app = express()
app.use(jsonParse)
app.use(urlencoded)
// 上传图片的地址  图片或者文件服务器
app.use(express.static(__dirname+ '/static'))
// ueditor  配置文件的静态服务器地址
app.use(express.static(__dirname+ '/nodejs'))
app.use(express.static(__dirname+'/ueditor'))
app.use(express.static(__dirname+'/ued'))
// 跨域
app.all('*',function(req,res,next){
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, application/javascript;charset=UTF-8')
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    next()
})
// ueditor
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'static'), router.ueditor));
// 登录
app.post("/login",router.login)
app.post("/verifylogin",router.verifylogin)
// 新闻
app.post("/addnews",router.addnews)
app.post("/getnews",router.getnews)
app.post("/getnewsByPage",router.getnewsByPage)
app.post("/updatenews",router.updateNews)
app.post("/deletenews",router.deletNews)
app.post("/getnewsById",router.getnewsById)
// 动态
app.post("/dynamicClassify",router.dynamicClassify)
app.post("/adddynamic",router.adddynamic)
app.post("/getdynamic",router.getdynamic)
app.post("/updatedynamic",router.updatedynamic)
app.post("/deletedynamic",router.deletedynamic)
app.post("/getdynamicByClass",router.getdynamicByClass)
app.post("/getdynamicById",router.getdynamicById)
// 合作伙伴
app.post("/addalliance",router.addalliance)
app.post('/getalliance',router.getalliance)
app.post('/getallianceByClass',router.getallianceByClass)
app.post("/updatealliance",router.updatealliance)
app.post("/deletealliance",router.deletealliance)
app.post("/getallianceById",router.getallianceById)
// 星河视频
app.post("/addvideo",router.addvideo)
app.post("/getvideo",router.getvideo)
app.post("/updatevideo",router.updatevideo)
app.post("/deletevideo",router.deletevideo)
app.post("/getvideoById",router.getvideoById)
// 星河招聘
app.post("/getadvertise",router.getadvertise)
app.post("/addadvertise",router.addadvertise)
app.post("/updateadvertise",router.updateadvertise)
app.post("/deleteadvertise",router.deleteadvertise)
app.post("/getadvertiseByPage",router.getadvertiseBypage)
app.post("/getadvertiseById",router.getadvertiseById)
// 留言
app.post("/addmessage",router.addmessage)
app.post("/deletemessage",router.deletemessage)
app.post("/getmessage",router.getmessage)


app.listen(3000,function(){
    console.log('app port: 3000')
})