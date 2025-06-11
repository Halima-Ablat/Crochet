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
      <input class="quantity" type="number" value="1" />
      <a href="cart.html">
       <button class="add-btn mt-3" data-product-id="${
         product.id
       }">Add to cart</button></a>
     
      <h4 class="my-5">Product details</h4>
    
    </div>
  `;
} else {
  singleCrochet.innerHTML = `<h2>Product Not Found</h2>`;
}

function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function cartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  const cartIcon = document.querySelector(".cart-quantity");
  cartIcon.dataset.quantity = cartQuantity;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      addToCart(productId);
      cartQuantity();
    });
  });
  cartQuantity();
});
