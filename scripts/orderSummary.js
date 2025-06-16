import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

export function renderOrderSummary() {
  let productPrice = 0;
  let shippingCost = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    const productQuantity = cartItem.quantity;
    const productId = cartItem.productId;
    const matchingProduct = products.find(
      (product) => product.id === productId
    );

    if (matchingProduct) {
      productPrice += matchingProduct.priceCents * productQuantity;
      shippingCost += 599 * productQuantity;
      totalQuantity += productQuantity;
    } else {
      console.warn(`Product with ID ${productId} not found.`);
    }
  });
  const totalBeforeTax = productPrice + shippingCost;
  const tax = totalBeforeTax * 0.1;
  const totalPrice = totalBeforeTax + tax;

  let orderSummary = ` <div class="d-flex justify-content-between">
              <p>Items <span>(${totalQuantity}):</span></p>
              <p>${(productPrice / 100).toFixed(2)}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Shipping & handling:</p>
              <p>${(shippingCost / 100).toFixed(2)}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Total before tax:</p>
              <p>${(totalBeforeTax / 100).toFixed(2)}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Estimated tax(10%):</p>
              <p>${(tax / 100).toFixed(2)}</p>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <p>Order total:</p>
              <p>${(totalPrice / 100).toFixed(2)}</p>
            </div>
           `;

  if (cart.length > 0) {
    orderSummary += ` <a href="checkout.html">
              <button class="btn btn-danger w-100">Place your order</button>
            </a>`;
  } else {
    orderSummary += `
              <button class="btn btn-secondary w-100" disabled>Your cart is empty</button>
            `;
  }

  const totalSummary = document.querySelector(".order-total");
  if (totalSummary) {
    totalSummary.innerHTML = orderSummary;
  } else {
    console.log("order summary can not found");
  }
}
