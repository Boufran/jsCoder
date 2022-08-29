// // OCULTANDO ID
// document.getElementsByClassName("ocultar-id").style.display = "none";

const Clickbutton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
let carrito = [];

Clickbutton.forEach((btn) => {
  btn.addEventListener("click", addToCarritoItem);
});

function addToCarritoItem(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  // Agrego ID
  const itemId = item.querySelector(".ocultar-id").textContemt;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    id: itemId,
    cantidad: 1,
  };

  addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
  const alert = document.querySelector(".alert");

  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");

  const InputElemnto = tbody.getElementsByClassName("input__elemento");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      const inputValue = InputElemnto[i];
      inputValue.value++;
      CarritoTotal();
      return null;
    }
  }

  carrito.push(newItem);

  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("ItemCarrito");
    const Content = `
    
    <th scope="row"></th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `;
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
    tr.querySelector(".input__elemento").addEventListener(
      "change",
      sumaCantidad
    );
  });
  CarritoTotal();
}

function CarritoTotal() {
  let Total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    Total = Total + precio * item.cantidad;
  });

  itemCartTotal.innerHTML = `Total $${Total}`;
  addLocalStorage();
}

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  const alert = document.querySelector(".remove");

  setTimeout(function () {
    alert.classList.add("remove");
  }, 2000);
  alert.classList.remove("remove");

  tr.remove();
  CarritoTotal();
}

function sumaCantidad(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
    }
  });
}

function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};

document.getElementById("terminarCompra").onclick = function agregarDatos() {
  document.innerHTML(`<div class="row">
  <div class="col-sm column-1">
    Nombre y Apellido:
  </div>
  <div class="col-sm column-2">
    <input class="field" type="text" name="name" id="name">
  </div>
</div>
<div class="row">
  <div class="col-sm column-1">
    Telefono:
  </div>
  <div class="col-sm column-2">
    <input class="field" type="text" name="phone" id="phone" >
  </div>
</div>
<div class="row">
  <div class="col-sm column-1">
    Dirección:
  </div>
  <div class="col-sm column-2">
    <input class="field" type="text" name="adress" id="adress">
  </div>
</div>
<div class="row" >
  <div class="col-sm column-1">
  </div>
  <div class="col-sm column-2">
    <div class="error" id="error-cliente"></div>
    <button class="finalizar" onclick="finalizarPedido()">FINALIZAR PEDIDO</button>
  </div>
</div>`);
};
function finalizarPedido() {
  if ($("#name").val().trim() === "") {
    $("#error-cliente").html("Debe ingresar un nombre");
    return;
  }
  if ($("#phone").val().trim() === "") {
    $("#error-cliente").html("Debe ingresar un teléfono");
    return;
  }
  if ($("#adress").val().trim() === "") {
    $("#error-cliente").html("Debe ingresar una dirección");
    return;
  }
  $("#error-cliente").html("");
  var mensaje = `Muchas gracias por tu compra ${$(
    "#name"
  ).val()}, estaremos enviando tu pedido a ${$(
    "#adress"
  ).val()} en los proximos minutos`;
  $("#detalle-pedido").html(mensaje);
  $("#modal-pedido").modal();
  $("#pedido-final").html("");
  $("#form-cliente").html("");
}
