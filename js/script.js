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


$(() => {
  $(window).on('load', () => {
    colW = $('.js-card').outerWidth() + offsetX * 2;
    gridArray = [];
    for (var i = 0; i < numOfCol; i++) {
      pushGridArray(i, 0, -offsetY);
    }
    $('.js-card').each(function (index) {
      setPosition($(this));
    });
  })
})
var gridArray = [],
  colWidth,
  offsetX = 5,
  offsetY = 5,
  numOfCol = 5;

function pushGridArray(x, y, height) {
  var grid = {};
  grid.x = x;
  grid.endY = y + height + offsetY * 2;
  gridArray.push(grid);
}
function removeGridArray(x) {
  var idx = getGridIndex(x);
  gridArray.splice(idx, 1);
}
function getHeightArray(x) {
  var heightArray = {};
  var temps = [];
  var idx = getGridIndex(x);
  temps.push(gridArray[idx].endY);
  heightArray.min = Math.min.apply(Math, temps);
  heightArray.max = Math.max.apply(Math, temps);
  heightArray.x = temps.indexOf(heightArray.min)
  return heightArray
}
function getGridIndex(x) {
  for (var i = 0; i < gridArray.length; i++) {
    var obj = gridArray[i];
    if (obj.x === x) {
      return i;
    }
  }
}
function setPosition(grid) {
  var pos = {};
  var tempH = getHeightArray(0, gridArray.length);
  pos.x = tempH.x;
  pos.y = tempH.min;
  grid.css({
    'left': pos.x * colW,
    'top': pos.y,
    'position': 'absolute'
  })
  removeGridArray(pos.x, grid.data('size'));
  pushGridArray(pos.x, pos.y, grid.data('size'), grid.outerHeight());
}
