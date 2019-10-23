let data = require("../controlor/data")
let common = require("../common")
let multer = require('multer')
let Storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./ued/dynamic');
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname+'_'+Date.now()+'_'+file.originalname)
    }

})
let upload = multer({storage:Storage}).array('dynaimicUploader')
module.exports = {
// 获取动态分类
    dynamicClassify:async function(req,res){
        let result = await data.dynamicClassify()
        if(!result){
            res.json({
                status:506,
                message:'获取分类失败'
            })
        }else{
           res.json({
               status:200,
               data:result
           })
        }

    },  
    
    // 添加动态
    adddynamic:function(req,res){
        upload(req,res,async function(err){
            if(err){
                return res.json({
                    status:531,
                    message:'文件上传失败'
                })
            }else{
                let arr = common.Data(req,res)
                let classify = req.body.classify
                if(!classify){
                    res.json({
                        status:555,
                        message:'请确认分类'
                    })
                    return false;
                }
                arr.push(classify)
                let result = await data.adddynamic(arr)
                if(result){
                    res.json({
                        status:200,
                        message:'添加动态成功'
                    })
                }else{
                    res.json({
                        status:518,
                        message:'添加动态失败'
                    })
                }
            }
        })
        
    },

    // 获取动态
    getdynamic:async function(req,res){
        let result = await data.getdynamic()
        if(result){
            res.json({
                status:200,
                data:result,
                message:'获取动态成功'
            })
        }else{
            res.json({
                status:519,
                message:'获取动态失败'
            })
        }
    },

    // 通过分类获取动态
    getdynamicByClass:async function(req,res){
        let classify =  Number(req.body.classify)
        let page = Number(req.body.page)
        let count = Number(req.body.count)
        if(!classify){
            res.json({
                status:555,
                message:'请确认分类是否存在'
            })
            return false;
        }
        if(!page){
            res.json({
                status:557,
                message:'请确认页码'
            })
            return false;
        }
        if(!count){
            res.json({
                status:558,
                message:'请确认页面数据'
            })
            return false;
        }
        let start = (page-1)*count
        let arr = [classify,start,count]
        let result =await data.getdynamicByClass(arr)
        if(result){
            res.json({
                status:200,
                message:'通过分类获取动态成功',
                data:result
            })
        }else{
            res.json({
                status:520,
                message:'通过类名获取动态失败'
            })
        }
    },

    // 通过ID获取动态
    getdynamicById:async function(req,res){
       let id = Number(req.body.id)
       if(!id){
           return res.json({
               status:600,
               message:'老哥！ID没写呢!'
           })
       }
       let result = await data.getdynamicById(id)
       if(result){
           res.json({
               status:200,
               message:'老哥，稳',
               data:result
           })
       }else{
           res.json({
               status:519,
               message:'通过Id获取信息失败'
           })
       }

    },

    // 修改动态
    updatedynamic:function(req,res){
        upload(req,res,async function(err){
            if(err){
                return res.json({
                    status:531,
                    message:'文件上传失败'
                })
            }else{
                let arr = common.Data(req,res)
                let id = req.body.id
                arr.push(id)
                let result =await data.updatedynamic(arr)
                if(result){
                    res.json({
                        status:200,
                        message:'动态修改成功'
                    })
                }else{
                    res.json({
                        status:521,
                        message:'动态修改失败'
                    })
                }                
            }
        })
        
    },

    // 删除动态
    deletedynamic:async function(req,res){
        let id = req.body.id
        let querydynamic =await data.querydynamic(id)
        if(querydynamic){
            res.json({
                status:528,
                message:'该动态不存在'
            })
        }else{
            let result = data.deletedynamic(id)
            if(result){
                res.json({
                    status:200,
                    message:'动态删除成功'
                })
            }else{
                res.json({
                    status:522,
                    message:'动态删除失败'
                })
            }
        }
        
    }

}