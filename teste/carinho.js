// Seleciona o elemento que contém a lista de produtos no HTML.
const produtosContainer = document.querySelector('.produtos-container');

// Seleciona o elemento do carrinho no HTML.
const cart = document.getElementById('cart');

// Seleciona o elemento que mostra o total no HTML.
const totalElement = document.getElementById('total');

// Variável para armazenar o preço total do carrinho.
let totalPrice = 0;

// Adiciona um ouvinte de evento de clique no container de produtos.
produtosContainer.addEventListener('click', (event) => {
    // Verifica se o elemento clicado contém a classe 'carinho'.
    if (event.target.classList.contains('carinho')) {
        // Encontra o produto pai mais próximo que contém a classe 'card-produto'.
        const product = event.target.closest('.card-produto');
        
        // Extrai o nome, preço e imagem do produto.
        const productName = product.querySelector('.container-info h3').textContent;
        const productPrice = parseFloat(product.querySelector('.container-preco span').textContent.split('R$')[1]);
        const productImage = product.querySelector('.container-imagem img').getAttribute('src');

        // Chama a função para adicionar o produto ao carrinho.
        addToCart(productName, productPrice, productImage);
    }
});

// Função para adicionar um produto ao carrinho.
function addToCart(name, price, image) {
    // Verifica se o produto já existe no carrinho.
    const existingCartItem = cart.querySelector(`.cart-item[data-product="${name}"]`);
    if (existingCartItem) {
        // Atualiza a quantidade do item no carrinho.
        updateCartItem(existingCartItem, price);
    } else {
        // Adiciona um novo item ao carrinho.
        addNewCartItem(name, price, image);
    }

    // Atualiza o preço total do carrinho.
    totalPrice += price;
    updateTotal();
}

// Função para atualizar a quantidade de um item no carrinho.
function updateCartItem(item, price) {
    const quantityElement = item.querySelector('.quantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
}

// Função para adicionar um novo item ao carrinho.
function addNewCartItem(name, price, image) {
    // Cria um novo elemento de item no carrinho.
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

    // Adiciona um ouvinte de evento para o botão de remover.
    const removeButton = cartItem.querySelector('.remove-button');
    removeButton.addEventListener('click', () => removeFromCart(cartItem, price));

    // Adiciona o novo item ao carrinho.
    cart.appendChild(cartItem);
}

// Função para remover um item do carrinho.
function removeFromCart(item, price) {
    const quantityElement = item.querySelector('.quantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
    } else {
        // Remove o item do carrinho quando a quantidade é 1.
        cart.removeChild(item);
    }

    // Atualiza o preço total do carrinho.
    totalPrice -= price;
    updateTotal();
}

// Função para atualizar o preço total exibido no HTML.
function updateTotal() {
    totalElement.textContent = `Total: R$${totalPrice.toFixed(2)}`;
}

// Seleciona o ícone do carrinho no HTML.
const carinhoIcon = document.getElementById("carinho");

// Seleciona o modal no HTML.
const modal = document.getElementById("modal");

// Adiciona um ouvinte de evento de clique no ícone do carrinho.
carinhoIcon.addEventListener("click", function() {
    modal.style.display = "block";
    carinhoIcon.style.opacity = 0.5;
});

// Adiciona um ouvinte de evento de clique no modal.
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        carinhoIcon.style.opacity = 1;
    }
});

// Seleciona os elementos com a classe 'fecha'.
const fecha = document.getElementsByClassName('fecha');

// Adiciona ouvintes de evento de clique para cada elemento 'fecha'.
for (let i = 0; i < fecha.length; i++) {
    fecha[i].addEventListener('click', function() {
        modal.style.display = "none";
        carinhoIcon.style.opacity = 1; // Restaura a opacidade quando a modal é fechada
    });
}
