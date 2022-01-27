$(document).ready(function () {

  /* menu */
  let $btnHamburger = $('.header__burger');
  let $navbarList = $('.header-navbar');
  let $window = $(window);
  let $html = $('html');
  let $body = $('body');
  let isShow = false;
  let isStop = true;
  /* menu */

  /* slider */
  let $slides = $('.slide__item');
  let $indContainer = $('.slide-pagination');
  let $indItems = $('.slide-pagination__item');
  let currentSlide = 0;
  let playbackStatus = true;
  const carouselInterval = 5000;
  const movedInterval = 500;
  /* slider */

  /* menu */
  let toggleActive = () => {
    $btnHamburger.toggleClass('header__burger--active');
    isShow ? $body.removeAttr('class') : $body.toggleClass('active');
    isShow ? $html.removeAttr('class') : $html.toggleClass('active');
    !isShow && playbackStatus && pauseSlideShow();
    $navbarList.fadeToggle(500);
    isShow = !isShow;
  };

  let resetMenu = () => {
    $btnHamburger.removeClass('header__burger--active');
    $body.removeAttr('class');
    $navbarList.removeAttr('style');
    isShow = false;
  };

  $btnHamburger.on('click', () => {
    toggleActive();

    return false;
  });

  $body.on('click', () => isShow && toggleActive());

  $window.on('resize', () => {
    if ($window.width() > 768 && isStop) {
      isStop = false;
      setTimeout(() => {
        resetMenu();
        isStop = true;
      }, 200);
    }
  });
  /* menu */

  /* slider */
  let gotoNSlide = (n) => {
    const i = currentSlide;

    $($slides[currentSlide]).toggleClass('active moved');
    $($indItems[currentSlide]).toggleClass('active');
    currentSlide = (n + $slides.length) % $slides.length;
    $($slides[currentSlide]).toggleClass('active');
    $($indItems[currentSlide]).toggleClass('active');

    setTimeout(() => {
      $($slides[i]).removeClass('moved');
    }, movedInterval);
  };

  let gotoNextSlide = () => gotoNSlide(currentSlide + 1);

  let slideInterval = setInterval(gotoNextSlide, carouselInterval);

  function pauseSlideShow() {
    if (playbackStatus) {
      playbackStatus = !playbackStatus;
      clearInterval(slideInterval);
    }
  }

  let clickIndicatorBtn = (e) => {
    pauseSlideShow();
    gotoNSlide(+e.target.getAttribute('data-slide-to'));
  };

  $indContainer.on('click', '.slide-pagination__item', clickIndicatorBtn);
  /* slider */
});
