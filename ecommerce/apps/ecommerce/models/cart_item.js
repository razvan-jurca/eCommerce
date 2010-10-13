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
    //TODO [RJ]: Daca tot folosesti guid, poti sa stergi asta, incarca memoria degeaba.
    //la addInverseRecord pe cart foloseste id-ul in framework ... si nu merge bine daca nu ii pun campu asta
    id: '',
    //TODO [RJ]: Al doilea parametru pentru toOne e optional, just so you know.
    product: SC.Record.toOne('Ecommerce.Product', { inverse: 'cartItem', isMaster: NO }),
    cart: SC.Record.toOne('Ecommerce.Cart', { inverse: 'items', isMaster: NO }),

    formatedQuantity: function() {
        return this.get('quantity');
    }.property('quantity').cacheable(),

    totalPrice: function() {
        var product = this.get('product');
        if (product) {
            return this.get('quantity') * product.get('price');
        } else {
            return 0;
        }
    }.property('*product.price', 'quantity').cacheable(),

    formatedTotalPrice: function() {
        return '%@ $'.fmt(this.get('totalPrice'));
    }.property('totalPrice').cacheable()
}) ;
