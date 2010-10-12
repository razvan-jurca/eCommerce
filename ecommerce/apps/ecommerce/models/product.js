// ==========================================================================
// Project:   Ecommerce.Product
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Ecommerce.Product = SC.Record.extend(
/** @scope Ecommerce.Product.prototype */ {
    name: SC.Record.attr(String),
    description: SC.Record.attr(String),
    price: SC.Record.attr(Number),
    stock: SC.Record.attr(Number),
    isVisible: SC.Record.attr(Boolean),
    imgUrl: SC.Record.attr(String),
    category: SC.Record.toOne('Ecommerce.Category', { inverse: 'products', isMaster: NO }),
    cartItem: SC.Record.toOne('Ecommerce.CartItem', { inverse: 'product', isMaster: YES }),

    formatedPrice: function() {
        return '%@ $'.fmt(this.get('price'));
    }.property('price'),

    treeItemIsExpanded: NO,
    treeItemChildren: function() { return null; }.property(),

    itemView: function() { return Ecommerce.ProductItemView; }.property()
});

