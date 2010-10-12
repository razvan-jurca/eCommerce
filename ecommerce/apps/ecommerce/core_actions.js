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
            itemView: function(){ return SC.ListItemView; }.property(),
        }); 
        Ecommerce.productTreeController.set('content', rootNode);
    },

    /**
    Shows the product detail pane
    */
    showProductDetails: function() {
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
            var quantity = parseInt(Ecommerce.mainPage.getPath('productDetailPane').get('contentView').get('quantityInput').get('value'));
            var stock = Ecommerce.productTreeNodeController.get('currentStock');
            if (quantity > 0 && stock >= quantity) {
                // Check if there is a corresponding cart item for the
                // current product. If it does exist we will update the
                // quantit of this product instead of adding another
                var cartItem = product.get('cartItem');
                if (cartItem)
                    quantity += cartItem.get('quantity');
                else {
                    cartItem = Ecommerce.store.createRecord(Ecommerce.CartItem, { quantity: 0 });
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
                this.hideProductDetails();
            }   
            else {
            }
        }
    },
});

