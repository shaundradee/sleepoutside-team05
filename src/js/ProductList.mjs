import { renderListWithTemplate } from "./utils.mjs";

function productListTemplate(product) {
    return `
    <li class="product-card">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.NameWithoutBrand}</h3>
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">        
        <p>Price: ${product.FinalPrice}</p>
        <p>Color: ${product.Colors[0].ColorName}</p>
        <a href="/product_pages/index.html?product=${product.Id}">View Details</a>
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
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
    }

    renderList(list) {
        // const htmlStrings = list.map(productListTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productListTemplate, this.listElement, list);

    }
}
