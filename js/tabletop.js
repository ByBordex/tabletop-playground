var configuration;
var grid;

class Configuration {
  constructor() {
    this.settings = new Map();
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  setValue(name, value) {
    this.settings.set(name, value);
    this.notify();
  }

  getValue(setting) {
    return this.settings.get(setting);
  }

  notify() {
    this.observers.forEach(function(obs) {
      obs.update();
    });
  }

}


class Square {
  constructor() {

  }

  setTile(tile) {
    this.tile = tile;
  }

  setToken(token) {
    this.token = token;
  }

  draw(context, x, y, size) {
    context.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
    context.stroke();
  }
}

class Grid {

  constructor(canvas) {
    this.canvas = canvas;
    this.drawAreaWidth = canvas.width;

    this.squares = [];
    for (var i = 0; i < configuration.getValue("tabletopSquares") ** 2; i++) {
      this.squares.push(new Square());
    }
  }

  update() {
    this.draw();
  }

  clearGrid() {
    this.canvas.width = this.canvas.width;
  }

  draw() {
    var context = canvas.getContext("2d");
    this.clearGrid();

    // Padding
    var p = 5;

    var bw = this.drawAreaWidth - 2 * p;
    var bh = this.drawAreaWidth - 2 * p;

    // SquareWidth
    var sw = bw / configuration.getValue("tabletopSquares");
    //Draw horizontal and vertical lines.
    context.beginPath();
    context.strokeStyle = configuration.getValue("gridStroke");
    for (var x = 0; x <= bw; x += sw) {
      context.moveTo(0.5 + x + p, p);
      context.lineTo(0.5 + x + p, bh + p);
    }
    for (var x = 0; x <= bh; x += sw) {
      context.moveTo(p, 0.5 + x + p);
      context.lineTo(bw + p, 0.5 + x + p);
    }

    context.closePath();
    context.stroke();
    //Draw squares content.
    var row = 0,
      column = 0;
    context.strokeStyle = configuration.getValue("squareStroke");

    this.squares.forEach(function(square, i) {
      context.beginPath();

      //If element dividend of number of squares(columns) we change row.
      if (i != 0 && i % configuration.getValue("tabletopSquares") == 0) {
        row++;
        column = 0;
      }
      square.draw(context, column * sw + p, row * sw + p, sw);
      column++;
    });
  }

  getSquare(x, y) {
    //TODO
  }

}

function resizeTabletop(width) {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  drawGrid(configuration.getValue("tabletopSquares"));
}


$("#canvas").ready(function() {
  var canvas = document.getElementById("canvas");
  canvas.height = canvas.width;
  configuration = new Configuration();
  configuration.setValue("tabletopSquares", 20);
  configuration.setValue("gridStroke", "black");
  configuration.setValue("squareStroke", "Tomato");

  grid = new Grid(canvas)
  configuration.addObserver(grid);
  grid.draw();


});
