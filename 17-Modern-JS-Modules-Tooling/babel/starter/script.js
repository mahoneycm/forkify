// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);

console.log('Importing module');
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('Bread', 5);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 2);

console.log(cart);
