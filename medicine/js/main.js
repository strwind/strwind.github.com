
$(function () {
    // 6行的高度
    var SIX_HEIGHT = 140;
    var $autoParas = $('.common-auto-para');
    $autoParas.each(function (index, para) {
        var height = $(para).height();
        if (height > SIX_HEIGHT) {
            $(para).addClass('common-auto-para-ellipsis');
            $('<div class="common-auto-more-action-wrap"><span class="common-auto-more-action">查看更多</span></div>').insertAfter($(para));
        }
    });
    
    // 查看更多绑定事件
    var $moreAction = $('.common-auto-more-action');
    $moreAction.on('touch, click', function() {
        $(this).parent().parent().find('.common-auto-para').removeClass('common-auto-para-ellipsis');
        $(this).parent().remove();
    });
});
