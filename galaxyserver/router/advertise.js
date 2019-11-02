let data = require('../controlor/data/data')
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
    // 添加招聘信息
    addadvertise:function(req,res){
        upload(req,res,async function(err){
            if(err){
                return res.json({
                    status:600,
                    message:'表单数据提交失败'
                })
            }else{
                let section = req.body.section
                let name = req.body.name
                let place = req.body.place
                console.log(req.body)
                if(!section){
                    res.json({
                        status:541,
                        message:'请确认招聘信息部门'
                    })
                    return false;
                }
                if(!name){
                    res.json({
                        status:542,
                        message:'请确认招聘岗位'
                    })
                    return false;
                }
                if(!place){
                    res.json({
                        status:543,
                        message:'请确认招聘地区'
                    })
                    return false;
                }
        
                let arr = [section,name,place]
                
                let result = await data.addadvertise(arr)
                if(result){
                    res.json({
                        status:200,
                        message:'添加招聘信息成功'
                    })
                }else{
                    res.json({
                        status:544,
                        message:'添加招聘信息失败'
                    })
                }
            }
        })
        

    },

    // 通过id获取招聘信息
    getadvertiseById:async function(req,res){
        let id = Number(req.body.id)
        if(!id){
            res.json({
                status:600,
                message:'请输入获取信息的ID'
            })
            return false
        }
        let result = await data.getadvertiseById(id)
        if(result){
            res.json({
                status:200,
                data:result,
                message:'通过id获取商品信息成功'
            })
        }else{
            res.json({
                status:540,
                message:'获取招聘信息失败'
            })
        }
    },
    // 获取招聘信息
    getadvertise:function(req,res){
        upload(req,res,async function(err){
            if(err){
                return res.json({
                    status:600,
                    message:'表单数据提交失败'
                })
            }else{
                let result  =await data.getadvertise()
                if(result){
                    res.json({
                        status:200,
                        data:result,
                        message:'获得招聘信息成功'
                    })
                }else{
                    res.json({
                        status:540,
                        message:'获取招聘信息失败'
                    })
                }
            }
        })
        
    },

    // 修改招聘信息
    updateadvertise:function(req,res){
        upload(req,res,async function(err){
            if(err){
                return res.json({
                    status:600,
                    message:'表单数据提交失败'
                })                
            }else{
                let section = req.body.section
                let name = req.body.name
                let place = req.body.place
                let id = req.body.id
                if(!section){
                    res.json({
                        status:541,
                        message:'请确认招聘信息部门'
                    })
                    return false;
                }
                if(!name){
                    res.json({
                        status:542,
                        message:'请确认招聘岗位'
                    })
                    return false;
                }
                if(!place){
                    res.json({
                        status:543,
                        message:'请确认招聘地区'
                    })
                    return false;
                }
                if(!id){
                    res.json({
                        status:544,
                        message:'请确认招聘信息ID'
                    })
                }
                let queryadvertise = await data.queryadvertise(id)    
                if(!queryadvertise){
                    res.json({
                        status:545,
                        message:'该招聘不存在'
                    })
                }else{
                    let arr = [section,name,place,id]
                    let result = await data.updateadvertise(arr)
                    if(result){
                        res.json({
                            status:200,
                            message:'修改招聘信息成功'
                        })
                    }else{
                        res.json({
                            status:546,
                            message:'修改招聘信息失败'
                        })
                    }
                }
            }
        })
        
    },

    // 删除招聘信息
    deleteadvertise:async function(req,res){
        let id = req.body.id
        if(!id){
            res.json({
                status:547,
                message:'请确认删除招聘信息ID'
            })
            return false;
        }
        let queryadvertise = await data.queryadvertise(id)    
        if(!queryadvertise){
            res.json({
                status:545,
                message:'该招聘不存在'
            })
        }else{
            let result = await data.deleteadvertise(id)
            if(result){
                res.json({
                    status:200,
                    message:'删除招聘信息成功'
                })
            }else{
                res.json({
                    status:548,
                    message:'删除招聘信息失败'
                })
            }
        } 
    },

    // 根据页码和所需要的信息量获取招聘信息
    getadvertiseBypage:async function(req,res){
        let page = Number(req.body.page) 
        let count = Number(req.body.count)
        
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
                message:'请确认该页的数量'
            })
            return false;
        }
        //计算limit 起始数据条数 
        let start = (page-1)*count
        let arr = [start,count]
        let result =await data.getadvertiseByPage(arr)
        if(result){
            res.json({
                status:200,
                data:result,
                message:'分页数据获取成功'
            })
        }else{
            res.json({
                status:559,
                message:'获取分页数据失败'
            })
        }
    }

}