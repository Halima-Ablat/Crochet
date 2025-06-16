import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

console.log("ID", productId);

const product = products.find((p) => p.id == productId);

const singleCrochet = document.querySelector(".single-product");

if (product) {
  singleCrochet.innerHTML = `
    <div class="col-lg-5 col-md-6 col-sm-12">
      <img id="large-image" class="image-fluid product-img" src="${
        product.image
      }" alt="crochet" />
   
    </div>
    <div class="col-lg-6 col-md-12 col-sm-12 crochet-detail px-5">
      <h2>${product.name}</h2>
      <p>$${(product.priceCents / 100).toFixed(2)}</p>
      <label>Quantity</label><br />
      <input class="quantity" type="number" value="1" min="1" max="10"/>
      <a href="cart.html">
       <button class="add-btn mt-3" data-product-id="${
         product.id
       }">Add to cart</button></a>
    
    </div>
  `;
} else {
  singleCrochet.innerHTML = `<h2>Product Not Found</h2>`;
}

 function addToCart(productId, quantityToAdd) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    const newTotal = matchingItem.quantity += quantityToAdd;
    matchingItem.quantity = newTotal > 10 ? 10 : newTotal;
  } else {
    cart.push({
      productId: productId,
      quantity: quantityToAdd > 10 ? 10 : quantityToAdd,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const quantityInput = document.querySelector(".quantity");
      const quantityToAdd = parseInt(quantityInput.value, 10) || 1;
      addToCart(productId, quantityToAdd);
     
    });
  });
 
});

