$(document).ready(function(){
    $('.dropdown-toggle').dropdown();
});
$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var $navbar = $(".dropdown-menu");
        var _opened = $navbar.hasClass("show");
        if (_opened === true && !clickover.hasClass("dropdown-toggle")) {
            $navbar.removeClass("show");
        }
    });
});