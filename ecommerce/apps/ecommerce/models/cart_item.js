// ==========================================================================
// Project:   Ecommerce.CartItem
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Ecommerce.CartItem = SC.Record.extend(
/** @scope Ecommerce.CartItem.prototype */ {
    quantity: SC.Record.attr(Number),
    id: '',
    product: SC.Record.toOne('Ecommerce.Product', { inverse: 'cartItem', isMaster: NO }),
    cart: SC.Record.toOne('Ecommerce.Cart', { inverse: 'items', isMaster: NO }),

    formatedQuantity: function() {
        return '%@'.fmt(this.get('quantity'));
    }.property('quantity'),

    totalPrice: 0,

    totalPriceObserver: function() {
        var product = this.get('product');
        if (product)
            this.set('totalPrice', this.get('quantity') * product.get('price'));
        else
            this.set('totalPrice', 0);
    }.observes('*product.price', 'quantity'),

    formatedTotalPrice: function() {
        return '%@ $'.fmt(this.get('totalPrice'));
    }.property('totalPrice')
}) ;
