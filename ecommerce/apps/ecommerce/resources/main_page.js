// ==========================================================================
// Project:   Ecommerce - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

// This page describes the main user interface for your application.  
Ecommerce.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'itemBar productsView'.w(),

    itemBar: SC.ToolbarView.design({
        layout: { left: 0, right: 0, top: 0, height: 40 },
        anchorLocation: SC.ANCHOR_TOP,
        childViews: 'logo cartSummary viewCartButton'.w(),

        logo: SC.LabelView.design({
            layout: { centerY: 0, left: 12, width: 120, height: 24 },
            classNames: ['site-logo'],
            textAlign: SC.ALIGN_LEFT,
            fontWeight: SC.BOLD_WEIGHT,
            controlSize: SC.LARGE_CONTROL_SIZE,
            value: 'e-Commerce'
        }),

        cartSummary: SC.LabelView.design({
            layout: { centerY: 0, left: 150, right: 150, height: 18  },
            classNames: ['cart-summary'],
            textAlign: SC.ALIGN_CENTER,
            valueBinding: 'Ecommerce.cartController.summary'
        }),

        viewCartButton: SC.ButtonView.design({
            classNames: ['view-cart-button'],
            layout: { centerY: 0, right: 12, width: 90, height: 24 },
            title: 'View cart',

            target: 'Ecommerce',
            action: 'showCartContentPane'
        })
    }),

    productsView: SC.ScrollView.design({
        layout: { top: 40, left: 0, right: 0, bottom: 0 },
        
        contentView: SC.ListView.design({
            layout: { left: 0, right: 0, bottom: 0, top: 0 },
            contentValueKey: 'name',
            contentBinding: 'Ecommerce.productTreeController.arrangedObjects',
            selectionBinding: 'Ecommerce.productTreeController.selection',
            exampleView: Ecommerce.ProductItemView,
            target: 'Ecommerce',
            action: 'showProductDetails',

            /*
            customRowHeightIndexes: function() {
                return SC.IndexSet.create(0, this.get('length'));
            }.property('length'),

            contentIndexRowHeight: function(view, content, index) {
                var item;
                if(content)
                    item = content.objectAt(index);
                if(item && item.kindOf(Ecommerce.Product))
                    return 50;
                return 18;
            },*/

            rowHeight: 50
        })
    })
  }),

  productDetailPane: SC.PanelPane.design({
    layout: { left: 40, right: 40, top: 80, bottom: 40 },
    classNames: ['product-detail-pane'],

    contentView: SC.View.design({
        childViews: 'closeButton productName productImage productDescription stockSummary quantityLabel quantityInput submitButton'.w(),

        closeButton: SC.ButtonView.design({
            layout: { right: 10, top: 10, width: 100, height: 24 },
            title: 'Close',
            target: 'Ecommerce',
            action: 'hideProductDetails'
        }),

        productName: SC.LabelView.design({
            layout: { left: 10, right: 120, top: 10, height: 24 },
            classNames: ['product-detail-name'],
            textAlign: SC.ALIGN_CENTER,
            fontWeight: SC.BOLD_WEIGHT,
            controlSize: SC.LARGE_CONTROL_SIZE,

            valueBinding: 'Ecommerce.productTreeNodeController.name' 
        }),

        productImage: SC.ImageView.design({
            classNames: ['product-detail-image'],
            layout: { left: 10, top: 40, width: 250, height: 250 },
            valueBinding: 'Ecommerce.productTreeNodeController.imgUrl'
        }),

        productDescription: SC.TextFieldView.design({
            layout: { left: 275, top: 40, bottom: 36, right: 10 },
            hasHorizontalScroller: NO,
            classNames: ['product-detail-description'],
            valueBinding: 'Ecommerce.productTreeNodeController.description',

            isTextArea: YES,

            render: function(context, firstTime) {
                sc_super();
                var elem = context.element();
                if (elem)
                    this.invokeLast(function() {
                            var textareas = elem.getElementsByTagName('textarea');
                            if (textareas && textareas.length)
                                textareas[0].setAttribute('readonly', 'true');
                        });
            }
        }),

        stockSummary: SC.LabelView.design({
            layout: { left: 10, width: 100, bottom: 6, height: 16 },
            classNames: ['stock-summary'],
            fontWeight: SC.BOLD_WEIGHT,
            valueBinding: 'Ecommerce.productTreeNodeController.stockSummary',
        }),

        quantityLabel: SC.LabelView.design({
            layout: { right: 135, width: 60, height: 16, bottom: 12},
            textAlign: SC.ALIGN_RIGHT,
            value: 'Quantity:'
        }),

        quantityInput: SC.TextFieldView.design({
            layout: { right: 100, height: 24, width: 30, bottom: 6 },
            validator: SC.Validator.Number.create({ places: 0 }),
            value: 0,
        }),

        submitButton: SC.ButtonView.design({
            layout: { right: 10, bottom: 6, height: 24, width: 80 },
            title: 'Add to cart',
            isEnabledBinding: 'Ecommerce.productTreeNodeController.inStock',

            target: 'Ecommerce',
            action: 'addItemToCart'
       }),
    }),

    reset: function() {
        var content = this.get('contentView');
        content.get('quantityInput').set('value', 0);
    }
  }),

  cartContentPane: SC.PanelPane.design({
    layout: { top: 80, bottom: 40, left: 40, right: 40 },
    classNames: ['panel-design'],

    contentView: SC.View.design({
        childViews: 'title closeButton captions totalPriceFooter itemList removeSelectedButton clearButton'.w(),
        classNames: ['panel-design'],

        title: SC.LabelView.design({
            layout: { left: 20, top: 10, right: 120, height: 24 },
            classNames: ['cart-title'],
            value: 'Cart',
            controlSize: SC.LARGE_CONTROL_SIZE,
            fontWeight: SC.BOLD_WEIGHT
        }),

        closeButton: SC.ButtonView.design({
            layout: { right: 10, top: 10, width: 100, height: 24 },
            title: 'Close',
            target: 'Ecommerce',
            action: 'hideCartContentPane'        
        }),

        captions: SC.View.design({
            layout: { left: 10, right: 10, top: 39, height: 19 },
            backgroundColor: '#ccc',
            classNames: ['cart-caption'],
            childViews: 'nameCaption priceCaption quantityCaption totalPriceCaption'.w(),

            nameCaption: SC.LabelView.design({
                layout: { left: 60, top: 0, right: 310, height: 19 },
                classNames: ['cart-list-caption'],
                value: 'Product'
            }),

            priceCaption: SC.LabelView.design({
                layout: { right: 220, top: 0, width: 90, height: 19 },
                classNames: ['cart-list-caption'],
                value: 'Price/Item',
                textAlign: SC.ALIGN_CENTER
            }),
    
            quantityCaption: SC.LabelView.design({
                layout: { right: 130, top: 0, width: 90, height: 19 },
                classNames: ['cart-list-caption'],
                value: 'Quantity',
                textAlign: SC.ALIGN_CENTER
            }),

            totalPriceCaption: SC.LabelView.design({
                layout: { right: 40, top: 0, width: 90, height: 19 },
                classNames: ['cart-list-caption'],
                value: 'Total price ',
                textAlign: SC.ALIGN_CENTER
            })
        }),

        itemList: SC.ScrollView.design({
            layout: { right: 10, left: 10, top: 59, bottom: 60 },

            contentView: SC.ListView.design({
                contentBinding: 'Ecommerce.cartItemsArrayController.arrangedObjects',
                selectionBinding: 'Ecommerce.cartItemsArrayController.selection',

                rowHeight: 50,
                exampleView: Ecommerce.CartItemView
            })
        }),

        totalPriceFooter: SC.View.design({
            layout: { left: 10, right: 10, height: 19, bottom: 40 },
            childViews: 'totalPrice'.w(),
            backgroundColor: '#ccc',
            classNames: ['cart-footer'],

            totalPrice: SC.LabelView.design({
                layout: { right: 40, top: 1, width: 90, height: 18 },
                valueBinding: 'Ecommerce.cartItemsArrayController.formatedTotalPrice',
                textAlign: SC.ALIGN_RIGHT
            })
        }),

        removeSelectedButton: SC.ButtonView.design({
            layout: { right: 120, bottom: 10, width: 150, height: 24 },
            title: 'Remove selected',
            target: 'Ecommerce.cartController',
            action: 'removeSelected',
            isEnabledBinding: 'Ecommerce.cartItemsArrayController.hasSelection'
        }),

        clearButton: SC.ButtonView.design({
            layout: { right: 10, bottom: 10, width: 100, height: 24 },
            title: 'Clear cart',
            target: 'Ecommerce.cartController',
            action: 'clearCart',
            isEnabledBinding: 'Ecommerce.cartItemsArrayController.hasItems'
        })
    })
  })
});
