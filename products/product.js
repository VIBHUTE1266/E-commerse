
let all  = [];



const productTitle = document.getElementById("product-title");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productImage = document.getElementById("product-image");
const addToCartBtn = document.getElementById("addToCartBtn");


function displayProducts(product) {
    productTitle.innerText = product.title;
    productPrice.innerText = "$" + product.price;
    productDescription.innerText = product.description;
    productImage.innerHTML = `<img src="${product.image}">`;
  
}

addToCartBtn.addEventListener("click", () => {
            if(currentProduct){
                addToCart(currentProduct);
                updateCartCount();
                renderCartItem();
            }
})



let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
let currentProduct = null;

function addToCart(product) {

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    alert("Added to cart!");
}



async function loadProduct() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("product-details").innerHTML =
            "<h3>Product Not Found</h3>";
        return;
    }
    
    try {
        const response = await fetch(
            `https://fakestoreapi.com/products/${id}`
        );
        const product = await response.json();
        currentProduct = product;

        displayProducts(product);

    } catch (error) {
        console.log("Error fetching product:", error);
    }
}


document.addEventListener("DOMContentLoaded", loadProduct);



function renderCartItem() {
    const cartItemDiv = document.getElementById("cartItems");
    const totalPriceDiv = document.getElementById("totalPrice");

    cartItemDiv.innerHTML = "";
    let total = 0;


    if (cart.length === 0) {
        cartItemDiv.innerHTML = "<p>cart not input </p>";
        totalPriceDiv.innerHTML = "<p>total = 0</p>";
        return;
    }
    cart.forEach(item => {
        total += item.price * item.quantity;

        cartItemDiv.innerHTML += `<div class="d-flex gap-2 align-items-center mb-3 border-bottom pb-2">
    <img src="${item.image}" width="40">

    <div style="display:flex;flex-direction:column;">
        <div>
            <small>${item?.title?.slice(0,20)}...</small><br>
            $${item.price}   
        </div>
        <div>
            <div class="d-flex align-items-center gap-2">
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQty(${item.id})">−</button>
                    <div>${item.quantity}</div>
                    <button class="btn btn-sm btn-outline-secondary" onclick="increaseQty(${item.id})">+</button>
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeItem(${item.id})">✖</button>
            </div>
        </div>
    </div>
</div>`;


    });
    totalPriceDiv.innerText = `Total:${total.toFixed(2)}`;


}

// increaseQty function increaseQty
function increaseQty(productId) {
    const increaseQty = cart.find(item => item.id === productId);
    if (increaseQty) {
        increaseQty.quantity++;
    }
    saveCart();
    renderCartItem();
    updateCartCount();
}

function decreaseQty(productId) {
    const decreaseQty = cart.find(item => item.id === productId);


    if (decreaseQty) {
        if (decreaseQty.quantity == 1) {
            return;
        }
        decreaseQty.quantity--;
    }
    saveCart();

    renderCartItem();
    updateCartCount();
}




// shoping cart functions

const cattIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById("cart-count");

cattIcon.addEventListener('click', function () {
    renderCartItem();
    updateCartCount();
    saveCart();
})
function updateCartCount() {
        let totalQty = 0;
        cart.forEach(item => totalQty += item.quantity);
        cartCount.textContent = totalQty;   
}

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}


function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);

    saveCart();
    renderCartItem();
    updateCartCount();


}


// checkout function



window.addEventListener("load", (event) => {
    // lodaData();
    renderCartItem();
    // sortSelect();

    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
        document.getElementById("Register-btn").innerText = `${userDetails.firstName}`;
  
    }
});



