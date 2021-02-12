// キャッシュクリア
// dateFormat();
function dateFormat () {
  let date = new Date();
  let Y = date.getFullYear().toString();
  let M = date.getMonth() + 1;
  let D = date.getDate().toString();
  let h = date.getHours().toString();
  let m = date.getMinutes().toString();
  let s = date.getSeconds().toString();
  let cash_clear = Y + M + D + h + m + s;
  window.addEventListener('load', windowLoad);
  function windowLoad() {
    let heads = document.querySelectorAll(':root>head link[href]:not([href^=http]):not([href^="//"])');
    let scripts = document.querySelectorAll(':root>head script[src]:not([src^=http]):not([src^="//"]), :root>body>script[src]:not([src^=http]):not([src^="//"])');
    let elements = document.querySelectorAll('.cash_clear[src]:not([src^=http]):not([src^="//"])');
    heads.forEach(function(e) {
      if(e.getAttribute('href')) {
        let path = e.getAttribute('href');
        let match = path.match(/([^/]+)./)[0];
        let filename = path.match(/([^/]+)\./)[1];
        e.setAttribute('href', match+filename+'.'+path.substring(path.lastIndexOf('.') + 1) + '?' + cash_clear);
      }
    });
    scripts.forEach(function(e) {
      if(e.getAttribute('src')) {
        let path = e.getAttribute('src');
        let match = path.match(/([^/]+)./)[0];
        let filename = path.match(/([^/]+)\./)[1];
        e.setAttribute('src', match+filename+'.'+path.substring(path.lastIndexOf('.') + 1) + '?' + cash_clear);
      }
    });
    elements.forEach(function(e) {
      if(e.getAttribute('src')) {
        let path = e.getAttribute('src');
        let match = path.match(/([^/]+)./)[0];
        let filename = path.match(/([^/]+)\./)[1];
        e.setAttribute('src', match+filename+'.'+path.substring(path.lastIndexOf('.') + 1) + '?' + cash_clear);
      }
    });
  }
}

// ページ内リンク用スムーススクロール
anchorScroll();
function anchorScroll() {
  let headerSpace = 48;
  let scrollSpeed = 550;
  $(window).on("load", function () {
    let firstLoadTimeout = setTimeout( function () {
      func_getHash();
      function func_getHash() {
        let getHash = location.hash;
        if (getHash[0]) {
          let position = $(getHash).offset().top;
          let timer = setTimeout( function () {
            if($('main').hasClass('pc')) {
              $('html, body').animate({ scrollTop: position }, scrollSpeed, "swing");
              clearTimeout(timer);
            } else {
              $('html, body').animate({ scrollTop: position - headerSpace }, scrollSpeed, "swing");
              clearTimeout(timer);
            }
          }, 650);
        }
      }
      $('header a[href^="#"]').on("click", function () {
        var href = $(this).attr("href");
        $(".sp.header_bar").removeClass("is_active");
        $(".header").removeClass("is_active");
        $("#burger-svg").removeClass("is_active");
        // 背景固定を解除
        $("html, body").css({
          "overflow-y": "auto",
          "-webkit-overflow-scrolling": "touch",
        });
      });
      $('.logo_block').on('click', function () {
        $("html, body").animate({
          scrollTop: $("html, body").offset().top
        }, scrollSpeed, "swing");
      });
      func_getHref();
      function func_getHref() {
        $('a[href^="#"]').on("click", function () {
          let href = $(this).attr("href");
          let target = $(href == "#" || href == "" ? "html" : href);
          let position = target.offset().top;
          if($('main').hasClass('pc')) {
            $("html, body").animate({
              scrollTop: position
            }, scrollSpeed, "swing");
          } else {
            $("html, body").animate({
              scrollTop: position - headerSpace
            }, scrollSpeed, "swing");
          }
        });
      }
      clearTimeout(firstLoadTimeout);
    }, 300);
  });
};

