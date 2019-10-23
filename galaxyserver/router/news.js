let data = require("../controlor/data/data")
let common = require("../common")
let multer = require('multer')
let Storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./ued/news');
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname+'_'+Date.now()+'_'+file.originalname)
    }

})
let upload = multer({storage:Storage}).array('newsUploader')
module.exports = {
    // 添加新闻
    addnews:function(req,res){
        upload(req,res,async function(err){
            if(err){
                return res.json({
                    status:531,
                    message:'文件上传失败'
                })
            }else{
                let arr =  common.Data(req,res)
                let queryNews = await data.queryNews(arr[2])
                if(!queryNews){
                    res.json({
                        status:514,
                        message:'新闻已存在请勿重复添加'
                    })
                }else{
                    let addNews = await data.addNews(arr)
                    if(!addNews){
                        res.json({
                            status:511,
                            message:'新闻添加失败'
                        })
                    }else{
                        res.json({
                            status:200,
                            message:'添加新闻成功'
                        })
                    }
                }
            }
        })
       
    },

    //获取新闻
    getnews:async function(req,res){
       let resulet = await data.getNews()
       if(resulet){
           res.json({
               status:200,
               data:resulet,
               message:'新闻获取成功'
           })
       }else{
           res.json({
               status:513,
               message:'新闻获取失败'
           })
       }
    }, 

    // 通过Id获取新闻
    getnewsById:async function(req,res){
        let id = Number(req.body.id)
        if(!id){
            return res.json({
                status:200,
                message:'输个ID嘛，同志'
            })
        }
        let resulet = await data.getNewsById(id)
        if(resulet){
            res.json({
                status:200,
                message:'成功',
                data:resulet
            })
        }

    },
    // 通过分页获取新闻
    getnewsByPage:async function(req,res){
        let page = Number(req.body.page)
        let count = Number(req.body.count)
        if(!page){
            res.json({
                status:557,
                message:'请确认的页码'
            })
            return false;
        }
        if(!count){
            res.json({
                status:558,
                message:'请确认该页数据'
            })
            return false;
        }

        let arr = [page,count]
        let resulet = await data.getNewsByPage(arr)
        if(resulet){
            res.json({
                status:200,
                data:resulet,
                message:'按分页获取成功'
            })
        }else{
            res.json({
                status:559,
                message:'按分页获取数据失败'
            })
        }

    },

    // 更改新闻
    updateNews:function(req,res){
        upload(req,res,async function(err){
            if(err){
                return res.json({
                    status:531,
                    message:'文件上传失败'
                })
            }else{
                let arr =  common.Data(req,res)
                let id = req.body.id
                arr.push(id)
                let queryNews = await data.queryNews(arr[2])
                if(!queryNews){
                    res.json({
                        status:515,
                        message:'该新闻不存在'
                    })
                }else{
                    let updateNews = await data.updateNws(arr)
                    if(updateNews){
                        res.json({
                            status:200,
                            message:'新闻修改成功'
                        })
                    }else{
                        res.json({
                            status:516,
                            message:'新闻修改失败'
                        })
                    }
        
                } 
            }
        })
              

    },
    // 删除新闻
    deletNews:async function(req,res){
        let id = req.body.id
        if(!id){
            res.json({
                status:553,
                message:'请确认id'
            })
            return false;
        }
        let resulet = await data.deletNews(id)
        if(resulet){
            res.json({
                status:200,
                message:'删除成功'
            })
        }else{
            res.json({
                status:517,
                message:'删除失败'
            })
        }
    }
}