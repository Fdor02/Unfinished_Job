let countdown = 10; 
let interval = setInterval(updateTimer, 1000);
const trapTrackIframe = document.getElementById('trap-track');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const logo = document.getElementById('logo');

function updateTimer() {
    let minutes = Math.floor(countdown / 60);
    let seconds = countdown % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    countdown--;

    if (countdown < 0) {
        clearInterval(interval);
        document.getElementById('products').style.display = 'grid';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('email-section').style.display = 'none';
        document.getElementById('show-email').style.display = 'none';
        updateCartCount();
        document.getElementById('login-button').style.display = 'block';
        logo.classList.remove('large');
        logo.classList.add('small');

       
        trapTrackIframe.src = "https://www.youtube.com/embed/_VRyoaNF9sk?autoplay=1&mute=1";
        trapTrackIframe.style.display = 'none'; 

        
        setTimeout(() => {
            trapTrackIframe.src = "https://www.youtube.com/embed/_VRyoaNF9sk?autoplay=1";
        }, 100); 
    }
}

document.getElementById('show-email').addEventListener('click', function() {
    document.getElementById('email-section').style.display = 'block';
});

document.getElementById('submit-email').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    alert('Email submitted: ' + email);
    document.getElementById('email-section').style.display = 'none';
});

document.getElementById('cart').addEventListener('click', function() {
    document.getElementById('cart-section').style.display = 'flex';
    document.getElementById('products').style.display = 'none';
    updateCartDisplay();
});

document.getElementById('back-to-products').addEventListener('click', function() {
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('products').style.display = 'grid';
});

document.getElementById('login-button').addEventListener('click', function() {
    $('#loginModal').modal('show');
});

document.getElementById('join-club-button').addEventListener('click', function() {
    $('#joinClubModal').modal('show');
});

document.getElementById('submit-club-form').addEventListener('click', function() {
    const email = document.getElementById('club-email').value;
    const password = document.getElementById('club-password').value;
    const address = document.getElementById('club-address').value;
    alert(`Email: ${email}\nPassword: ${password}\nAddress: ${address}`);
    $('#joinClubModal').modal('hide');
});

document.getElementById('submit-info-button').addEventListener('click', function() {
    const email = document.getElementById('info-email').value;
    const password = document.getElementById('info-password').value;
    const confirmPassword = document.getElementById('info-confirm-password').value;
    const phone = document.getElementById('info-phone').value;
    const address = document.getElementById('info-address').value;
    alert("Email: " + email + "\n Password: " + password + "\nPhone: " + phone + "\nAddress: " + address);
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        const product = this.parentElement.getAttribute('data-product');
        addToCart(product);
    });
});

const products = document.querySelectorAll('.product');
products.forEach(product => {
    product.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        document.getElementById('product-details').textContent = `Details about ${productName}`;
        $('#productModal').modal('show');
    });
});

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
    const cartIcon = document.getElementById('cart');
    if (cart.length > 0) {
        cartIcon.style.display = 'block';
    } else {
        cartIcon.style.display = 'none';
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in the cart.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}


updateCartCount();
logo.classList.add('large');


logo.addEventListener('mouseover', function() {
    logo.classList.add('move-animation', 'scale-animation', 'rotate-animation');
});

logo.addEventListener('mouseout', function() {
    logo.classList.remove('move-animation', 'scale-animation', 'rotate-animation');
});let countdown = 10; 
let interval = setInterval(updateTimer, 1000);
const trapTrackIframe = document.getElementById('trap-track');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const logo = document.getElementById('logo');

function updateTimer() {
    let minutes = Math.floor(countdown / 60);
    let seconds = countdown % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    countdown--;

    if (countdown < 0) {
        clearInterval(interval);
        document.getElementById('products').style.display = 'grid';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('email-section').style.display = 'none';
        document.getElementById('show-email').style.display = 'none';
        updateCartCount();
        document.getElementById('login-button').style.display = 'block';
        logo.classList.remove('large');
        logo.classList.add('small');

       
        trapTrackIframe.src = "https://www.youtube.com/embed/_VRyoaNF9sk?autoplay=1&mute=1";
        trapTrackIframe.style.display = 'none'; 

        
        setTimeout(() => {
            trapTrackIframe.src = "https://www.youtube.com/embed/_VRyoaNF9sk?autoplay=1";
        }, 100); 
    }
}

document.getElementById('show-email').addEventListener('click', function() {
    document.getElementById('email-section').style.display = 'block';
});

document.getElementById('submit-email').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    alert('Email submitted: ' + email);
    document.getElementById('email-section').style.display = 'none';
});

document.getElementById('cart').addEventListener('click', function() {
    document.getElementById('cart-section').style.display = 'flex';
    document.getElementById('products').style.display = 'none';
    updateCartDisplay();
});

document.getElementById('back-to-products').addEventListener('click', function() {
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('products').style.display = 'grid';
});

document.getElementById('login-button').addEventListener('click', function() {
    $('#loginModal').modal('show');
});

