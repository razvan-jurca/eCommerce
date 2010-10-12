// ==========================================================================
// Project:   Ecommerce.Cart
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Ecommerce.Cart = SC.Record.extend(
/** @scope Ecommerce.Cart.prototype */ {
    items: SC.Record.toMany('Ecommerce.CartItem', { inverse: 'cart', isMaster: YES })
}) ;
