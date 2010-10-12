// ==========================================================================
// Project:   Ecommerce
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//

Ecommerce.main = function main() {
  Ecommerce.getPath('mainPage.mainPane').append() ;
  Ecommerce.populateProductTreeController();
} ;

function main() { Ecommerce.main(); }
