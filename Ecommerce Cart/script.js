document.addEventListener('DOMContentLoaded', ()=>{
    const products = [
        { id: 1, name: "Product 1", price: 29.99},
        { id: 2, name: "Product 2", price: 19.99},
        { id: 3, name: "Product 3", price: 59.99},
    ];

    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const cartPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    products.forEach(product=>{
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product)
        }
    });

    function addToCart(product){
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart)); // to save data to local storage
        renderCart();
    }

    function renderCart(){
        cartItems.innerText = "";

        let totalPrice = 0;
        
        console.log(cart.length);
        

        if(cart.length > 0){
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index)=>{
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                 
                <button>Remove</button>
                `
                cartItem.classList.add("cart-item");
                cartItems.appendChild(cartItem);

            })
            totalPrice = totalPrice.toFixed(2);
            cartPriceDisplay.textContent = `$${totalPrice}`;
        }
        else{
            cartItems.textContent = emptyCartMessage.innerText;
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
        }

    }

    cartItems.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
            const index = parseInt(e.target.getAttribute("data-index"));
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart)); // to save data to local storage
            renderCart();
        }
    })    

    checkOutBtn.addEventListener("click", ()=>{
        cart.length = 0;
        alert("Checkout Successful");
        renderCart();
    })

    // to get all the saved data from local storage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart.push(...JSON.parse(savedCart)); // Restore cart
    }
    renderCart();

});