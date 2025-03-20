// Datos del producto (esto puede ser reemplazado por datos reales desde un servidor o base de datos)
const product = [{
  id: 1,
  nombre: "Extractor",
  precio: 10,
  categoria: "Hogar",
  descripcion: "Extractor de jugos manual de gran tamaño, diseñado para obtener jugo de cítricos como naranjas, toronjas y limones con facilidad y eficiencia."
},{
  id: 2,
  nombre: "Pila de Auto",
  precio: 20,
  categoria: "Hogar",
  descripcion:
    "Batería de 12 voltios, marca LTH, diseñada para ofrecer alta potencia y rendimiento confiable en vehículos automotores.",
},
{
  id: 3,
  nombre: "Juego de piedras",
  precio: 5,
  categoria: "Hogar",
  descripcion:
    "Juego de piedras de 4 pulgadas fabricadas en piedra volcánica, ideales para moler maíz y otros granos. Su material garantiza un molido fino y homogéneo.",
},
{
  id: 4,
  nombre: "Molino eléctrico",
  precio: 50,
  categoria: "Hogar",
  descripcion:
    "Es un molino eléctrico de granos, motor de 25 HP, ideal para moler diferentes tipos de granos como maíz, trigo, café y especias. Diseñado para ofrecer un molido uniforme y eficiente.",
},
{
  id: 5,
  nombre: "Plaguicida",
  precio: 15,
  categoria: "Hogar",
  descripcion:
    "Plaguicida líquido en presentación de atomizador, especialmente formulado para eliminar cucarachas y otras plagas domésticas de manera rápida y efectiva.",
}];

// Precargar los valores en los campos del formulario cuando la página se carga
window.addEventListener('DOMContentLoaded', function() {
  const selectedProduct = product[0]; // Por ejemplo, seleccionamos el primer producto

  document.getElementById('nombre').value = selectedProduct.nombre;
  document.getElementById('precio').value = selectedProduct.precio;
  document.getElementById('descripcion').value = selectedProduct.descripcion;

  // Precargar la categoría en el select
  const categoriaSelect = document.getElementById('categoria');

  // Establecer 'Hogar' como categoría predeterminada
  categoriaSelect.value = selectedProduct.categoria || "Hogar";  // Si el producto no tiene categoría, se selecciona "Hogar" por defecto

  // Si quieres asegurar que la opción 'Hogar' se seleccione, puedes hacer esto:
  const optionToSelect = [...categoriaSelect.options].find(
    (option) => option.value === selectedProduct.categoria
  );

  if (optionToSelect) {
    optionToSelect.selected = true;
  }
});

// Evento del botón de agregar
document.getElementById('btnAgregar').addEventListener('click', function() {
  // Obtén los valores de los campos
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const categoria = document.getElementById('categoria').value;
  const descripcion = document.getElementById('descripcion').value;

  // Limpia los mensajes de error previos
  document.getElementById('errorNombre').innerText = "";
  document.getElementById('errorPrecio').innerText = "";
  document.getElementById('errorCategoria').innerText = "";

  // Validación de campos
  let isValid = true;

  if (nombre === "") {
      document.getElementById('errorNombre').innerText = "Por favor, completa este campo.";
      isValid = false;
  }

  if (precio === "" || isNaN(precio) || precio <= 0) {
      document.getElementById('errorPrecio').innerText = "El precio debe ser un número válido.";
      isValid = false;
  }

   else {
      document.getElementById('errorCategoria').innerText = ""; // Limpia el error si la categoría es válida
  }

  // Si los campos son válidos, abre el modal
  if (isValid) {
      const modal = new bootstrap.Modal(document.getElementById('Agregado'));
      modal.show();

      // Limpiar los campos del formulario después de abrir el modal
      document.getElementById('nombre').value = "";
      document.getElementById('precio').value = "";
      document.getElementById('descripcion').value = "";

      // No limpiar el campo de categoría
  }
});

// Restricción de solo números y un punto decimal en el campo 'precio'
document.getElementById("precio").addEventListener("keypress", function(event) {
  const input = event.target.value;
  const dotCount = (input.match(/\./g) || []).length;

  if (!/[0-9.]/.test(event.key) || (event.key === '.' && dotCount >= 1)) {
      event.preventDefault();
  }
});

// Restricción de solo letras y espacios en el campo 'nombre'
document.getElementById("nombre").addEventListener("keypress", function(event) {
  if (!/^[a-zA-Z\s]*$/.test(event.key)) {
      event.preventDefault();
  }
});

// Validación dinámica del campo de categoría
const categoriaSelect = document.getElementById('categoria');
categoriaSelect.addEventListener('change', function() {
  if (this.value) {
      document.getElementById('errorCategoria').innerText = ""; // Limpia el error si hay selección
  }
});
