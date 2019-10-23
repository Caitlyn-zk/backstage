
// 后台公共封装

module.exports = {

    // 新闻的数据验证
    /**
     * 
     * @param {String} img 新闻图片
     * @param {String} time 新闻时间
     * @param {String} title 新闻表题
     * @param {String} text 新闻详情
     */
    Data:function(req,res){
        if(!req.files.length>0){
            return res.json({
                status:600,
                message:'必须填文件哦'
            })
        }
        let img = req.files[0].filename
        let time = req.body.time
        let title = req.body.title
        let text = req.body.text
        if(!img){
            res.json({
                status:507,
                message:'请添加图片'
            })
            return false;
        }
        if(!time){
            res.json({
                status:508,
                message:'请输入时间'
            })
            return false;
        }

        if(!title){
            res.json({
                status:509,
                message:'请输入标题'
            })
            return false;
        }

        if(!text){
            res.json({
                status:510,
                message:'请输入详情'
            })
        }
        let arr = [img,time,title,text]
        return arr;
    }

    

}