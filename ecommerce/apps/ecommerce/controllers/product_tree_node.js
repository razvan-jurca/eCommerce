// ==========================================================================
// Project:   Ecommerce.productTreeNodeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class

  @extends SC.ObjectController
*/
Ecommerce.productTreeNodeController = SC.ObjectController.create(
/** @scope Ecommerce.productTreeNodeController.prototype */ {
    contentBinding: SC.Binding.single('Ecommerce.productTreeController.selection'),

    /**
      The current available stock considering
      the ammount of the product that is already
      in the cart.
      */
    currentStock: 0,
    currentStockObserver:function() {
        var cartItem = this.get('cartItem');
        var stock = this.get('stock');
        if (cartItem)
            stock = stock - cartItem.get('quantity');
        this.set('currentStock', stock);
    }.observes('stock', '*cartItem.quantity'),

    inStock: function() {
        return this.get('currentStock') > 0;
    }.property('currentStock'),

    stockSummary: function() {
        if (this.get('inStock') == NO)
            return 'Out of stock';
        return 'Stock: %@'.fmt(this.get('currentStock'));
    }.property('currentStock')
}) ;

