const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItensContainer = document.getElementById("cart-itens");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

const fullNameInput = document.getElementById("full-name");
const fullNameWarn = document.getElementById("full-name-warn");
const phoneNumberInput = document.getElementById("phone-number");
const phoneNumberWarn = document.getElementById("phone-number-warn");
const preferencesInput = document.getElementById("preferences");

let cart = [];

// abrir modal (carrinho)
cartBtn.addEventListener("click", function() {
    cartModal.classList.remove("hidden");
});

// fechar carrinho quando clicar fora
cartModal.addEventListener("click", function(event) {
    if (event.target == cartModal) {
        cartModal.classList.add("hidden");
    }
});

// fechar modal botão
closeModalBtn.addEventListener("click", function() {
    cartModal.classList.add("hidden");
});

// adicionar item ao carrinho
menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-cart-btn");
    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        // adicionar no carrinho
        addToCart(name, price);
    }
});

// função adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
    }

    updateCartModal();
}

function updateCartModal() {
    cartItensContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItensElement = document.createElement("div");
        cartItensElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItensElement.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2">R$ ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <div>
            <button class="remove-item-btn bg-red-500 text-white px-4 py-1 rounded" data-name="${item.name}">Remover</button>
          </div>
        </div>
        `;
        cartItensContainer.appendChild(cartItensElement);

        total += item.price * item.quantity;
    });

    cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// evento para remover item do carrinho
cartItensContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-item-btn")) {
        const name = event.target.getAttribute("data-name");
        removeFromCart(name);
    }
});

function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();  // Atualizar o carrinho após remover o item
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

// finalizar pedido
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        alert("RESTAURANTE FECHADO NO MOMENTO")
        return;
    }

    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    //enviar o pedido para whats
    const cartItems = cart.map((item) => {
        return ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`;
    }).join("");

    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    const message = encodeURIComponent(
        `Pedido: ${cartItems}\nTotal: ${cartTotal.textContent}|\nPreferências: ${preferencesInput.value}|\nNome: ${fullNameInput.value}|\nEndereço: ${addressInput.value}\nCelular: ${phoneNumberInput.value}|\nMétodo de Pagamento: ${paymentMethod}|`
    );

    const phone = "33998100529";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
})

// funcionamento restaurante
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 11 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}
