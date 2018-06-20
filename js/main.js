$(document).ready(function() {

  setupControls();

});

function setupControls()
{
  //Grid color
  $("#grid-color").val( configuration.getValue("gridColor") );
  $("#grid-color").change(function() {

    configuration.setValue("gridStroke",  $(this).val()  )
  });
  //Number of squares
  $("#nSquares").val( configuration.getValue("tabletopSquares") );
  $("#nSquares").change(function() {
    configuration.setValue("tabletopSquares",  $(this).val()  )
  });
}