// メインビジュアルのスクロールエフェクト
func_elemOffsetPoint();
function func_elemOffsetPoint() {
  $(window).on("scroll", function () {
    if ($(".sec_catchcopy")[0]) {
      var scrollHeight = $(window).scrollTop() + $(window).height();
      let sec_offset1 = $(".sec_catchcopy").get(0).offsetTop;
      if (scrollHeight > sec_offset1 * 2) {
        $("body").css({
          "background-color": "#000",
        });
      } else {
        $("body").css({
          "background-color": "#fff",
        });
      }
      if (scrollHeight > sec_offset1 * 1.9) {
        // console.log(sec_offset1);
        $(".sec_main").css({
          opacity: 0,
        });
      } else {
        $(".sec_main").css({
          opacity: 1,
        });
      }
    }
  });
}

// ヘッダーのリサイズ処理、ハンバーガーボタン
// headerEvent();
function headerEvent() {
  $(window).on("load", function () {
    let window_width;
    let timeout = null;
    window_width = $(this).outerWidth();
    function resizeingPoint () {
      if (window_width > 960) {
        // console.log('pc size.');
        $(".sp.header_bar").removeClass("is_active");
        $("main").removeClass('sp').addClass('pc');
        $(".header").removeClass("tab sp is_active");
        $("#burger-svg").removeClass("is_active");
      }
      if (window_width <= 960 && window_width > 768) {
        // console.log('tablet size.');
        $("main").removeClass('pc').addClass('sp');
        $(".header").removeClass("sp");
        $(".header").addClass("tab");
      }
      if (window_width <= 768) {
        // console.log('sp size.');
        $("main").removeClass('pc').addClass('sp');
        $(".header").removeClass("tab");
        $(".header").addClass("sp");
      }
    }
    resizeingPoint();
    $(window).on("resize", function () {
      timeout = setTimeout( function () {
        // console.log(window_width);
        window_width = $(this).outerWidth();
        resizeingPoint();
        clearTimeout(timeout);
      }, 100);
    });
  });
  burger();
  function burger() {
    $("#burger-svg").on('click', function () {
      let windowHeight = $(window).height();
      // console.log(windowHeight);
      let elemPosition = $("body").get(0).offsetTop - windowHeight;
  
      if (!$(".sp.header_bar").hasClass("is_active")) {
        $(this).addClass("is_active");
        $(".sp.header_bar").addClass("is_active");
        $(".header").addClass("is_active");
  
        // ハンバーガーボタンをクリックしたあとの背景固定
        $("html, body").css({
          "overflow-y": "hidden",
        });
      } else {
        $("#burger-svg").removeClass("is_active");
        $(".sp.header_bar").removeClass("is_active");
        $(".header").removeClass("is_active");
  
        // 背景固定を解除
        $("html, body").css({
          "overflow-y": "auto",
          "-webkit-overflow-scrolling": "touch",
        });
        return false;
      }
    });
  }
};

// 更新情報のもっと見るボタン
// newsMoreBtn();
function newsMoreBtn() {
  $(".news_wrapper .btn__more").on("click", function () {
    $(".js__btn_more").addClass("is_closeed");
    $(".news_list:nth-child(1n+4)").css({
      "max-height": "100vh",
      'padding': 16 + "px",
    });
  });
  $('.news_block .news_list').each( function (i, e) {
    if (i < 3) {
      $(".js__btn_more").addClass("is_closeed");
    } else {
      $(".js__btn_more").removeClass("is_closeed");
    }
  });
};

