$(() => {
  // loading view
  $(window).on('load', () => {
    $('.l-loader__content').delay(600).fadeOut(600);
    $('.l-loader__container').delay(900).fadeOut(800);
  })
  setTimeout(() => {
    $('.l-loader__container').fadeOut(600);
  }, 5000);

  //load header & footer
  $('.js-header').load('https://hirunotuki.github.io/i-vote_24/include/header.html')
  $('.js-footer').load('https://hirunotuki.github.io/i-vote_24/include/footer.html')

  // shrink header on scroll
  let mvHeight = $('.js-mv').height();
  let headerHeight = $('.js-header').height();
  $(window).on('scroll', () => {
    let scrollHeight = $(window).scrollTop();
    if (scrollHeight >= (mvHeight - headerHeight)) {
      $('.js-header').addClass('narrow')
    }
    else {
      $('.js-header').removeClass('narrow')
    }
  })

  // sns prevew
  $(document).ajaxStop(() => {
    toggleSnsPrevew();
  })
  
  function toggleSnsPrevew() {
    $('.js-header_sns').on('mouseenter', (e) => {
      if (!$(e.currentTarget).hasClass('is-active')) {
        $('.js-header_sns.is-active').removeClass('is-active');
        $('.js-sns_prevew.is-unfolded').removeClass('is-unfolded');
        $(e.currentTarget).addClass('is-active');
        let prev_box = $(e.currentTarget).find('.js-sns_prevew')
        $(prev_box).addClass('is-unfolded');
        $(prev_box).find('.note-embed').attr('height', '400')
      }
    })
  }
})