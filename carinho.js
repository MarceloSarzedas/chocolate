
const produtosContainer = document.querySelector('.produtos-container');
const cart = document.getElementById('cart');
const totalElement = document.getElementById('total');
let totalPrice = 0;

produtosContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('carinho')) {
        const product = event.target.closest('.card-produto');
        const productName = product.querySelector('.container-info h3').textContent;
        const productPrice = parseFloat(product.querySelector('.container-preco span').textContent.split('R$')[1]);
        const productImage = product.querySelector('.container-imagem img').getAttribute('src');

        addToCart(productName, productPrice, productImage);
    }
});

function addToCart(name, price, image) {
    const existingCartItem = cart.querySelector(`.cart-item[data-product="${name}"]`);
    if (existingCartItem) {
        updateCartItem(existingCartItem, price);
    } else {
        addNewCartItem(name, price, image);
    }

    totalPrice += price;
    updateTotal();
}

function updateCartItem(item, price) {
    const quantityElement = item.querySelector('.quantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
}

function addNewCartItem(name, price, image) {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-product', name);
    cartItem.innerHTML = `
        <div class="cart-item">
            <img src="${image}" alt="${name}" class="cart-item-image">
            <span>${name} - R$${price.toFixed(2)}</span>
            <button class="remove-button">Remover</button>
            <span class="quantity">1</span>
        </div>
    `;

    const removeButton = cartItem.querySelector('.remove-button');
    removeButton.addEventListener('click', () => removeFromCart(cartItem, price));

    cart.appendChild(cartItem);
}

function removeFromCart(item, price) {
    const quantityElement = item.querySelector('.quantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
    } else {
        cart.removeChild(item);
    }

    totalPrice -= price;
    updateTotal();
}

function updateTotal() {
    totalElement.textContent = `Total: R$${totalPrice.toFixed(2)}`;
}

const carinhoIcon = document.getElementById("carinho");
const modal = document.getElementById("modal");

carinhoIcon.addEventListener("click", function() {
    modal.style.display = "block";
    carinhoIcon.style.opacity = 0.5;
});

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        carinhoIcon.style.opacity = 1;
    }
});
const fecha = document.getElementsByClassName('fecha')

for (let i = 0; i < fecha.length; i++) {
    fecha[i].addEventListener('click', function() {
        modal.style.display = "none";
        carinhoIcon.style.opacity = 1; // Restaure a opacidade quando a modal for fechada
    })
}