accordion();
function accordion() {
  const accordionList = $('.js_accordion .accordion_list');
  const accordionBtn = $('.js_accordion .accordion_list .btn_accordion');
  const accordionContentsObj = $('.js_accordion .contents_block');
  const accordionCloseBtn = $('.js_accordion .js_close_btn');
  let height, heightAuto;
  let easingTime = 300;
  $(window).on('load', function () {
    if ($('.js_accordion')[0]) {
      $.each(accordionBtn, function(i, e){
        height = accordionContentsObj.eq(i).height();
        accordionContentsObj.eq(i).height(height);
      });
      function windowResizeing() {
        let timer = null;
        $(window).on('resize', function () {
          if (accordionContentsObj.hasClass('is_active')) {
            gindex = accordionList.index($('.is_active'));
            height = accordionContentsObj.eq(gindex).css('height', 'auto').height();
            clearTimeout(timer);
            timer = setTimeout(function () {
              accordionContentsObj.eq(gindex).height(height);
            }, easingTime);
          }
        });
      }
      windowResizeing();
    }
  });

  if ($('.js_accordion')[0]) {
    $('.js_accordion .accordion_list .btn_accordion').keyup(function (e) {
      let c = e.which ? e.which : e.keyCode;
      if (c == 9) {
        $(this).addClass('of-focus');
        $(this).find('a').addClass('of-focus');
        $(this).find('input[type=button]').addClass('of-focus');
      }
    });

    let btnOut = function () {
      $(this).css({
        'opacity': 1,
        'background-color': '#F7F7F7'
      });
    }

    let btnOut_notBgGray = function () {
      $(this).css({
        'opacity': 1,
      });
      $(this).find('.btn-title-group .btn-please-select').css({
        'text-decoration': 'none'
      });
    }

    let btnOver = function () {
      $(this).removeAttr('style');
      $(this).find('.btn-title-group .btn-please-select').css({
        'text-decoration': 'underline'
      });
    }

    let touchStart_notBgGray = function () {
      // console.log('touch start.');
      let timer = null;
      clearTimeout(timer);
      accordionBtn.removeAttr('style');
      timer = function () {
        accordionBtn.css({
          'opacity': 1
        }).blur();
        accordionBtn.find('.btn-title-group .btn-please-select').css({
          'text-decoration': 'underline'
        });
      }
      setTimeout(timer, 150);
    }

    if($('.mod-list-faq') || $('.js_accordion.of_step')[0]) {
      // console.log('step.');
      accordionBtn.on('touchstart touchend', touchStart_notBgGray);
      accordionBtn.on('mouseleave', btnOut_notBgGray);
      accordionBtn.on('mouseenter', btnOver);
    } else {
      // console.log('該当なし.');
      accordionBtn.on('touchstart touchend', touchStart_notBgGray);
      accordionBtn.on('mouseleave', btnOut);
      accordionBtn.on('mouseenter', btnOver);
    }

    function get_tabindex() {
      $.each(accordionBtn, function(i, e){
        if($(this).next().hasClass('is_active')) {
          $(e).next().find('button, a, input, select, textarea').removeAttr('tabindex');
        } else {
          $(e).next().find('button, a, input, select, textarea').attr('tabindex', -1);
        }
        // console.log(e);
      });
    }

    $(window).on('load', function() {
      get_tabindex();
    });

    accordionBtn.on('click', function () {
      let index = 0;
      index = accordionBtn.index(this);
      index_close = accordionCloseBtn.index(this);
      height = accordionContentsObj.eq(index).height();
      heightAuto = accordionContentsObj.eq(index).css('height', 'auto').height();
      accordionBtn.removeClass('of-focus');
      accordionBtn.find('a').removeClass('of-focus');
      accordionBtn.find('input[type=button]').removeClass('of-focus');

      if(!$(this).next().hasClass('is_active')) {
        accordionBtn.eq(index).next().find('button, a, input, select, textarea').removeAttr('tabindex');
      } else {
        accordionBtn.eq(index).next().find('button, a, input, select, textarea').attr('tabindex', -1);
      }

      if (!accordionList.eq(index).hasClass('is_active')) {
        if (accordionList.eq(index).parent().attr('data-event') === 'all-close') {
          let index_$c_accor = $('.js_accordion').index($(this).parents('.js_accordion'));
          $('.js_accordion').eq(index_$c_accor).find('.accordion_list').removeClass('is_active');
          $('.js_accordion').eq(index_$c_accor).find('.contents_block').removeClass('is_active').height(height).stop().animate({
            'height': 0,
          }, easingTime);
          accordionCloseBtn.removeClass('is_active');

          function all_close (i, e) {
            accordionList.eq(index).addClass('is_active');//all_closeを実行した際にclass"is_active"が繰り返し時に取得できないため再実行で付与
            accordionContentsObj.eq(index).addClass('is_active');//all_closeを実行した際にclass"is_active"が繰り返し時に取得できないため再実行で付与
            let elem_attr_class = $(e).attr('class');
            let elem_attr_class_split = elem_attr_class.split(' ');
            const is_true =  1;
            const is_false = -1;
            if($.inArray('is_active', elem_attr_class_split) === is_false) {
              $(this).find('.contents_block').find('button, a, input, select, textarea').attr('tabindex', -1);
            }
            if($.inArray('is_active', elem_attr_class_split) === is_true) {
              $(this).find('.contents_block').find('button, a, input, select, textarea').removeAttr('tabindex');
            }
          }
          $.each($(this).parents('[data-event="all-close"]').children('.accordion_list'), all_close);

        }
        accordionList.eq(index).addClass('is_active');
        accordionContentsObj.eq(index).addClass('is_active').height(height).stop().animate({
          'height': heightAuto
        }, easingTime);
        accordionCloseBtn.eq(index_close).addClass('is_active');
      } else {
        accordionList.eq(index).removeClass('is_active');
        accordionContentsObj.eq(index).removeClass('is_active').stop().animate({
          'height': 0,
        }, easingTime);
        accordionCloseBtn.eq(index).removeClass('is_active');
      }
    });
    accordionCloseBtn.on('click', function () {
      $(this).parents('.accordion_list').removeClass('is_active');
      $(this).parents('.contents_block').removeClass('is_active').stop().animate({
        'height': 0,
      }, easingTime);
      accordionCloseBtn.removeClass('is_active');
      get_tabindex();
    });
  }
}

