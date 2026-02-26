let allProducts = []

document.getElementById("regitesionForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelectorAll(".error").forEach(function (el) {
        el.innerText = "";
    });

    let valid = true;

    UserNamePAtten = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
    EmailPAtten = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    PhonePAtten = /^\d{10}$/;
    PasswordPAtten = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let UserName = document.getElementById("username").value.trim();
    let Email = document.getElementById("email").value.trim();
    let Phone = document.getElementById("phone").value.trim();
    let Password = document.getElementById("password").value.trim();
    let Confirmpassword = document.getElementById("confirmpassword").value.trim();
    let resultDiv = document.getElementById("result");



    let firstNameError = document.getElementById("firstNameError");
    let lastNameError = document.getElementById("lastNameError");
    let UserNameError = document.getElementById("usernameError");
    let EmailError = document.getElementById("emailError");
    let PhoneError = document.getElementById("phoneError");
    let PasswordError = document.getElementById("passwordError");
    let ConfirmpasswordError = document.getElementById("confirmpasswordError");

    if (!UserNamePAtten.test(UserName)) {
        UserNameError.innerText = "Invalid username. It should be at least 5 characters long and can contain letters, numbers, and underscores.";

        valid = false;


    } else {
        UserNamePAtten.innerText = "";
    }

    if (!EmailPAtten.test(Email)) {
        EmailError.innerText = "Invalid email format.";
        valid = false;
    } else {
        EmailPAtten.innerText = "";
    }
    if (!PhonePAtten.test(Phone)) {
        PhoneError.innerText = "Invalid phone number. It should be 10 digits.";
        valid = false;
    } else {
        PhoneError.innerText = "";
    }
    if (!PasswordPAtten.test(Password)) {
        PasswordError.innerText = "Invalid password. It should be at least 8 characters long and include uppercase, lowercase, number, and special character.";
        valid = false;
        return false;
    } else {
        PasswordError.innerText = "";
    }
    if (Password !== Confirmpassword) {
        ConfirmpasswordError.innerText = "Passwords do not match.";
        valid = false;
        return false;
    } else {
        ConfirmpasswordError.innerText = "";
    }

    valid = true;

    if (valid) {
        const userDetails = {
            firstName,
            lastName,
            UserName,
            Email,
            Phone,
            Password
        };
        console.log("Registration successful", userDetails);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        window.location.href = "index.html";
    }

});






let cart = [];
const cartCount = document.getElementById("cart-count");

/* ADD TO CART */
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId)
    if (cartItem) {
        cartItem.quantity += 1;

    } else {
        cart.push({
            ...product,
            quantity: 1,
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            // quantity:1

        });
        saveCart();
        renderCartItem();
    }




    const alreadyInCart = cart.some(item => item.id === productId);
    if (alreadyInCart) {
        // alert("Product already in cart");
        return;
    }

    cart.push(product);
    console.log("Cart:", cart);

    updateCartCount();


}

const cattIcon = document.getElementById('cart-icon');

cattIcon.addEventListener('click', function () {
    renderCartItem();
    updateCartCount();
    saveCart();
})

//--------- RENDERCARTITEM------- //
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

/* UPDATE CART COUNT + ANIMATION */
function updateCartCount() {
    cartCount.textContent = cart.length;


}


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


function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);

    saveCart();
    renderCartItem();
    updateCartCount();


}

//lodDATA function satrt


//search input 

const searshInput = document.getElementById("searshInput");
const productsDiv = document.getElementById("products");
const message = document.getElementById("message");




function lodaData() {
    fetch("https://fakestoreapi.com/products?limit=20")
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            displayProducts(allProducts);
        })
        .catch(error => console.log("Error fetching products", error));

}

function displayProducts(products) {
    productsDiv.innerHTML = "";
    message.textContent = "";

    if (products.length === 0) {
        message.textContent = "NO Products Found!";
        return;
    }
    let porductHTML = ""
    products.forEach(product => {
        porductHTML += `<div class="product-card">
            <div class="opne" onclick="openwindos(${product.id})" >
                <img src="${product.image}"alt="${product.title}"class="product-image />
                <h3 class="">${product.title}</h3>
                <p>$${product.price}</p>
            </div>
            <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                add to cart
                </button>
            </div>
            `;
    });
    document.getElementById("products").innerHTML = porductHTML;

}

searshInput.addEventListener("keyup", () => {
    const searchText = searshInput.value.toLowerCase();

    if (searchText === "") {
        displayProducts(allProducts);
        return;
    }
    const filterdProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchText));


    // filter + message displayProducts(filterdProducts);
    displayProducts(filterdProducts);

})


//lodDATA function end

//save cart 

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}


//save cart  end

const savedCart = JSON.parse(localStorage.getItem("cartItems"));
if (savedCart) {
    cart = savedCart;
    renderCartItem();
}
// footer js
document.getElementById("year").textContent = new Date().getFullYear();


// PRoduct list lowar to hight and name 

function sortSelect() {
    const sortElement = document.getElementById("sort");

    sortElement.addEventListener("change", function () {
        let sortedProduct = [...allProducts];

        if (this.value === "priceLow") {
            sortedProduct.sort((a, b) => a.price - b.price);

        } else if (this.value === "priceHigh") {
            sortedProduct.sort((a, b) => b.price - a.price);

        } else if (this.value === "nameAZ") {
            sortedProduct.sort((a, b) => {
                const nameA = a.title.toLowerCase();
                const nameB = b.title.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        }

        displayProducts(sortedProduct);
    });
}

const box = document.getElementById("opne");


function openwindos(id) {
    const url = `products/product.html?id=${id}`;


    window.open(url, '_blank');
}

// NEX PAGE JS 

    document.addEventListener("",async()=>{

        const params = new URLSearchParams(window.location.search);
const id= params.get('id');

if(!id){
    document.getElementById("product-card").innerHTML='<h2>Product not Found</h2>';
    return;
}
try{
    const response =await fetch(`https://fakestoreapi.com/products/${id}`);
    const porduct =await response.json();
    displayProducts(porduct);
}catch(error){
        console.log('Error fetching products ',error);
}


    });

//Checkout function 

function goTocheckout(){
    window.location.href="checkout.html";
}

window.addEventListener("load", (event) => {
    lodaData();
    renderCartItem();
    sortSelect();

    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
        document.getElementById("Register-btn").innerText = `${userDetails.firstName}`;
        document.getElementById("product-section").style.display = "block";
        document.getElementById("hero-img").style.display = "none";
    }
});



