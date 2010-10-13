// ==========================================================================
// Project:   Ecommerce.cartItemsArrayController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class
  Handles the items that are in the cart
  @extends SC.ArrayController
*/

//TODO [RJ]: Oricum accesezi chestiile astea de pe CartController asa ca eu zic sa muti totul acolo.
Ecommerce.cartItemsArrayController = SC.ArrayController.create(
/** @scope Ecommerce.cartItemsArrayController.prototype */ {
    contentBinding: 'Ecommerce.cartController.content.items',

    hasItems: function() {
        return this.get('length') > 0;
    }.property('length'),

    selectionArray: function() {
        return this.get('selection').map(function(item, index, enumerable) { return item; }, this);
    }.property('selection'),

    totalPrice: 0,
    formatedTotalPrice: function() { 
        return '%@ $'.fmt(this.get('totalPrice')); 
    }.property('totalPrice'),
    /**
      Observers changes to the contents of the array to update the
      total price of the items
      */
    totalPriceObserver: function() {
        if (this.get('content')) {
            //TODO [RJ]: pune var in fata variabilelor locale, ca sa previi memory leaks. Altfel, garbage collectorul nu va veni
            //dupa variabila asta niciodata, pentru ca devine globala.
            price = this.get('content').reduce(function(prev, item, idx, e) { return prev + item.get('totalPrice'); }, 0);
            price = Math.round(price * 100) / 100.0;
            this.set('totalPrice', price);
        }
    }.observes('content', '*content.length')
}) ;
