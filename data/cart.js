import { products } from "./products.js";
import { renderOrderSummary } from "../scripts/orderSummary.js";

export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "1",
      quantity: 2,
    },
    {
      productId: "2",
      quantity: 1,
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function cartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  const cartIcon = document.querySelector(".cart-quantity");
  if (cartIcon) {
    cartIcon.dataset.quantity = cartQuantity;
  }
}

function updateCartDisplay() {
  const orderSum = document.querySelector(".js-order-summary");
  let cartSumHTML = "";

  cart.forEach((cartItem) => {
    const matchingProduct = products.find(
      (product) => product.id === cartItem.productId
    );
    if (matchingProduct) {
      cartSumHTML += `
        <tr>
          <td>
            <div class="product-info">
              <img src="${matchingProduct.image}" />
              <div>
                <p>Crochet</p>
                <small><span>$</span>${(
                  matchingProduct.priceCents / 100
                ).toFixed(2)}</small>
                <br />
                <a class="remove-btn js-remove-btn" href="#" data-product-id="${
                  matchingProduct.id
                }">Remove</a>
              </div>
            </div>
          </td>
          <td>
            <input type="number" class="quantity-input" min="1" max="10" value="${
              cartItem.quantity
            }" />
            <a class="edit-btn" href="#">Edit</a>
          </td>
          <td>
            <span>$</span>
            <span class="price">${(
              (matchingProduct.priceCents / 100) *
              cartItem.quantity
            ).toFixed(2)}</span>
          </td>
        </tr>`;
    }
  });

  if (orderSum) {
    orderSum.innerHTML = cartSumHTML;

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const row = e.target.closest("tr");
        const productId = row.querySelector(".js-remove-btn").dataset.productId;
        const newQuantity = parseInt(e.target.value);

        const cartItem = cart.find((item) => item.productId === productId);
        if (cartItem && newQuantity > 0) {
          cartItem.quantity = newQuantity;
        } else if (cartItem && newQuantity <= 0) {
          const index = cart.indexOf(cartItem);
          cart.splice(index, 1);
        }

        saveToStorage();
        cartQuantity();
        updateCartDisplay();
        renderOrderSummary();
      });
    });
    attachRemoveListeners();
  } else {
    console.error("Element .js-order-summary not found");
  }
}

function attachRemoveListeners() {
  document.querySelectorAll(".js-remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      cart = cart.filter((cartItem) => cartItem.productId !== productId);
      saveToStorage();
      cartQuantity();
      updateCartDisplay();
      renderOrderSummary();
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay();
  renderOrderSummary();
  cartQuantity();
});
