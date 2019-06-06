console.log( 'JS loaded' );

// show error on mobile
window.onerror = function( err ) {
  alert( err );
  return true;
}







var superPaint = function() { // IIFE
  var _t = {
  color:'#fff',
  initPens:function() {
    var colors = ['#000','#f00','#0f0','#00f','#ff0','#f0f','#0ff','#ccc','#fc3','#63c'];
    for (let i in colors ) {
      $( '<pen>' )
        .css({background:colors[i]})
        .on('click', _t.activatePen(colors[i]) )
        .appendTo( 'footer' );
    }
  },
  activatePen:function( newColor ) {
    return function() {
      _t.color = newColor;
      $( '.active' ).removeClass( 'active');
      $( this ).addClass( 'active' );
    }
  },
  drawModus: 'line', /*dot|line*/
  dotSize:3,
  drawStart: function(e) {
    var offset = $('#stage').offset();
    _t.oldX = e.touches[0].pageX - offset.left;
    _t.oldY = e.touches[0].pageY - offset.top;
    _t.draw(e);
  },
  draw: function(e) {
    var offset = $('#stage').offset();
    var x = e.touches[0].pageX - offset.left;
    var y = e.touches[0].pageY - offset.top;
    var ctx = superPaint.ctx;
    ctx.fillStyle = ctx.strokeStyle = _t.color;
    ctx.lineWidth = _t.dotSize;
    ctx.beginPath();
    if ( _t.drawModus == 'dot' ) {
      ctx.arc(x,y,_t.dotSize,0,2*Math.PI);
      ctx.fill();
    }
    if ( _t.drawModus == 'line' ) {
      ctx.moveTo(_t.oldX,_t.oldY);
      ctx.lineTo(x,y);
      ctx.stroke();
      _t.oldX = x;
      _t.oldY = y;
    }

  },
  initCanvas:function() {
    _t.ctx = $('#stage').get(0).getContext('2d');
    _t.clearAll();
    $( '#stage' )
      .attr({
        width:$(window).width(),
        height:$(window).height()-80
      })
      .on('touchstart', _t.drawStart )
      .on('touchmove', _t.draw );
  },
  clearAll:function() {
    var ctx = _t.ctx;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,$( '#stage' ).width(),$( '#stage' ).height());
  },
  saveData:function() {
    window.canvas2ImagePlugin.saveImageDataToLibrary(
         function(msg){
            alert( 'Daten sind gespeichert!' );
         },
         function(err){
            alert( 'Fehler beim Speichern.');
         },
         $('#stage').get(0)
    );
  },
  addPhoto2Canvas: function( image ) {
    var bg = new Image();
    bg.src = image;
    // ... add2canvas ?
    bg.onload = function() {
      _t.ctx.drawImage( bg, 0, 0 );

    }
  },
  openCam:function(e) {
    e.preventDefault();
    navigator.camera.getPicture(
      _t.addPhoto2Canvas,
      function() { alert( 'Camera Fehler' ); },
      {
        targetWidth: $('#stage').width(),
        targetHeight: $('#stage').height(),
        correctOrientation: true
      }
    )
  },
  init:function() {
    _t.initPens();
    _t.initCanvas();
    $('#b_foto').on('click',_t.openCam )
    $('#b_clear').on('click',_t.clearAll );
    $('#b_save').on('click',_t.saveData );
  }
}
return _t;
}();

document.addEventListener( 'deviceready', function() {
  console.log( 'Device ready' );
  $( document ).ready( function() {
    console.log( 'DOM ready, alles ready...' );
    superPaint.init();


  });
});
