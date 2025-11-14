import"./style-CvSgZ4HU.js";import{P as s}from"./ProductData-D6Sl5V2y.js";function r(t){return`
    <li class="product-card">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.NameWithoutBrand}</h3>
        <img src="${t.Image}" alt="${t.NameWithoutBrand}" />
        <p>Price: ${t.FinalPrice.toFixed(2)}</p>
        <p>Color: ${t.Colors[0].ColorName}</p>
        <a href="product_pages/?products=${t.Id}">View Details</a>
    </li>
    `}class o{constructor(e,a,i){this.category=e,this.dataSource=a,this.listElement=i}async init(){const e=await this.dataSource.getData();this.renderListWithTemplate(r,this.listElement,e)}}const n=document.querySelector(".product-list"),c=new s("tents"),l=new o("Tents",c,n);l.init();
