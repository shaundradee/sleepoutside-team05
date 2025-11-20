import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
// adding aria-label and role to remove icon for accessibility to the html span element
    return `
    <li class="cart-card divider">
        <span class="remove-icon" data-id="${item.Id}" aria-label="Remove item from cart" role="button" tabindex="0">&times;</span>
        <a href="#" class="cart-card__image"> 
            <img src="${item.Image}" alt="${item.Name}" /> 
        </a> 
        <a href="#"> 
            <h2>${item.Brand.Name}</h2> 
        </a>
        <h3>${item.NameWithoutBrand}</h3> 
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p>Price: $${item.FinalPrice.toFixed(2)}</p>
        <div class="quantity-controls"> 
            <button class="decrement" data-id="${item.Id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increment" data-id="${item.Id}">+</button> 
        </div>
    </li>
    `;
}


export default class ShoppingCart {
    constructor(listElement, key = "so-cart") {
        this.listElement = listElement;
        this.key = key;
        // attach/add event listener only once
        this.addListeners(); 
    }

    init() {
        const cartItems = this.aggregateCartItems();
        this.renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, "afterbegin", true);
    }

    // Retrieve cart items from local storage
    getCartItems() {
        const cart = localStorage.getItem(this.key);
        return cart ? JSON.parse(cart) : [];
    }

    saveCartItems(items) {
        localStorage.setItem(this.key, JSON.stringify(items));
    }

    // Group duplicates by Id
    aggregateCartItems() {
        const items = this.getCartItems();
        const grouped = {};

        items.forEach(item => {
            if (!grouped[item.Id]) {
            grouped[item.Id] = { ...item, quantity: 1 };
            } else {
            grouped[item.Id].quantity++;
            }
        });

        return Object.values(grouped);
    }

    // Add event listerners
    addListeners() {
        this.listElement.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        
            if (!id) return;
        
            if (e.target.classList.contains("increment")) {
                this.incrementItem(id);
            }
        
            if (e.target.classList.contains("decrement")) {
                this.decrementItem(id);
            }
        
            if (e.target.classList.contains("remove-icon")) {
                this.removeAllCopies(id);
            }
        });
        
    }

    // Cart item manipulation methods
    incrementItem(id) {
        const items = this.getCartItems();
        const itemToAdd = items.find(item => item.Id === id);
        // safeguard
        if (!itemToAdd) return;

        if (itemToAdd) {
            items.push(itemToAdd);
            this.saveCartItems(items);
            this.init();
        }
    }
    decrementItem(id) {
        let items = this.getCartItems();
        const index = items.findIndex(item => item.Id === id);
        if (index !== -1) {
            items.splice(index, 1);
            this.saveCartItems(items);
            this.init();
        }
    }

    removeAllCopies(id) {
        let items = this.getCartItems();
        items = items.filter(item => item.Id !== id);
        this.saveCartItems(items);
        this.init();
    }
}