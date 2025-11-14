import"./style-CvSgZ4HU.js";import{g as c}from"./utils-Dlkao3rL.js";function o(){let t=c("so-cart")||[];Array.isArray(t)||(t=[]);const r=t.map(a=>i(a));document.querySelector(".product-list").innerHTML=r.join("")}const e=document.querySelector(".product-list");e&&e.addEventListener("click",function(t){if(t.target.classList.contains("remove-icon")){const r=t.target.dataset.id;let a=c("so-cart")||[];a=a.filter(s=>s.Id!==r),localStorage.setItem("so-cart",JSON.stringify(a)),o()}});function i(t){return`<li class="cart-card divider">
    <span class="remove-icon" data-id="${t.Id}" aria-label="Remove item from cart" role="button" tabindex="0">&times;</span>
    <a href="#" class="cart-card__image">
        <img src="${t.Image}" alt="${t.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${t.FinalPrice}</p>
  </li>`}o();
