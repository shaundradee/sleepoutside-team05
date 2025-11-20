// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  if (data && Array.isArray(data)) {
    return data;
  }
  return []; //fallback to returning an empty array
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// wk2 -get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// load header and footer
export async function loadHeaderFooter() {
  // load the header
  const header = await fetch("/partials/header.html");
  const headerText = await header.text();
  document.querySelector("#main-header").innerHTML = headerText;
  // load the footer
  const footer = await fetch("/partials/footer.html");
  const footerText = await footer.text();
  document.querySelector("#main-footer").innerHTML = footerText;

  //update cart count in header
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = cartItems.length;
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }

}

// helper function for cart count update
export function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const countElement = document.getElementById("cart-count");

  if (countElement) {
    // If using quantities:
    const totalQty = cartItems.reduce(
      (sum, item) => sum + (Number(item.quantity ?? 1)),
      0
    );
    countElement.textContent = totalQty;
  }
}