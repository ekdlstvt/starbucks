// PC
$(function() {
  // header 메뉴 영역
  const $gnb = $("header > nav > .gnb");
  const $bg = $("header > .pc-bg");

  $gnb.find("li").on({
    mouseenter: function() {
      $(this).children(".lnb").show();

      $bg.children(".lnb-mnu-bg").css({
        height: $(this).find(".lnb-mnu").height()
      });

      $bg.children(".lnb-sv-bg").css({
        height: $(this).find(".lnb-sv").height() + 40
      });

      $bg.stop().slideDown();
      $gnb.find(".lnb").css({ opacity: 1 });
    },
    mouseleave: function() {
      $(this).children(".lnb").stop().hide();
      $gnb.find(".lnb").css({ opacity: 0 });

      $bg.hide();
    }
  });

  // main-visual 영역
  const $slogan = $("section .main-visual-container > h4");
  const $detail = $("section .main-visual-container > .detail > a");
  const $drinkimg = $("section .main-visual-container  p");

  $(window).on("load", function() {
    $slogan.addClass("on");
    $detail.addClass("on");
    $drinkimg.addClass("on");
  });

  $detail.on({
    mouseenter: function() {
      $(this).addClass("hv");
    },
    mouseleave: function() {
      $(this).removeClass("hv");
    }
  });
});

$(function() {
  let nowIdx = 0;
  let aniChk = false;
  let intervalKey = null;

  // notice 영역

  nowIdx = 3;

  const $noticeContainer = $(
    "section > .line-info > .notice > .notice-container > dl > dd > ul"
  );

  $(window).on("load", function() {
    intervalKey = setInterval(function() {
      if (aniChk == false) {
        aniChk = true;
        nowIdx++;

        if (nowIdx == 6) {
          nowidx = 0;
        }

        $noticeContainer
          .stop()
          .animate({ top: "-=20" }, "easeInBack", function() {
            $noticeContainer.children("li").first().appendTo($noticeContainer);

            $noticeContainer.css({ top: "+=20" });

            aniChk = false;
          });
      }
    }, 3000);
  });
});

// promotion 영역
$(function() {
  const $promotion = $("section > .line-info > .promotion");
  const $prmtContainer = $(
    "section > .line-info > .promotion > .promotion-slides > .promotion-slides-container"
  );
  const $prevNext = $(
    "section > .line-info > .promotion > .promotion-slides > .prevNext"
  );

  const $pausePlay = $(
    "section > .line-info > .promotion > .promotion-slides > .pausePlay"
  );

  const $indicators = $(
    "section > .line-info > .promotion > .promotion-slides > .promotion-slides-pagination > li > a"
  );

  let nowIdx = 0;
  let aniChk = false;
  let intervalKey = null;

  const nextSlide = function() {
    if (aniChk == false) {
      aniChk = true;

      nowIdx++;

      if (nowIdx == 9) {
        nowIdx = 0;
      }
      console.log(nowIdx);

      if ($(window).width() > 960) {
        $prmtContainer
          .children("li")
          .eq(2)
          .addClass("on")
          .siblings()
          .removeClass("on");

        $prmtContainer
          .stop()
          .animate({ left: "-=845" }, "easeInBack", function() {
            $prmtContainer.children("li").first().appendTo($prmtContainer);

            $prmtContainer.css({ left: "+=845" });

            aniChk = false;
          });
      } else {
        $prmtContainer
          .children("li")
          .eq(3)
          .addClass("on")
          .siblings()
          .removeClass("on");

        $prmtContainer
          .stop()
          .animate({ left: "-=520" }, "easeInBack", function() {
            $prmtContainer.children("li").first().appendTo($prmtContainer);

            $prmtContainer.css({ left: "+=520" });

            aniChk = false;
          });
      }

      indicators();
    }
  };

  const prevSlide = function() {
    if (aniChk == false) {
      aniChk = true;

      nowIdx--;

      if (nowIdx == -1) {
        nowIdx = 8;
      }

      if ($(window).width() > 960) {
        $prmtContainer
          .children("li")
          .eq(0)
          .addClass("on")
          .siblings()
          .removeClass("on");

        $prmtContainer
          .stop()
          .animate({ left: "+=845" }, "easeInback", function() {
            $prmtContainer.children("li").last().prependTo($prmtContainer);

            $prmtContainer.css({ left: "-=845" });

            aniChk = false;
          });
      } else {
        $prmtContainer
          .children("li")
          .eq(1)
          .addClass("on")
          .siblings()
          .removeClass("on");

        $prmtContainer
          .stop()
          .animate({ left: "+=520" }, "easeInback", function() {
            $prmtContainer.children("li").last().prependTo($prmtContainer);

            $prmtContainer.css({ left: "-=520" });

            aniChk = false;
          });
      }

      indicators();
    }
  };

  // 슬라이드 내리기
  $promotion.find(".more").on("click", function(evt) {
    evt.preventDefault();

    $promotion.children(".promotion-slides").slideToggle();

    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $("section > .rewards").animate({ marginTop: 0 });
    } else {
      $(this).addClass("on");
      if ($(window).width() > 960) {
        $("section > .rewards").animate({ marginTop: 700 });
      } else {
        $("section > .rewards").animate({ marginTop: 450 });
      }
    }

    // 무한슬라이드 자동실행 코드
    intervalKey = setInterval(function() {
      nextSlide();
    }, 3000);
  });

  // 이전 다음
  $prevNext.children(".next").on("click", function(evt) {
    evt.preventDefault();

    nextSlide();
    clearInterval(intervalKey);
    $pausePlay.addClass("pause");
  });

  $prevNext.children(".prev").on("click", function(evt) {
    evt.preventDefault();

    prevSlide();
    clearInterval(intervalKey);
    $pausePlay.addClass("pause");
  });

  // 재생멈춤
  $pausePlay.on("click", function(evt) {
    evt.preventDefault();

    if ($(this).hasClass("pause")) {
      $(this).removeClass("pause");

      intervalKey = setInterval(function() {
        nextSlide();
      }, 3000);
    } else {
      $(this).addClass("pause");

      clearInterval(intervalKey);
    }
  });

  // 인디케이터
  $indicators.on("click", function(evt) {
    evt.preventDefault();

    let indiIdx = [0, 1, 2, 0, 1, 2, 0, 1, 2];

    $indicators
      .parent()
      .eq(indiIdx[nowIdx])
      .addClass("on")
      .siblings()
      .removeClass("on");
  });

  const indicators = function() {
    let indiIdx = [0, 1, 2, 0, 1, 2, 0, 1, 2];

    $indicators
      .parent()
      .eq(indiIdx[nowIdx])
      .addClass("on")
      .siblings()
      .removeClass("on");
  };
});

