/* global _, jsVars, jQuery */
// Use https://lodash.com/docs/4.17.15 from validation in js

( function( $ ) {
  $( () => {
    const example = () => {
      if ( ! _.isEmpty( jsVars ) ) {
        $( 'body' ).on( 'click', 'a', () => {
          console.log( jsVars );
        });
      }
    };
    example();
  });
}( jQuery ) );
