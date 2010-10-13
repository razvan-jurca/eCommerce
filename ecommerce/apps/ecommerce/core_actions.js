sc_require('core');

Ecommerce.mixin({
    /**
    Populates the product tree view with the categories
    */
    populateProductTreeController: function() {
       var rootNode = SC.Object.create({
            treeItemIsExpanded: YES,
            name: 'root',
            treeItemChildren: function(){
                var categoryQuery = SC.Query.local(Ecommerce.Category, 'isVisible=YES', { orderBy: 'name' }); 
                var categories = Ecommerce.store.find(categoryQuery);
                return categories;
            }.property(),
            //TODO [RJ]: sau mai bine itemView: SC.ListItemView
            //TODO [RJ]: Atentie la virgulele in plus!
            itemView: function(){ return SC.ListItemView; }.property(),
        }); 
        Ecommerce.productTreeController.set('content', rootNode);
    },

    /**
    Shows the product detail pane
    */
    showProductDetails: function() {
      //TODO [RJ]: Nu uita sa pui ;
        var selection = Ecommerce.productTreeNodeController.get('content')
        if (selection && selection.kindOf(Ecommerce.Product))
            pane = Ecommerce.mainPage.getPath('productDetailPane').append();
    },

    /**
    Add the current item to the cart (with the quantity specified in the quanity input field)
    */
    addItemToCart: function() {
        var cart = Ecommerce.cartController.get('content');
        // If the cart doesn't exist create it
        if (! cart)
        {
            cart = Ecommerce.store.createRecord(Ecommerce.Cart, { guid: 1, items: [] });
            Ecommerce.cartController.set('content', cart);
        }

        var product = Ecommerce.productTreeNodeController.get('content');
        if (product && product.kindOf(Ecommerce.Product)) {
            //TODO [RJ]: getPath(a.b).get(c).get(d) === getPath(a.b.c.d). Si e mai eficient :)
            var quantity = parseInt(Ecommerce.mainPage.getPath('productDetailPane').get('contentView').get('quantityInput').get('value'));
            var stock = Ecommerce.productTreeNodeController.get('currentStock');
            if (quantity > 0 && stock >= quantity) {
                // Check if there is a corresponding cart item for the
                // current product. If it does exist we will update the
                // quantit of this product instead of adding another
                var cartItem = product.get('cartItem');
                if (cartItem)
                //TODO [RJ]: Acolade peste tot, sa nu crape buildul.
                    quantity += cartItem.get('quantity');
                else {
                    cartItem = Ecommerce.store.createRecord(Ecommerce.CartItem, { quantity: 0 });
                    //TODO [RJ]: var, ca sa nu lasi variabile globale
                    guid = SC.generateGuid(cartItem);
                    cartItem.set('guid', guid);
                    cartItem.set('id', guid);
                    product.set('cartItem', cartItem);
                    cart.get('items').addInverseRecord(cartItem);
                }
                
                cartItem.set('quantity', quantity);
                this.invokeLast(function () {
                        Ecommerce.cartItemsArrayController.totalPriceObserver();
                        Ecommerce.cartController.itemsObserver();
                    });
                Ecommerce.mainPage.getPath('productDetailPane').remove();
            }   
            else {
            }
        }
        //TODO [RJ]: Atentie la virgulele in plus!
    },
});