document.getElementById('join-club-button').addEventListener('click', function() {
    $('#joinClubModal').modal('show');
});

document.getElementById('submit-club-form').addEventListener('click', function() {
    const email = document.getElementById('club-email').value;
    const password = document.getElementById('club-password').value;
    const address = document.getElementById('club-address').value;
    alert(`Email: ${email}\nPassword: ${password}\nAddress: ${address}`);
    $('#joinClubModal').modal('hide');
});

document.getElementById('submit-info-button').addEventListener('click', function() {
    const email = document.getElementById('info-email').value;
    const password = document.getElementById('info-password').value;
    const confirmPassword = document.getElementById('info-confirm-password').value;
    const phone = document.getElementById('info-phone').value;
    const address = document.getElementById('info-address').value;
    alert("Email: " + email + "\n Password: " + password + "\nPhone: " + phone + "\nAddress: " + address);
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        const product = this.parentElement.getAttribute('data-product');
        addToCart(product);
    });
});

const products = document.querySelectorAll('.product');
products.forEach(product => {
    product.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        document.getElementById('product-details').textContent = `Details about ${productName}`;
        $('#productModal').modal('show');
    });
});

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
    const cartIcon = document.getElementById('cart');
    if (cart.length > 0) {
        cartIcon.style.display = 'block';
    } else {
        cartIcon.style.display = 'none';
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in the cart.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}


updateCartCount();
logo.classList.add('large');


logo.addEventListener('mouseover', function() {
    logo.classList.add('move-animation', 'scale-animation', 'rotate-animation');
});

logo.addEventListener('mouseout', function() {
    logo.classList.remove('move-animation', 'scale-animation', 'rotate-animation');
});let countdown = 10; 
let interval = setInterval(updateTimer, 1000);
const trapTrackIframe = document.getElementById('trap-track');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const logo = document.getElementById('logo');

function updateTimer() {
    let minutes = Math.floor(countdown / 60);
    let seconds = countdown % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    countdown--;

    if (countdown < 0) {
        clearInterval(interval);
        document.getElementById('products').style.display = 'grid';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('email-section').style.display = 'none';
        document.getElementById('show-email').style.display = 'none';
        updateCartCount();
        document.getElementById('login-button').style.display = 'block';
        logo.classList.remove('large');
        logo.classList.add('small');

       
        trapTrackIframe.src = "https://www.youtube.com/embed/_VRyoaNF9sk?autoplay=1&mute=1";
        trapTrackIframe.style.display = 'none'; 

        
        setTimeout(() => {
            trapTrackIframe.src = "https://www.youtube.com/embed/_VRyoaNF9sk?autoplay=1";
        }, 100); 
    }
}

document.getElementById('show-email').addEventListener('click', function() {
    document.getElementById('email-section').style.display = 'block';
});

document.getElementById('submit-email').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    alert('Email submitted: ' + email);
    document.getElementById('email-section').style.display = 'none';
});

document.getElementById('cart').addEventListener('click', function() {
    document.getElementById('cart-section').style.display = 'flex';
    document.getElementById('products').style.display = 'none';
    updateCartDisplay();
});

document.getElementById('back-to-products').addEventListener('click', function() {
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('products').style.display = 'grid';
});

document.getElementById('login-button').addEventListener('click', function() {
    $('#loginModal').modal('show');
});

document.getElementById('join-club-button').addEventListener('click', function() {
    $('#joinClubModal').modal('show');
});

document.getElementById('submit-club-form').addEventListener('click', function() {
    const email = document.getElementById('club-email').value;
    const password = document.getElementById('club-password').value;
    const address = document.getElementById('club-address').value;
    alert(`Email: ${email}\nPassword: ${password}\nAddress: ${address}`);
    $('#joinClubModal').modal('hide');
});

document.getElementById('submit-info-button').addEventListener('click', function() {
    const email = document.getElementById('info-email').value;
    const password = document.getElementById('info-password').value;
    const confirmPassword = document.getElementById('info-confirm-password').value;
    const phone = document.getElementById('info-phone').value;
    const address = document.getElementById('info-address').value;
    alert("Email: " + email + "\n Password: " + password + "\nPhone: " + phone + "\nAddress: " + address);
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        const product = this.parentElement.getAttribute('data-product');
        addToCart(product);
    });
});

const products = document.querySelectorAll('.product');
products.forEach(product => {
    product.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        document.getElementById('product-details').textContent = `Details about ${productName}`;
        $('#productModal').modal('show');
    });
});

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
    const cartIcon = document.getElementById('cart');
    if (cart.length > 0) {
        cartIcon.style.display = 'block';
    } else {
        cartIcon.style.display = 'none';
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in the cart.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}


updateCartCount();
logo.classList.add('large');


logo.addEventListener('mouseover', function() {
    logo.classList.add('move-animation', 'scale-animation', 'rotate-animation');
});

logo.addEventListener('mouseout', function() {
    logo.classList.remove('move-animation', 'scale-animation', 'rotate-animation');
});
