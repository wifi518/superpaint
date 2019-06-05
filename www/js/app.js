console.log( 'JS loaded' );
var superPaint = {
  color:'#fff',
  initPens:function() {
    var colors = ['#000','#f00','#0f0','#00f','#ff0','#f0f','#0ff','#ccc','#fc3','#63c'];
    for (let i in colors ) {
      $( '<pen>' )
        .css({background:colors[i]})
        .on('click', this.activatePen(colors[i]) )
        .appendTo( 'footer' );
    }
  },
  activatePen:function( newColor ) {
    return function() {
      superPaint.color = newColor;
      $( '.active' ).removeClass( 'active');
      $( this ).addClass( 'active' );
    }
  },
  drawModus: 'line', /*dot|line*/
  dotSize:3,
  drawStart: function(e) {
    var offset = $('#stage').offset();
    superPaint.oldX = e.touches[0].pageX - offset.left;
    superPaint.oldY = e.touches[0].pageY - offset.top;
    superPaint.draw(e);
  },
  draw: function(e) {
    var offset = $('#stage').offset();
    var x = e.touches[0].pageX - offset.left;
    var y = e.touches[0].pageY - offset.top;
    var ctx = superPaint.ctx;
    ctx.fillStyle = ctx.strokeStyle = superPaint.color;
    ctx.lineWidth = superPaint.dotSize;
    ctx.beginPath();
    if ( superPaint.drawModus == 'dot' ) {
      ctx.arc(x,y,superPaint.dotSize,0,2*Math.PI);
      ctx.fill();
    }
    if ( superPaint.drawModus == 'line' ) {
      ctx.moveTo(superPaint.oldX,superPaint.oldY);
      ctx.lineTo(x,y);
      ctx.stroke();
      superPaint.oldX = x;
      superPaint.oldY = y;
    }

  },
  initCanvas:function() {
    this.ctx = $('#stage').get(0).getContext('2d');
    $( '#stage' )
      .attr({
        width:$(window).width(),
        height:$(window).height()-80
      })
      .on('touchstart', this.drawStart )
      .on('touchmove', this.draw );
  },
  clearAll:function() {
    var ctx = superPaint.ctx;
    ctx.clearRect(0,0,$( '#stage' ).width(),$( '#stage' ).height());
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
  init:function() {
    this.initPens();
    this.initCanvas();
    $('#b_clear').on('click',this.clearAll );
    $('#b_save').on('click',this.saveData );
  }
}


document.addEventListener( 'deviceready', function() {
  console.log( 'Device ready' );
  $( document ).ready( function() {
    console.log( 'DOM ready, alles ready...' );
    superPaint.init();


  });
});
