let data = require("../controlor/data/data")
let multer = require('multer')
let Storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./ued/video');
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname+'_'+Date.now()+'_'+file.originalname)
    }

})
let upload = multer({storage:Storage}).array('videoUploader',3)
module.exports = {
    // 添加视频
    addvideo:function(req,res){
        upload(req,res,async function(err){
            if(err){
                return res.json({
                    status:531,
                    message:'文件上传失败'
                })
            }else{
                let title = req.body.title
                if(!req.files.length>0){
                    res.json({
                        status:532,
                        message:'请输入视频'
                    })
                    return false;
                }
                if(!req.files.length>1){
                    return res.json({
                        status:600,
                        message:'请输入文件'
                    })
                }
                let videoImg = req.files[0].filename
                let video = req.files[1].filename
                if(!title){
                    res.json({
                        status:532,
                        message:'请输入视频标题'
                    })
                    return false;
                }
                if(!video){
                    res.json({
                        status:532,
                        message:'请添加视视频'
                    })
                    return false;
                }
                let arr = [title,video,videoImg]
                let result = await data.addvideo(arr)
                if(result){
                    res.json({
                        status:200,
                        message:'添加视频成功'
                    })
                }else{
                    res.json({
                        status:533,
                        message:'添加视频失败'
                    })
                }
            }
        })

    },

    // 获取视频
    getvideo:async function(req,res){
        let result =await data.getvideo()
        if(result){
            res.json({
                status:200,
                data:result,
                message:'获取视频成功'
            })
        }else{
            res.json({
                status:534,
                message:'获取视频失败'
            })
        }
    },

    // 通过id 获取视频
    getvideoById:async function(req,res){
        let id = req.body.id
        if(!id){
            return res.json({
                status:535,
                message:'请输入修改视频的Id'
            })
        }
        let result = await data.getvideoById(id)
        if(result){
            res.json({
                status:200,
                data:result,
                message:'查询成功'
            })
        }else{
            res.json({
                status:534,
                message:'获取视频失败'
            })
        }
    },
    
    // 修改视频

    updatevideo:function(req,res){ 
        upload(req,res,async function(err){        
           
            if(err){
                return res.json({
                    status:531,
                    message:'文件上传失败'
                })
            }else{
                let id = req.body.id
                let title = req.body.title
                let time = req.body.time
                if(!req.files.length>0){
                   res.json({
                       status:535,
                       message:'请确认视频'
                   })
                }
                let videoImg = req.files[0].filename
                let video = req.files[1].filename
                if(!id){
                    res.json({
                        status:535,
                        message:'请输入修改视频的ID'
                    })
                    return false;
                }
                if(!title){
                    res.json({
                        status:536,
                        message:'请输入修改视频的标题'
                    })
                    return false;
                }
                if(!video){
                    res.json({
                        status:537,
                        message:'请输入修改的视频'
                    })
                    return false;
                }

                let arr = [title,video,time,videoImg,id]
                let queryvideo = await data.queryvideo(id)
                if(!queryvideo){
                    let result = await data.updatevideo(arr)
                    if(result){
                        res.json({
                            status:200,
                            data:result,
                            message:'修改视频成功'
                        })
                    }else{
                        res.json({
                            status:538,
                            message:'修改视频失败'
                        })
                    }                   
                }else{
                    res.json({
                        status:538,
                        message:'该数据不存在'
                    })
                    return false;
                    
                }


            }            
        })
    },
    
    // 删除视频
    deletevideo:async function(req,res){
        let id = req.body.id
        if(!id){
            res.json({
                status:539,
                message:'请确认删除视频的ID'
            })
            return false;
        }
        let queryvideo = await data.queryvideo(id)
        if(!queryvideo){
            let result = await data.deletevideo(id)
            if(result){
                res.json({
                    status:200,
                    message:'删除视频成功'
                })
            }else{
                res.json({
                    status:539,
                    message:'删除视频失败'
                })
            }
        }else{
            res.json({
                status:538,
                message:'该视频不存在'
            })
            return false;
            
        }
    }

}