// wow 플러그인
$(function() {
  new WOW().init();
});

// mobile
$(function() {
  const $gnb = $("header > .m-nav > .m-nav-container >.gnb > li > a");
  const $lnb = $("header > .m-nav > .m-nav-container >.gnb .lnb > li > a");
  const $mBg = $("header > .m-bg > span");
  const $clse = $("header > .m-nav > .clse");

  $gnb.on({
    click: function(evt) {
      evt.preventDefault();

      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
      } else {
        $(this).addClass("open");
      }

      $(this).next(".lnb").slideToggle();
    }
  });

  $lnb.on({
    click: function(evt) {
      evt.preventDefault();

      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
      } else {
        $(this).addClass("open");
      }

      $(this).next(".lnb-sub").slideToggle();
    }
  });

  // 모바일ver 메뉴 열기
  $("header > .pc-nav > .snb > .whole > a").on("click", function() {
    $("header > .m-nav").css({ right: 0 });
    $(".m-nav-container").addClass("open");
    $mBg.fadeIn(1000);
    $clse.stop().animate({ left: -50 }, 700);

    $("header > .m-nav").css({ "z-index": "5000" });
  });

  // 모바일ver 메뉴 닫기
  $clse.on("click", function() {
    $("header > .m-nav").css({ right: -600 });
    $(".m-nav-container").removeClass("open");
    $mBg.fadeOut(1000);
    $clse.animate({ left: 750 }, function() {
      $("header > .m-nav").css({ "z-index": "100" });
    });
  });
});

// m - footer 메뉴
$(function() {
  const $gnb = $("footer > .m-container > .gnb > li > a");
  const $lnb = $("footer > .m-container > .gnb  .lnb > li > a");
  const $slides = $("footer > .m-container > .reward > ul");

  $gnb.on({
    click: function(evt) {
      evt.preventDefault();

      if ($(this).parent().hasClass("open")) {
        $(this).parent().removeClass("open");
      } else {
        $(this).parent().addClass("open");
      }

      $(this).next(".lnb").slideToggle();
    }
  });

  $lnb.on({
    click: function(evt) {
      evt.preventDefault();

      if ($(this).parent().hasClass("open")) {
        $(this).parent().removeClass("open");
      } else {
        $(this).parent().addClass("open");
      }

      $(this).next(".sub").slideToggle();
    }
  });

  $(window).on("load", function() {
    let nowIdx = null;
    setInterval(function() {
      if (nowIdx < 5) {
        nowIdx++;
      } else {
        nowIdx = 0;
      }

      $slides.stop().animate({
        left: "-189" * nowIdx
      });
    },4000);
  });
});
