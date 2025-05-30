const products = [
  {
    image: "images/image 4.jpeg",
    name: "Rabbit Crochet",
    rating: 5,
    priceCents: 3999,
  },
  {
    image: "images/image 4.jpeg",
    name: "Elephant Crochet",
    rating: 4,
    priceCents: 1999,
  },
  {
    image: "images/image 4.jpeg",
    name: "Cat Crochet",
    rating: 5,
    priceCents: 2099,
  },
  {
    image: "images/image 4.jpeg",
    name: "Monkey Crochet",
    rating: 4,
    priceCents: 1099,
  },
  {
    image: "images/image 4.jpeg",
    name: "Teddy Crochet",
    rating: 5,
    priceCents: 2100,
  },
  {
    image: "images/image 4.jpeg",
    name: "Tiger Crochet",
    rating: 4,
    priceCents: 1999,
  },
  {
    image: "images/image 4.jpeg",
    name: "Giant Teddy Crochet",
    rating: 5,
    priceCents: 2099,
  },
  {
    image: "images/image 4.jpeg",
    name: "Little Rabbit Crochet",
    rating: 4,
    priceCents: 1099,
  },
];

let productsHTML = '';

products.forEach((product) => {
  productsHTML +=  ` <div class="crochet mt-3 text-center col-lg-3 col-md-4 col-sm-12">
          <img
            class="image-fluid rounded mb-3"
            src="${product.image}"
            alt="${product.name}"
          />
          <div>${'⭐'.repeat(product.rating)}</div>
          <p class="crochet-info">${product.name}</p>
          <p class="crochet-info">$${(product.priceCents / 100).toFixed(2)}</p>
          <button class="shop-btn">Shop now</button>
        </div>`;
});

console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;



// document.getElementById("see-more-btn").addEventListener("click", function () {
//   const moreImages = document.getElementById("more-images");

//   moreImages.classList.toggle("d-none");

//   this.textContent = moreImages.classList.contains("d-none")
//     ? "See more"
//     : "See less";
// });

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxGmVgsymx36_iZwKeCBRZp83obY5CTioN0M3v4MuTUZE-c_qFU4IZMMepikXjWRJZBiQ/exec";
const form = document.forms["submit-to-google-sheet"];

const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      message.innerHTML = "Message sent successfully!";
      setTimeout(function () {
        message.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
