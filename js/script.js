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
  $('.js-header').load('https://hirunotuki.github.io/i-vote_24/include/header.html')
  $('.js-footer').load('https://hirunotuki.github.io/i-vote_24/include/footer.html')
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

// sns prevew
$(() => {
  $('.js-header_sns').on('mouseover', () => {
    if (!$(Event.currentTarget).hasClass('is-active')) {
      $('.js-header_sns.is-active').removeClass('is-active');
      $('.js-sns_prevew.is-unfolded').removeClass('is-unfolded')
      $(Event.currentTarget).addClass('is-active')
      $(Event.currentTarget).find('.js-sns_prevew').addClass('is-unfolded')
    }
  })
})

// place cards
$(() => {
  $(window).on('load', () => {
    container = $('.js-members');
    placeCard();
  })
  $(window).on('resize', () => {
    console.log('resized')
    container.css('width', "")
    placeCard();
  })
  function placeCard() {
    containerW = container.width();
    colW = $('.js-card').outerWidth() + gapXMin;
    membersResize();
    applyGrid();
  }

  let gridArray,
    colW,
    gapXMin = 30,
    gapXMax = 60,
    gapX = gapXMin,
    gapY = 30,
    numOfCol,
    container,
    containerW;

  function applyGrid() {
    gridArray = [];
    for (let i = 0; i < numOfCol; i++) {
      pushGridArray(i, 0, -gapY / 2);
    }
    $('.js-card').each(function (i) {
      setPosition($(this));
    });
    var heightArr = getHeightArray(0, gridArray.length);
    container.height(heightArr.max + gapY / 2);
  }
  function membersResize() {
    numOfCol = Math.floor((containerW + gapXMin) / colW)
    gapX = Math.min(gapXMax, ((containerW - ((colW - gapX) * numOfCol)) / (numOfCol - 1)))
    gapY = gapX
    colW = $('.js-card').outerWidth() + gapX;
    containerW = colW * numOfCol - gapX;
    console.log(numOfCol, gapX, colW, containerW)
    container.width(containerW);
  }
  function pushGridArray(x, y, height) {
    var grid = {};
    grid.x = x;
    grid.endY = y + height + gapY;
    gridArray.push(grid);
  }
  function removeGridArray(x) {
    var idx = getGridIndex(x);
    gridArray.splice(idx, 1);
  }
  function getHeightArray(x, size) {
    var heightArray = {};
    var temps = [];
    for (let i = 0; i < size; i++) {
      var idx = getGridIndex(x + i);
      temps.push(gridArray[idx].endY);
    }
    heightArray.min = Math.min.apply(Math, temps);
    heightArray.max = Math.max.apply(Math, temps);
    heightArray.x = temps.indexOf(heightArray.min)
    return heightArray
  }
  function getGridIndex(x) {
    for (let i = 0; i < gridArray.length; i++) {
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
    removeGridArray(pos.x);
    pushGridArray(pos.x, pos.y, grid.outerHeight());
  }
})