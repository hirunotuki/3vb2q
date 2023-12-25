//load typekit
(function (d) {
  var config = {
    kitId: 'lxz5eew',
    scriptTimeout: 3000,
    async: true
  },
    h = d.documentElement, t = setTimeout(function () { h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive"; }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a; h.className += " wf-loading"; tk.src = 'https://use.typekit.net/' + config.kitId + '.js'; tk.async = true; tk.onload = tk.onreadystatechange = function () { a = this.readyState; if (f || a && a != "complete" && a != "loaded") return; f = true; clearTimeout(t); try { Typekit.load(config) } catch (e) { } }; s.parentNode.insertBefore(tk, s)
})(document);

//loading view
$(() => {
  $(window).on('load', () => {
    $('.l-loader__content').delay(600).fadeOut(600);
    $('.l-loader__container').delay(900).fadeOut(800);
  })
  setTimeout(() => {
    $('.l-loader__container').fadeOut(600);
  }, 5000);
})

//load header & footer
$(() => {
  $('.js-header').load('https://kanwakyudai.github.io/i-vote/component/header.html')
  $('.js-footer').load('https://kanwakyudai.github.io/i-vote/component/footer.html')
})

// shrink header on scroll
$(() => {
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
})

//header transition
// $(() => {
//   // let cawTop = $('#codeAreaContainer').offset().top;
//   let introH = $('#introduction').height();
//   $('main').on('scroll', () => {
//     let scroll = $('main').scrollTop();
//     if (scroll >= introH) {
//       $('header').addClass('whileCode');
//       $('main').addClass('whileCode');
//       // cawTop = $('#codeAreaContainer').position().top;
//     }
//     else {
//       $('header').removeClass('whileCode');
//       $('main').removeClass('whileCode');
//       // cawTop = $('#codeAreaContainer').position().top;
//     }
//   })
// })