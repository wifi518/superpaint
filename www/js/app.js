console.log( 'JS loaded' );
document.addEventListener( 'deviceready', function() {
  console.log( 'Device ready' );
  $( document ).ready( function() {
    console.log( 'DOM ready, alles ready...' );
    navigator.geolocation.getCurrentPosition( function( coords ) {
        $('<div>').html(coords.coords.latitude + '/' + coords.coords.longitude).appendTo( 'body' );
    },function() {
        $('<div>').html('Error no position').appendTo( 'body');
    })

  });
});
