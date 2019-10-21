
(function($,w){

    /**
     * @description 消息弹出框
     * 调用方法  $.toolTip({type,content,interval})
     * @param options obj
     * @param type String 提示类型 success info warning danger
     * @param content String 提示的内容
     * @param interval 提示框消失的时间  单位为秒
     * @author guozhitao
     * 注：此方法在有jQuery和bootstrap的前提下使用
     * */ 
    $.toolTip = function(options){
        
        var alert = `
            <div class="modal fade" tabindex="-1" id="myModal" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">提示</h4>
                        </div>
                        <div class="modal-body ">
                            <h2 class="text-center alert alert-${options.type}" role="alert">${options.content}</h2>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">关闭窗口</button>

                        </div>
                    </div>
                </div>
            </div>`
        $("body").append(alert)
        // 添加延时器
        w.timer=setTimeout(function(){
            $("#myModal").remove()
            $(".modal-backdrop").remove()
            // alert.remove()

        },options.interval*1000 || 3000)

    }
})(jQuery,window)