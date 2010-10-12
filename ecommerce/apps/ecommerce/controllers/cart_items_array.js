// ==========================================================================
// Project:   Ecommerce.cartItemsArrayController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Ecommerce.cartItemsArrayController = SC.ArrayController.create(
/** @scope Ecommerce.cartItemsArrayController.prototype */ {
    contentBinding: 'Ecommerce.cartController.content.items',

    hasItems: function() { return this.get('length') > 0; }.property('length'),

    selectionArray: function() {
        return this.get('selection').map(function(item, index, enumerable) { return item; }, this);
    }.property('selection'),

    totalPrice: 0,

    formatedTotalPrice: function() { return '%@ $'.fmt(this.get('totalPrice')); }.property('totalPrice'),

    totalPriceObserver: function() {
        if (this.get('content')) {
            price = this.get('content').reduce(function(prev, item, idx, e) { return prev + item.get('totalPrice'); }, 0);
            price = Math.round(price * 100) / 100.0;
            this.set('totalPrice', price);
        }
    }.observes('content', '*content.length')
}) ;
