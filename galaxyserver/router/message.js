let data = require("../controlor/data")
module.exports = {
    // 添加留言
    addmessage:async function(req,res){
        let name = req.body.name
        let number = req.body.number
        let email = req.body.email
        let tel = req.body.tel
        let message = req.body.message
        if(!name){
            res.json({
                status:547,
                message:'请输入留言姓名'
            })
            return false;
        }
        if(!number){
            res.json({
                status:548,
                message:'请输入留言的楼栋以及房间号'
            })
            return false;
        }
        if(!email){
            res.json({
                status:549,
                message:'请输入留言邮箱'
            })
            return false;
        }
        if(!tel){
            res.json({
                status:550,
                message:'请输入留言电话'
            })
            return false;
        }
        if(!message){
            res.json({
                status:551,
                message:'请输入留言'
            })
            return false;
        }

        let arr = [name,number,email,tel,message]
        let result =await data.addmessage(arr)
        if(result){
            res.json({
                status:200,
                message:'添加留言成功'
            })
        }else{
            res.json({
                status:552,
                message:'添加留言失败'
            })
        }


    },

    // 获取留言
    getmessage:async function(req,res){
        let result =await data.getmessage()
        if(result){
            res.json({
                status:200,
                message:'获取日志成功',
                data:result
            })
        }else{
            res.json({
                status:553,
                message:'获取日志失败'
            })
        }
    },

    // 删除留言
    deletemessage:async function(req,res){
        let id = req.body.id
        if(!id){
            res.json({
                status:553,
                message:'请确认删除留言的id'
            })
            return false;
        }

        let query = await data.querymessage(id)
        if(query){
            let result = await data.deletemessage(id)
            if(result){
                res.json({
                    status:200,
                    message:'删除成功'
                })
            }else{
                res.json({
                    status:554,
                    message:'留言删除失败'
                })
            }          

        }else{
            res.json({
                status:554,
                message:'该留言不存在'
            })
            
            
        }
    }
}