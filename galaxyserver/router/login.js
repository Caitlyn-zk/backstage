// 登录界面
let data = require('../controlor/data')
let jwt = require("jsonwebtoken")


module.exports = {
    login:async function(req,res){
        let username = req.body.username
        let password = req.body.password
        let verify = req.body.verify
        let token = jwt.sign({username},'jwt',{
            expiresIn:60*60
        })
        // 判断接受数据是否存在
        if(!username){
            res.json({
                status:501,
                message:'请输入用户名'
            })
            return false;
        }
        if(!password){
            res.json({
                status:502,
                message:'请输入密码'
            })
            return false;
        }
        if(!verify){
            res.json({
                status:503,
                message:'请输入验证码'
            })
            return false;
        }

        // 查询数据库
        let result = await data.islogin([username,password])
        if(result){
            res.json({
                status:200,
                message:'登录成功',
                info:{
                    data:{
                        result
                    },
                    token
                }
            })
        }else{
            res.json({
                status:504,
                message:'用户名或密码错误'
            })
        }
    },
    verifylogin:async function(req,res){
        let token = req.body.token
        jwt.verify(token,'jwt',function(err,decode){
            if(!err){
                res.json({
                    status:200,
                    message:''
                })
            }else{
                res.json({
                    status:505,
                    message:'登录失效'
                })
            }

        })
    }
}