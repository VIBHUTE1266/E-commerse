 let cart = JSON.parse(localStorage.getItem("cartItems")) || [];      

const checkoutItems=document.getElementById("checkout-items");

const totalAmouont =document.getElementById("total-amount");

async function loadProduct() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    
}

document.addEventListener("DOMContentLoaded", loadProduct);



function displayCheckoutItems() {
    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        totalAmouont.textContent = "0.00";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        html += `<div class="checkout-item">
            <img src="${item.image}" alt="${item.title}" class="checkout-item-image">
            <div class="checkout-item-details" style="font-size:12px;">
                <h3 style="font-size:12px;">${item.title}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        </div>`;
    });

    checkoutItems.innerHTML = html;
    totalAmouont.textContent = total.toFixed(2);
}


let currentProduct = null;


function calculateTotal(){
    const total =cart.reduce((acc,item)=>{
        return acc +(item.price * item.quantity);
    },0);

    totalAmouont.textContent =total;
}



//=============
//form submit
//=============



document.getElementById("checkout-form").addEventListener("submit", function(e){
    e.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const phone = document.getElementById("mobile").value.trim();


    if(!fullName || !address || !city || !pincode || !phone){
        alert("Please fill all fields");
        return;
    }
    if(pincode.length !== 6 || isNaN(pincode)){
        alert("Enter valid 6-digit pincode");
        return;
    }
    if(phone.length !== 10 || isNaN(phone)){
        alert("Enter valid 10-digit phone number");
        return;
    }
    
    alert("Order placed successfully");

    localStorage.removeItem("cartItems");

    window.location.href="index.html";



});
displayCheckoutItems();
//cartcount 
    const cartCount = document.getElementById("cart-count");

// renderCartItem function renderCartItem

function renderCartItem() {
    const cartItemDiv = document.getElementById("cartItems");
    const totalPriceDiv = document.getElementById("totalPrice");

    cartItemDiv.innerHTML = "";
    let total = 0;


    if ( cart.length === 0) {
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
            <small>${item?.title?.slice(0, 20)}...</small><br>
            ₹${item.price}
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

    updateCartCount();
}
function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}
function updateCartCount() {
    cartCount.textContent = cart.length;


}
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);

    saveCart();
    renderCartItem();
    updateCartCount();


}
// + -
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


window.addEventListener("load", (event) => {
    // lodaData();
    // renderCartItem();
    // sortSelect();

    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
        document.getElementById("Register-btn").innerText = `${userDetails.firstName}`;
        // document.getElementById("product-section").style.display = "block";
        // document.getElementById("hero-img").style.display = "none";
    }
});
