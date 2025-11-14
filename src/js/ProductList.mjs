import { renderListWithTemplate } from "./utils.mjs";

function productListTemplate(product) {
    return `
    <li class="product-card">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.NameWithoutBrand}</h3>
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <p>Price: ${product.FinalPrice.toFixed(2)}</p>
        <p>Color: ${product.Colors[0].ColorName}</p>
        <a href="product_pages/?products=${product.Id}">View Details</a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        // passing this information to make the class as reusable as possible
        // Being able to define these things when you use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSource.getData();

        this.renderListWithTemplate(productListTemplate, this.listElement, list);    
    }
}