// Google Maps
function initMap() {
  // 地図の初期中心座標を指定
  var latLngCenter1 = new google.maps.LatLng(43.058129,141.353485,16+'z');// Hokkaido
  var latLng1 = new google.maps.LatLng(43.058129,141.353485,16+'z');// Hokkaido
  var customZoom = 15;
  //TOKYO MAP
  var map_01 = new google.maps.Map(
    document.getElementById("map1"),
    {
      zoom: customZoom,
      center: latLngCenter1,
      scrollwheel: false
    }
  );

  // MARKER POSITION
  // Hokkaido
  var marker1 = new google.maps.Marker({
    position: latLng1,
    map: map_01,
  });
}

// 背景画像のパララックス
parallaxBgimg();
function parallaxBgimg(){
  if($('.bg_parallax')[0]) {
    $.each($('.bg_parallax'), function(i, e) {
      $(window).on('load', loadEvent);
      function loadEvent() {
        let bg_elem, h, start_bg_y;//高さ取得と背景画像の計算式
        bg_elem = $(e).offset().top;
        h = $(window).height();
        start_bg_y = bg_elem - h;

        $(window).on('scroll', scrollEvent);
        function scrollEvent(){
          let y = $(this).scrollTop();
          if(y >= start_bg_y) {
            $(e).css({
              'background-position-y': -(y - bg_elem) * 0.2 + 'px'
            });
          }
        }

        let timer = null;
        $(window).on('resize', resizeEvent);
        function resizeEvent() {
          timer = setTimeout(timeout, 150);
          function timeout() {
            bg_elem = $(e).offset().top;
            h = $(window).height();
            start_bg_y = bg_elem - h;
            clearTimeout(timer);
          }
        }
      }
    });
  }
}

// 各種ライブラリー
rellax();
function rellax() {
  if($('.rellax')[0]) {
    var rellax = new Rellax('.rellax', {
      speed: -2,
      center: false,
      wrapper: null,
      vertical: true,
      horizontal: false
    });
  }
}

// Cookie
cookie();
function cookie() {
  $.cookie();

}