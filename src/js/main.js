import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// get the element where the product list will be rendered
const element = document.querySelector(".product-list");

// create a data source for tents
const dataSource = new ProductData("tents");

// create the product list
const productList = new ProductList("Tents", dataSource, element);

// initialize the product list
productList.init();
