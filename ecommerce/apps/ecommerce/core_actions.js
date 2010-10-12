sc_require('core');

Ecommerce.mixin({
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

    showProductDetails: function() {
        var selection = Ecommerce.productTreeNodeController.get('content')
        if (selection && selection.kindOf(Ecommerce.Product)) {
            var pane = Ecommerce.mainPage.getPath('productDetailPane');
            pane.append();
            pane.reset();
        }
    },

    hideProductDetails: function() {
        Ecommerce.mainPage.getPath('productDetailPane').remove();
    },

    addItemToCart: function() {
        var cart = Ecommerce.cartController.get('content');
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

    showCartContentPane: function() {
        Ecommerce.mainPage.getPath('cartContentPane').append();
    },

    hideCartContentPane: function() {
        Ecommerce.mainPage.getPath('cartContentPane').remove();
    }
});

