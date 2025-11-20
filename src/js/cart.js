import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

// Initialize and render the cart
const cart = new ShoppingCart(".product-list");
cart.render();
