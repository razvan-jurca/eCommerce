// ==========================================================================
// Project:   Ecommerce.cartItemsArrayController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class
  Handles the items that are in the cart
  @extends SC.ArrayController
*/

Ecommerce.cartItemsArrayController = SC.ArrayController.create(
/** @scope Ecommerce.cartItemsArrayController.prototype */ {
    contentBinding: 'Ecommerce.cartController.content.items',

    hasItems: function() {
        return this.get('length') > 0;
    }.property('length').cacheable(),

    selectionArray: function() {
        return this.get('selection').map(function(item, index, enumerable) { return item; }, this);
    }.property('selection')
}) ;
