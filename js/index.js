let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
function updateCartCount() {
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-icon").textContent = totalQuantity;
}

document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", function () {
    let productId = this.getAttribute("data-id");
    let productPrice = parseFloat(this.getAttribute("data-price")) || 0;
    let existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      let product = {
        id: productId,
        title: this.getAttribute("data-title"),
        price: productPrice,
        quantity: 1,
      };
      cart.push(product);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  });
});

document.getElementById("cart-icon").addEventListener("click", function () {
  let cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      let cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");
      cartItemDiv.innerHTML = `
                <h3>${item.title}</h3>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease-qty" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-qty" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
      cartContainer.appendChild(cartItemDiv);
    });

    document.querySelectorAll(".increase-qty").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        cart[index].quantity++;
        sessionStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        document.getElementById("cart-icon").click();
      });
    });

    document.querySelectorAll(".decrease-qty").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        document.getElementById("cart-icon").click();
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        let indexToRemove = this.getAttribute("data-index");
        cart.splice(indexToRemove, 1);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        document.getElementById("cart-icon").click();
      });
    });
  }

  document.getElementById("cart-modal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("cart-modal").style.display = "none";
});

window.onclick = function (event) {
  let modal = document.getElementById("cart-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//  Update count on page load
updateCartCount();
