// place cards
$(() => {
  container = $('.js-members');
  placeCard();
  // $(window).on('load', () => {
  //   container = $('.js-members');
  //   placeCard();
  // })
  $(window).on('resize', () => {
    console.log('resized')
    container.css('width', "")
    placeCard();
  })  

  let gridArray,
    colW,
    gapXMin = 30,
    gapXMax = 60,
    gapX = gapXMin,
    gapY = 30,
    numOfCol,
    container,
    containerW;

  function placeCard() {
    containerW = container.width();
    colW = $('.js-card').outerWidth() + gapXMin;
    membersResize();
    applyGrid();
  }

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