// ==========================================================================
// Project:   Ecommerce.Category Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

sc_require('models/category');

Ecommerce.Category.FIXTURES = [
    {
        'guid': 1,
        'name': 'Books',
        'isVisible': YES,
        'products': [1, 2, 3, 7, 8, 9, 10, 11, 12]
    },

    {
        'guid': 2,
        'name': 'Other',
        'isVisible': YES,
        'products': [4, 5]
    },

    {
        'guid': 3,
        'name': 'Hidden',
        'isVisible': NO,
        'products': [6]
    }
];
