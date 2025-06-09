import { products } from "./products.js";

export let cart = [
  {
    productId: "1",
    quantity: 2,
  },
  {
    productId: "2",
    quantity: 1,
  },
];

let cartSumHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

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
                    <a class="remove-btn js-remove-btn" href="#" data-product-id="${matchingProduct.id}">Remove</a>
                  </div>
                </div>
              </td>
              <td>
                <input type="number" value="${cartItem.quantity}" />
                <a class="edit-btn" href="#">Edit</a>
              </td>
              <td>
                <span>$</span>
                <span class="price">${matchingProduct.priceCents / 100}</span>
              </td>
           </tr>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSumHTML;

document.querySelectorAll(".js-remove-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId =  btn.dataset.productId;
    cart = cart.filter(cartItem => cartItem.productId !== productId)
  
   const productRow =  btn.closest("tr");
   productRow.remove();
  });
});
