var configuration;
var grid;



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
    this.squares = [];
    this.createSquares();
  }

  createSquares() {
    this.squares = [];
    for (var i = 0; i < configuration.getValue("tabletop_w_squares") * configuration.getValue("tabletop_h_squares"); i++) {
      this.squares.push(new Square());
    }
  }

  update() {
    this.createSquares();
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

    var bw = configuration.getValue("tabletop_width") - 2 * p;
    var bh = configuration.getValue("tabletop_width") - 2 * p;

    //Square side
    var sw = configuration.getValue("tabletop_sw")

    //Draw horizontal and vertical lines.
    context.beginPath();
    context.strokeStyle = configuration.getValue("gridStroke");
      //Draw columns
    for (var x = 0; x <= configuration.getValue("tabletop_w_squares"); x++) {
      context.moveTo(0.5 + x * sw + p, p);
      context.lineTo(0.5 + x * sw + p, configuration.getValue("tabletop_h_squares") * sw + p);
    }
      //Draw rows
    for (var x = 0; x <= configuration.getValue("tabletop_h_squares"); x++) {
      context.moveTo(p, 0.5 + x*sw + p);
      context.lineTo(configuration.getValue("tabletop_w_squares") * sw + p, 0.5 + x*sw + p);
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
      if (i != 0 && i % configuration.getValue("tabletop_w_squares") == 0) {
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

}


$("#canvas").ready(function() {
  var canvas = document.getElementById("canvas");
  canvas.height = configuration.getValue("tabletop_width");
  canvas.width = configuration.getValue("tabletop_width");

  grid = new Grid(canvas)
  configuration.addObserver(grid);
  grid.draw();
});
