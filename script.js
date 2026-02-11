(function($) {
  $.fn.timeline = function() {
    var selectors = {
      id: $(this),
      item: $(this).find(".timeline-item"),
      activeClass: "timeline-item--active",
      img: ".timeline__img"
    };

    selectors.item.eq(0).addClass(selectors.activeClass);
    var firstImg = selectors.item.first().find(selectors.img).attr("src");
    selectors.id.css("background-image", "url(" + firstImg + ")");

    $(window).scroll(function() {
      var scrollPos = $(this).scrollTop();
      var windowHeight = $(window).height();
      var centerScreen = scrollPos + (windowHeight / 2);

      selectors.item.each(function() {
        var itemOffset = $(this).offset().top;
        var itemHeight = $(this).outerHeight();

        if (centerScreen > itemOffset && centerScreen < (itemOffset + itemHeight)) {
          selectors.item.removeClass(selectors.activeClass);
          $(this).addClass(selectors.activeClass);
          var currentImg = $(this).find(selectors.img).attr("src");
          selectors.id.css("background-image", "url(" + currentImg + ")");
        }
      });
    });

    $(document).keydown(function(e) {
      var activeItem = $("." + selectors.activeClass);
      var targetItem;

      if (e.which == 40) { targetItem = activeItem.next(".timeline-item"); }
      else if (e.which == 38) { targetItem = activeItem.prev(".timeline-item"); }

      if (targetItem && targetItem.length) {
        var windowHeight = $(window).height();
        var contentBlock = targetItem.find(".timeline__content");
        
        // CÁLCULO DE CENTRADO: Posición del bloque - (mitad de pantalla - mitad del bloque)
        var targetScroll = contentBlock.offset().top - (windowHeight / 2) + (contentBlock.outerHeight() / 2);

        $('html, body').stop().animate({
          scrollTop: targetScroll
        }, 600);
        
        e.preventDefault();
      }
    });
  };
})(jQuery);

$("#timeline-1").timeline();