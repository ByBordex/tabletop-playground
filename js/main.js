$(document).ready(function() {
  setupControls();
});

function setupControls() {
  //Grid color
  $("#grid-color").val(configuration.getValue("gridColor"));
  $("#grid-color").change(function() {

    configuration.setValue("gridStroke", $(this).val())
  });
  //Number of x squares
  $("#wSquares").val(configuration.getValue("tabletop_w_squares"));
  $("#wSquares").change(function() {
    configuration.setValue("tabletop_w_squares", $(this).val())
  });

  //Number of y squares
  $("#hSquares").val(configuration.getValue("tabletop_h_squares"));
  $("#hSquares").change(function() {
    configuration.setValue("tabletop_h_squares", $(this).val())
  });

  //Zoom control
  $("#square-side").val(configuration.getValue("tabletop_sw"));
  var max = configuration.getValue( "tabletop_width" );
  //Divide by the maximum of squares between height and width
  max /= configuration.getValue("tabletop_h_squares") > configuration.getValue("tabletop_w_squares")?configuration.getValue("tabletop_h_squares"): configuration.getValue("tabletop_width_squares");
  $("#square-side").prop('max', max);
  $("#square-side").change(function() {
    configuration.setValue("tabletop_sw", $(this).val())
  });

}
