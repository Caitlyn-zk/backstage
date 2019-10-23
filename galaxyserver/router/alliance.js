let data = require("../controlor/data")
let multer = require('multer')
let Storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./ued/alliance');
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname+'_'+Date.now()+'_'+file.originalname)
    }

})
let upload = multer({storage:Storage}).array('allianceUploader')
module.exports = {
    // 添加合作伙伴
    addalliance:async function(req,res){
        upload(req,res,function(err){
            if(err){
                return res.json({
                    status:531,
                    message:'文件上传失败'
                })
            }else{
                let name = req.body.name
                let classify = req.body.classify
                if(!req.files[0]){
                    res.json({
                        status:555,
                        message:'您没有上传儿图片儿'
                    })
                }
                let img = req.files[0].filename
                if(!classify){
                    res.json({
                        status:555,
                        message:'请输入分类'
                    })
                    return false;
                }
                if(!name){
                    res.json({
                        status:522,
                        message:'请输入合作伙伴名'
                    })
                    return false;
                }
                if(!img){
                    res.json({
                        status:523,
                        message:'请输入合作伙伴图片'
                    })
                    return false;
                }
        
                let arr = [name,img,classify]
                let result = data.addalliance(arr)
                if(result){
                    res.json({
                        status:200,
                        message:'添加合作伙伴成功'
                    })
                }else{
                    res.json({
                        status:524,
                        message:'添加合作伙伴失败'
                    })
                }
            }
        })
        
        
    },

    // 获取合作伙伴
    getalliance:async function(req,res){
        let result =await data.getalliance()
        if(result){
            res.json({
                status:200,
                data:result,
                message:'获取合作伙伴成功'
            })
        }else{
            res.json({
                status:525,
                message:'获取合作伙伴失败'
            })

        }
    },

    // 通过id 获取合作伙伴
    getallianceById:async function(req,res){
        let id = req.body.id
        if(!id){
            return res.json({
                status:600,
                message:'老兄，宁儿又把id给忘了'
            })
        }
        let result = await data.getallianceById(id)
        if(result){
            res.json({
                status:200,
                data:result,
                message:'通过id 获取内容成功'
            })
        }else{
            res.json({
                status:525,
                message:'获取合作伙伴失败'
            })
        }
    },
    // 通过分类获取合作伙伴
    getallianceByClass:async function(req,res){
        let classify = Number(req.body.classify)
        if(!classify){
            res.json({
                status:555,
                message:'请确认分类查询合作伙伴的classify'
            })
            return false;
        }
        let result = await data.getallianceBy(classify)
        if(!result){
            res.json({
                status:556,
                message:'分类查询失败'
            })  
        }else{
            res.json({
                status:200,
                data:result,
                message:'分类查询成功'
            })            
        }
    },

    // 修改合作伙伴
    updatealliance:function(req,res){
        upload(req,res,async function(err){
           
            if(err){
                return res.json({
                    status:531,
                    message:'文件上传失败'
                })
            }else{
                let name = req.body.name
                let img = req.files[0].filename
                let id = req.body.id
                if(!name){
                    res.json({
                        status:522,
                        message:'请输入合作伙伴名'
                    })
                    return false;
                }
                if(!img){
                    res.json({
                        status:523,
                        message:'请输入合作伙伴图片'
                    })
                    return false;
                }
                if(!id){
                    res.json({
                        status:526,
                        message:'请输入合作伙伴id'
                    })
                }
                let arr = [name,img,id]
                let result =await data.updatealliance(arr)
                if(result){
                    res.json({
                        status:200,
                        message:'合作伙伴修改成功'
                    })
                }else{
                    res.json({
                        status:527,
                        message:'合作伙伴修改失败'
                    })
                }
            }

        })
        
    },

    // 删除合作伙伴
    deletealliance:async function(req,res){
        let id = req.body.id
        if(!id){
            res.json({
                status:528,
                message:'请输入需要删除的id'
            })
            return false;
        }

        let queryalliance = await data.queryalliance(id)
        if(queryalliance){
            res.json({
                status:529,
                message:'该合作伙伴不存在'
            })
        }else{
            let result = await data.deletealliance(id)
            if(result){
                res.json({
                    status:200,
                    message:'删除合作伙伴成功'
                })
            }else{
                res.json({
                    status:530,
                    message:'删除合作伙伴失败'
                })
            }
        }
        
    }

}