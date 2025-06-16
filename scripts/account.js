import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

const today = new Date();
const formatDate = today.toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric"
});

function orderInAccount() {
  let yourOrder = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

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
            <span class="js-date"></span>
          </td>
        </tr>`;
    }else{
      console.log("Product can not found.")
    }
  });

  const yourTotalOrder = document.querySelector(".your-order");
  if (yourTotalOrder) {
    yourTotalOrder.innerHTML = yourOrder;
  } else {
    console.log("Your order can not be found !");
  }

  document.querySelectorAll(".js-date").forEach((orderDate) => {
 if(orderDate){
    orderDate.textContent = formatDate;
  }
  });
 
}
orderInAccount();
