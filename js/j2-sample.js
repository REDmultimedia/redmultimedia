/*!
Custom JS for j2 cloud services
*/
 $( document ).ready(function() {
  therealwidth();
  animatescroll();
  headercheck();
}); 
//closes document.ready

//changes header size
$(window).scroll(function() {
   animatescroll();
   headercheck();
});

//checks window resize
$(window).on("resize", function () {  
  function resizedw(){
    therealwidth();
    animatescroll();
    headercheck();
  }

  var doit;
  window.onresize = function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };


});

//find media quries for js  
function therealwidth(){  
  var theviewportsize = $(".viewportfixer").width();
  if (theviewportsize == 1440){
    mediaquery = 1440;
  } else if (theviewportsize == 1200){
    mediaquery = 1200;
  } else if (theviewportsize == 991){
    mediaquery = 991;
  } else if (theviewportsize == 767){
    mediaquery = 767;
  } else if (theviewportsize == 450){
    mediaquery = 450;
  } 
  console.log(mediaquery);
}

function headercheck(){
    if($(document).scrollTop()>300 && mediaquery >= 767) {
      $(".header").removeClass("large").addClass("small");       
    }
    else {
      $(".header").removeClass("small").addClass("large");
    } 
    homepageheadercheck();
}

function homepageheadercheck(){
  if ($(".header").hasClass("homepage-header")){
    if ($(".header").hasClass("small") ){        
        $(".navbar-brand").delay(100).show(0).addClass('visible');
    }  else {        
         $(".navbar-brand").hide().removeClass('visible');
    }  
  }
}

function animatescroll(){
  //if (mediaquery >= 450){

    $('.scroll-animate').each(function(i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();   
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
          $(this).addClass('animated fadeInUp');
        }    
      });  
    /*} else {
      $('.scroll-animate').each(function(i) {
         $(this).addClass('animated fadeInUp');
      });  
    }*/
  }





// inview
/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function (factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS
    module.exports = factory(require('jquery'));
  } else {
      // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var inviewObjects = [], viewportSize, viewportOffset,
      d = document, w = window, documentElement = d.documentElement, timer;

  $.event.special.inview = {
    add: function(data) {
      inviewObjects.push({ data: data, $element: $(this), element: this });
      // Use setInterval in order to also make sure this captures elements within
      // "overflow:scroll" elements or elements that appeared in the dom tree due to
      // dom manipulation and reflow
      // old: $(window).scroll(checkInView);
      //
      // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
      // intervals while the user scrolls. Therefore the inview event might fire a bit late there
      //
      // Don't waste cycles with an interval until we get at least one element that
      // has bound to the inview event.
      if (!timer && inviewObjects.length) {
         timer = setInterval(checkInView, 250);
      }
    },

    remove: function(data) {
      for (var i=0; i<inviewObjects.length; i++) {
        var inviewObject = inviewObjects[i];
        if (inviewObject.element === this && inviewObject.data.guid === data.guid) {
          inviewObjects.splice(i, 1);
          break;
        }
      }

      // Clear interval when we no longer have any elements listening
      if (!inviewObjects.length) {
         clearInterval(timer);
         timer = null;
      }
    }
  };

  function getViewportSize() {
    var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };

    // if this is correct then return it. iPad has compat Mode, so will
    // go into check clientHeight/clientWidth (which has the wrong value).
    if (!size.height) {
      mode = d.compatMode;
      if (mode || !$.support.boxModel) { // IE, Gecko
        domObject = mode === 'CSS1Compat' ?
          documentElement : // Standards
          d.body; // Quirks
        size = {
          height: domObject.clientHeight,
          width:  domObject.clientWidth
        };
      }
    }

    return size;
  }

  function getViewportOffset() {
    return {
      top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
      left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
    };
  }

  function checkInView() {
    if (!inviewObjects.length) {
      return;
    }

    var i = 0, $elements = $.map(inviewObjects, function(inviewObject) {
      var selector  = inviewObject.data.selector,
          $element  = inviewObject.$element;
      return selector ? $element.find(selector) : $element;
    });

    viewportSize   = viewportSize   || getViewportSize();
    viewportOffset = viewportOffset || getViewportOffset();

    for (; i<inviewObjects.length; i++) {
      // Ignore elements that are not in the DOM tree
      if (!$.contains(documentElement, $elements[i][0])) {
        continue;
      }

      var $element      = $($elements[i]),
          elementSize   = { height: $element[0].offsetHeight, width: $element[0].offsetWidth },
          elementOffset = $element.offset(),
          inView        = $element.data('inview');

      // Don't ask me why because I haven't figured out yet:
      // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
      // Even though it sounds weird:
      // It seems that the execution of this function is interferred by the onresize/onscroll event
      // where viewportOffset and viewportSize are unset
      if (!viewportOffset || !viewportSize) {
        return;
      }

      if (elementOffset.top + elementSize.height > viewportOffset.top &&
          elementOffset.top < viewportOffset.top + viewportSize.height &&
          elementOffset.left + elementSize.width > viewportOffset.left &&
          elementOffset.left < viewportOffset.left + viewportSize.width) {
        if (!inView) {
          $element.data('inview', true).trigger('inview', [true]);
        }
      } else if (inView) {
        $element.data('inview', false).trigger('inview', [false]);
      }
    }
  }

  $(w).on("scroll resize scrollstop", function() {
    viewportSize = viewportOffset = null;
  });

  // IE < 9 scrolls to focused elements without firing the "scroll" event
  if (!documentElement.addEventListener && documentElement.attachEvent) {
    documentElement.attachEvent("onfocusin", function() {
      viewportOffset = null;
    });
  }
}));



//mobile nav for homepage
$(function () { 
    $('#mobileNav').on('click', function (e) {
       if ($(this).hasClass("collapsed")){
        $(".navbar-header").addClass('open');
       } else {
      $(".navbar-header").removeClass('open');
       }
    });
});

