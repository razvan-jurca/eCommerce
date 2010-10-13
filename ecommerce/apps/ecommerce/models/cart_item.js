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
    id: '',
    //TODO [RJ]: Al doilea parametru pentru toOne e optional, just so you know.
    product: SC.Record.toOne('Ecommerce.Product', { inverse: 'cartItem', isMaster: NO }),
    cart: SC.Record.toOne('Ecommerce.Cart', { inverse: 'items', isMaster: NO }),

    formatedQuantity: function() {
      //TODO [RJ]: Puteai la fel de bine sa scrii return this.get('quantity'), fmt nu va face nimic in plus in cazul asta.
        return '%@'.fmt(this.get('quantity'));
    }.property('quantity'),

    //TODO [RJ]: Puteai sa faci un computed property aici si sa renunti la observer.
    totalPrice: 0,

    totalPriceObserver: function() {
        var product = this.get('product');
        if (product)
        //TODO [RJ]: Acolade
            this.set('totalPrice', this.get('quantity') * product.get('price'));
        else
        //TODO [RJ]: Acolade
            this.set('totalPrice', 0);
    }.observes('*product.price', 'quantity'),

    formatedTotalPrice: function() {
        return '%@ $'.fmt(this.get('totalPrice'));
    }.property('totalPrice')
}) ;
