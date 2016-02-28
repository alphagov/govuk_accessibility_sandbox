$(function(){

    var $control = $('.disclosure-control');
    var $content = $('#disclosure-content-1');

    $control.on('click', function() {
        if($(this).attr("aria-expanded")== "false") {
            $control.attr("aria-expanded", "true");
            $content.attr("aria-hidden", "false");
        } else {
            $control.attr("aria-expanded", "false");
            $content.attr("aria-hidden", "true");
        }
    });
});


