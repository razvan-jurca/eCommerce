// ==========================================================================
// Project:   Ecommerce.Product Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Ecommerce */

sc_require('models/product');

Ecommerce.Product.FIXTURES = [
    {
        'guid': 1,
        'category': 1,
        'name': 'book 1',
        'description': 'book description',
        'stock': 0,
        'price': 20,
        'isVisible': YES,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif'
    },

    {
        'guid': 2,
        'category': 1,
        'name': 'book 2', 
        'description': 'book description',
        'stock': 5, 
        'price': 30.99,
        'isVisible': NO,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif'
    },

    {
        'guid': 3,
        'category': 1,
        'name': 'Alice in Wonderland',
        'description': "                            CHAPTER I<br/>Down the Rabbit-Hole<br/><br/>Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do:  once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, `and what is the use of a book,' thought Alice `without pictures or conversation?' So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.<br/>There was nothing so VERY remarkable in that; nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself, `Oh dear!  Oh dear!  I shall be late!'  (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually TOOK A WATCH OUT OF ITS WAISTCOAT-POCKET, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.<br/>In another moment down went Alice after it, never once considering how in the world she was to get out again.The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.<br/>Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next.  First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs.  She took down a jar from one of the shelves as she passed; it was labelled `ORANGE MARMALADE', but to her great disappointment it was empty:  she did not like to drop the jar for fear of killing somebody, so managed to put it into one of the cupboards as she fell past it. `Well!' thought Alice to herself, `after such a fall as this, I shall think nothing of tumbling down stairs!  How brave they'll all think me at home!  Why, I wouldn't say anything about it, even if I fell off the top of the house!' (Which was very likely true.)",
        'stock': 2, 
        'price': 59.99,
        'isVisible': YES,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif',
    },

    {
        'guid': 4,
        'category': 2,
        'name': 'Nikkor 50mm 1.8 AF-D', 
        'description': 'other 2',
        'stock': 20, 
        'price': 99.99,
        'isVisible': YES,
        'imgUrl': 'http://gibbscamerahouse.com.au/images/nikon_af_nikkor_50mm_f_1_8_d.jpg'
    },

    {
        'guid': 5,
        'category': 2,
        'name': 'Nikon D60', 
        'description': 'other 2',
        'stock': 1, 
        'price': 600,
        'isVisible': YES,
        'imgUrl': 'http://www.kenrockwell.com/nikon/d60/images/d60-600.jpg'
    },

    {
        'guid': 6,
        'category': 3,
        'name': 'hidden 1', 
        'description': 'hidden item',
        'stock': 200, 
        'price': 5000,
        'isVisible': YES,
        'imgUrl': ''
    },

    {
        'guid': 7,
        'category': 1,
        'name': 'book 3',
        'description': '...',
        'stock': 20,
        'price': 20,
        'isVisible': YES,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif'
    },

    {   
        'guid': 8,
        'category': 1,
        'name': 'book 4',
        'description': '...',
        'stock': 20, 
        'price': 20, 
        'isVisible': YES,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif'
    },

    {   
        'guid': 9,
        'category': 1,
        'name': 'book 5',
        'description': '...',
        'stock': 20, 
        'price': 20, 
        'isVisible': YES,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif'
    },

    {   
        'guid': 10,
        'category': 1,
        'name': 'book 6',
        'description': '...',
        'stock': 20, 
        'price': 20, 
        'isVisible': YES,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif'
    },

    {   
        'guid': 11,
        'category': 1,
        'name': 'book 7',
        'description': '...',
        'stock': 20, 
        'price': 20, 
        'isVisible': YES,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif'
    },

    {   
        'guid': 12,
        'category': 1,
        'name': 'book 8',
        'description': '...',
        'stock': 20, 
        'price': 20, 
        'isVisible': YES,
        'imgUrl': 'http://www.mclibrary.duke.edu/about/news/books1.gif'
    }
];
