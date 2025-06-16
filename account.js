import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

function orderInAccount() {
  let yourOrder = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const addedDate = new Date(cartItem.addedAt);
    const formattedDate = addedDate.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    let matchingProduct = "";

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    if (matchingProduct) {
      yourOrder += ` <tr>
          <td>
            <div class="product-info">
              <img src="${matchingProduct.image}" />
              <div>
                <p>Crochet</p>
              </div>
            </div>
          </td>

          <td>
            <span class="js-date">${formattedDate}</span>
          </td>
        </tr>`;
    } else {
      console.log("Product can not found.");
    }
  });

  const yourTotalOrder = document.querySelector(".your-order");
  if (yourTotalOrder) {
    yourTotalOrder.innerHTML = yourOrder;
  } else {
    console.log("Your order can not be found !");
  }
}
orderInAccount();
