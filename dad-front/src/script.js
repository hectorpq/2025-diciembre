// Navigation
document.addEventListener("DOMContentLoaded", () => {
  // Menu navigation
  const menuItems = document.querySelectorAll(".menu-item")
  const contentSections = document.querySelectorAll(".content-section")

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all menu items
      menuItems.forEach((mi) => mi.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")

      // Hide all content sections
      contentSections.forEach((section) => section.classList.remove("active"))

      // Show selected section
      const sectionId = this.getAttribute("data-section")
      document.getElementById(sectionId).classList.add("active")
    })
  })

  // Initialize form calculations
  initializeFormCalculations()

  // Set current date for date inputs
  setCurrentDate()
})

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.classList.remove("active")
  document.body.style.overflow = "auto"

  // Reset form
  const form = modal.querySelector("form")
  if (form) {
    form.reset()
    updateTotals() // Reset calculations
  }
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    const modalId = e.target.id
    closeModal(modalId)
  }
})

// Tab functionality
function showTab(tabName) {
  const tabButtons = document.querySelectorAll(".tab-button")
  tabButtons.forEach((btn) => btn.classList.remove("active"))

  event.target.classList.add("active")

  // Here you would filter the table content based on the tab
  console.log("Showing tab:", tabName)
}

// Form calculations for sales
function initializeFormCalculations() {
  const cantidadInput = document.getElementById("cantidad")
  const precioInput = document.getElementById("precio")
  const descuentoInput = document.getElementById("descuento")

  if (cantidadInput && precioInput && descuentoInput) {
    ;[cantidadInput, precioInput, descuentoInput].forEach((input) => {
      input.addEventListener("input", updateTotals)
    })
  }
}

function updateTotals() {
  const cantidad = Number.parseFloat(document.getElementById("cantidad")?.value) || 0
  const precio = Number.parseFloat(document.getElementById("precio")?.value) || 0
  const descuento = Number.parseFloat(document.getElementById("descuento")?.value) || 0

  const subtotal = cantidad * precio
  const total = subtotal - descuento

  // Update display
  const subtotalElement = document.getElementById("subtotal")
  const descuentoTotalElement = document.getElementById("descuentoTotal")
  const totalElement = document.getElementById("total")

  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`
  if (descuentoTotalElement) descuentoTotalElement.textContent = `-$${descuento.toFixed(2)}`
  if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`
}

// Set current date
function setCurrentDate() {
  const today = new Date().toISOString().split("T")[0]
  const dateInputs = document.querySelectorAll('input[type="date"]')
  dateInputs.forEach((input) => {
    if (!input.value) {
      input.value = today
    }
  })
}

// Edit functions
function editVenta(id) {
  console.log("Editing venta:", id)
  // Here you would populate the form with existing data
  openModal("ventaModal")

  // Example of populating form (you would get this data from your backend)
  const ventaData = {
    V001: { cliente: "Juan Pérez", producto: "Diseño Logo", cantidad: 1, precio: 250 },
    V002: { cliente: "María García", producto: "Camiseta Personalizada", cantidad: 5, precio: 25 },
    V003: { cliente: "Carlos López", producto: "Banner Publicitario", cantidad: 2, precio: 90 },
  }

  const data = ventaData[id]
  if (data) {
    document.getElementById("cliente").value = data.cliente
    document.getElementById("producto").value = data.producto
    document.getElementById("cantidad").value = data.cantidad
    document.getElementById("precio").value = data.precio
    updateTotals()
  }
}

function editProducto(id) {
  console.log("Editing producto:", id)
  openModal("productoModal")

  // Example data population
  const productoData = {
    P001: { nombre: "Camiseta Básica", categoria: "Textil", precio: 25, stock: 150 },
    P002: { nombre: "Taza Personalizada", categoria: "Promocional", precio: 15, stock: 80 },
    P003: { nombre: "Banner Vinilo", categoria: "Publicidad", precio: 45, stock: 25 },
  }

  const data = productoData[id]
  if (data) {
    document.getElementById("nombreProducto").value = data.nombre
    document.getElementById("categoria").value = data.categoria
    document.getElementById("precioVenta").value = data.precio
    document.getElementById("stockActual").value = data.stock
  }
}

function editDiseño(id) {
  console.log("Editing diseño:", id)
  openModal("diseñoModal")

  // Example data population
  const diseñoData = {
    D001: { nombre: "Logo Corporativo", cliente: "Empresa ABC", tipo: "Logo", estado: "Completado" },
    D002: { nombre: "Flyer Promocional", cliente: "Tienda XYZ", tipo: "Flyer", estado: "En Revisión" },
    D003: { nombre: "Banner Web", cliente: "Startup Tech", tipo: "Banner", estado: "En Proceso" },
  }

  const data = diseñoData[id]
  if (data) {
    document.getElementById("nombreDiseño").value = data.nombre
    document.getElementById("clienteDiseño").value = data.cliente
    document.getElementById("tipoDiseño").value = data.tipo
    document.getElementById("estadoDiseño").value = data.estado
  }
}

// Form submissions
document.addEventListener("submit", (e) => {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)

  console.log("Form submitted:", data)

  // Here you would send the data to your backend
  alert("Datos guardados correctamente")

  // Close the modal
  const modal = form.closest(".modal")
  if (modal) {
    closeModal(modal.id)
  }
})

// Search functionality
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("search-input")) {
    const searchTerm = e.target.value.toLowerCase()
    const table = e.target.closest(".content-section").querySelector(".data-table tbody")

    if (table) {
      const rows = table.querySelectorAll("tr")
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase()
        row.style.display = text.includes(searchTerm) ? "" : "none"
      })
    }
  }
})

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
  const sidebar = document.querySelector(".sidebar")
  sidebar.classList.toggle("open")
}

// Add mobile menu button if needed
if (window.innerWidth <= 768) {
  const header = document.createElement("div")
  header.className = "mobile-header"
  header.innerHTML = `
        <button onclick="toggleMobileMenu()" class="mobile-menu-btn">
            <i class="fas fa-bars"></i>
        </button>
        <h1>Gestión Empresarial</h1>
    `
  document.body.insertBefore(header, document.body.firstChild)
}
