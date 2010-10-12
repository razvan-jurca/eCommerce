// ==========================================================================
// Project:   Ecommerce.ProductItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

/** @class
  (Document Your View Here)
*/
Ecommerce.ProductItemView = SC.ListItemView.extend(
/** @scope Ecommerce.ProductItemView.prototype */ {
    childViews: 'productImage productName productPrice'.w(),
    classNames: ['product-item'],

    productImage: SC.ImageView.design({
        layout: { top: 2, left: 32, height: 46, width: 46},
        classNames: ['product-item-icon'],
        valueBinding: '.parentView*content.imgUrl'
    }),

    productName: SC.LabelView.design({
        layout: { left: 90, centerY: 0, height: 14, right: 100 },
        className: ['product-item-name'],
        valueBinding: '.parentView*content.name'
    }),

    productPrice: SC.LabelView.design({
        layout: { width: 80, right: 10, centerY: 0, height: 14 },
        className: ['product-item-price'],
        valueBinding: '.parentView*content.formatedPrice',
        textAlign: SC.ALIGN_RIGHT
    }),

    render: function(context, firstTime) {
        if(firstTime)
            this.renderChildViews(context, firstTime);
    }
});
