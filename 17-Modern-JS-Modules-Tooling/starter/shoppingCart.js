console.log('Exporting module');

const shippingCost = 10;
export const cart = [];

// export function addToCart(product, quantity) {
//   cart.push({ product, quantity }),
//     console.log(`${quantity} ${product} was added to the cart`);
// }

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function addToCart(product, quantity) {
  cart.push({ product, quantity }),
    console.log(`${quantity} ${product} was added to the cart`);
}
