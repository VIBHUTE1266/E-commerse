 let cart = JSON.parse(localStorage.getItem("cartItems")) || [];      

const checkoutItems=document.getElementById("checkout-items");

const totalAmouont =document.getElementById("total-amount");

async function loadProduct() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // if (!id) {
    //     document.getElementById("product-details").innerHTML =
    //         "<h3>Product Not Found</h3>";
    //     return;
    // }
    
    // try {
    //     const response = await fetch(
    //         `https://fakestoreapi.com/products/${id}`
    //     );
    //     const product = await response.json();
    //     currentProduct = product;

    //     displayProducts(product);

    // } catch (error) {
    //     console.log("Error fetching product:", error);
    // }
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
            <div class="checkout-item-details">
                <h3>${item.title}</h3>
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
