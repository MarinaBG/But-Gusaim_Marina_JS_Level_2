$('.tabName').click( function() {
    if ($(this).hasClass('active')) return;
    
    $('.tabName').removeClass('active');
    $(this).addClass('active');
    $('.tabsText').fadeOut(300);
    $('div.tabsText').eq($(this).index()).fadeIn(1000);
    $(this).bind('click',function(){return false;})
})
