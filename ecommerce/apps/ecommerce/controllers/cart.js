// ==========================================================================
// Project:   Ecommerce.cartController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Ecommerce.cartController = SC.ObjectController.create(
/** @scope Ecommerce.cartController.prototype */ {
    summary: 'You have 0 items in your cart.',
    /**
      Observes the content of the cart and
      updates the summary acordingly
      */
    itemsObserver: function() {
        var cnt = 0;
        var content = this.get('content');
        var items;
        if (content) {
            items = content.get('items');
            if (items)
                //TODO [RJ]: Avem nevoie de acolade chiar si in jurul unei singure linii in if. Motivul e faptul ca se compacteaza codul cand
                //se face deploymentul pe servere.
                cnt = items.reduce(function(prevVal, item, idx, e) { return prevVal + item.get('quantity'); }, 0);
        }

        this.set('summary', 
                    (cnt == 1? 
                        'You have %@ item in your cart.'
                        : 'You have %@ items in your cart.').fmt(cnt) 
                    + (items && items.get('length') ?
                            ' With a total price of %@ $.'.fmt(Ecommerce.cartItemsArrayController.get('totalPrice')) 
                            : ''));
    //TODO [RJ]: Chestia asta e super ineficienta pentru ca observi multe proprietati, faci chained observing si observi
    //proprietati care nu sunt pe this. In plus, ai putea sa transformi metoda asta intr-un computed property, sau sa faci
    //summary un computed property care sa depinde de chestiile astea si sa fie cacheable, pentru a reduce numarul de executii.
    //Inca o chestie: Controllerele si contentul lor pot fi folosite interschimbabil. poti deci sa faci ceva de genul
    //.property('items', '*items.length', 'Ecommerce*cartItemsArrayController.totalPrice')
    //cred ca observerul pe *items.length e redundant si la fel mi se pare controllerul cartItemsArrayController. Scoate-l.
    }.observes('*content.items', '.content*items.length', 'Ecommerce*cartItemsArrayController.totalPrice'),

    /**
      Removes and item from the cart
      updates the links that point to it
      and destroys the item
      */
    destroy: function(item) {
        item.set('product', null);
        this.get('items').removeInverseRecord(item);
        item.destroy();
    },

    /**
      Delete everything that is in the cart
      */
    clearCart: function() {
        var items = this.get('items');
        while(items.length())
            this.destroy(items.objectAt(0));
    },

    /**
      Delete the currently selected items
      */
    removeSelected: function() {
        var items = Ecommerce.cartItemsArrayController.get('selectionArray');
        for(var i = 0; i < items.length; ++ i) 
            this.destroy(items[i]);
    }
}) ;
