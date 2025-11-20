import { renderListWithTemplate, getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";



function cartItemTemplate(item) {
    const qty = item.quantity ?? 1;
    const lineTotal = (item.FinalPrice * qty).toFixed(2);

    return `
    <li class="cart-card divider" data-id="${item.Id}">
        <span class="remove-icon" data-id="${item.Id}" aria-label="Remove item from cart" role="button" tabindex="0">&times;</span>

        <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img src="/images/${item.Image}" alt="${item.Name}" />
        </a>

        <a href="/product_pages/index.html?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
        </a>

        <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>

        <div class="cart-card__quantity">
        <button class="decrement" data-id="${item.Id}" aria-label="Decrease quantity">−</button>
        <span class="quantity" data-id="${item.Id}">${qty}</span>
        <button class="increment" data-id="${item.Id}" aria-label="Increase quantity">+</button>
        </div>

        <p class="cart-card__price">$${lineTotal}</p>
    </li>
    `;
}

export default class ShoppingCart {
    constructor(listSelector = ".product-list", storageKey = "so-cart") {
        this.listElement = typeof listSelector === "string" ? document.querySelector(listSelector) : listSelector;
        this.key = storageKey;

        // Bind the handler so we can remove or ensure single attachment if needed
        this._onClick = this._onClick.bind(this);

        // Attach single delegated listener if the container exists
        if (this.listElement) {
            this.listElement.addEventListener("click", this._onClick);
        }
    }

    // ----- storage helpers -----
    getCartItems() {
        // getLocalStorage returns [] if missing or not an array per your utils
        return getLocalStorage(this.key);
    }

    saveCartItems(items) {
        setLocalStorage(this.key, items);
    }

    // ----- normalize stored items so they have quantity -----
    normalizeItems(items) {
        // Convert older array-of-duplicates format into array-with-quantity,
        // i.e. if item appears multiple times, sum into single item.quantity
        const map = {};
        (items || []).forEach(it => {
            const id = it.Id;
            if (!map[id]) {
            // create shallow copy so we don't mutate original object references unexpectedly
            map[id] = { ...it, quantity: Number(it.quantity ?? 1) };
            } else {
            map[id].quantity = (map[id].quantity || 1) + (Number(it.quantity ?? 1));
            }
        });
        return Object.values(map);
    }

    // ----- public API -----
    // Render current cart into the list element
    render() {
        if (!this.listElement) return;

        // Ensure items are normalized to include quantity
        const raw = this.getCartItems();
        const items = this.normalizeItems(raw);

        // Use your utils renderer and tell it to clear first (clear = true)
        renderListWithTemplate(cartItemTemplate, this.listElement, items, "afterbegin", true);
    }

    // ----- internal event handling -----
    _onClick(e) {
        // Determine what was clicked, handle increment / decrement / remove
        const target = e.target;
        const id = target?.dataset?.id;
        if (!id) return;

        // Load items as stored (note: they might be in various shapes; normalize as needed)
        let items = this.getCartItems();
        items = this.normalizeItems(items);

        const idx = items.findIndex(i => i.Id == id); // loose equality to handle string/number mismatch
        if (idx === -1) return;

        if (target.classList.contains("increment")) {
            items[idx].quantity = (items[idx].quantity || 1) + 1;
            this.saveCartItems(items);
            updateCartCount();
            this.render();
            return;
        }

        if (target.classList.contains("decrement")) {
            items[idx].quantity = (items[idx].quantity || 1) - 1;
            if (items[idx].quantity <= 0) {
                // remove item entirely
                items.splice(idx, 1);
            }
            this.saveCartItems(items);
            updateCartCount();
            this.render();
            return;
        }

        if (target.classList.contains("remove-icon")) {
            items.splice(idx, 1);
            this.saveCartItems(items);
            updateCartCount();
            this.render();
            return;
        }
    }
}
