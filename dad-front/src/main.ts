// Archivo principal - Inicialización y eventos
const API_CONFIG = {
  PRODUCTOS: "https://api.productos.com",
  ALMACEN: "https://api.almacen.com",
  VENTAS: "https://api.ventas.com",
  DISEÑOS: "https://api.diseños.com",
}

const dashboardController = {
  loadDashboard: async () => {
    console.log("Loading dashboard data...")
  },
}

const productosController = {
  loadProductos: async () => {
    console.log("Loading productos data...")
  },
  createProducto: async (data) => {
    console.log("Creating producto:", data)
  },
  updateProducto: async (id, data) => {
    console.log("Updating producto with id:", id, "data:", data)
  },
  buscarProductos: async (searchTerm) => {
    console.log("Searching productos for:", searchTerm)
  },
}

const ventasController = {
  loadVentas: async () => {
    console.log("Loading ventas data...")
  },
  createVenta: async (data) => {
    console.log("Creating venta:", data)
  },
  updateVenta: async (id, data) => {
    console.log("Updating venta with id:", id, "data:", data)
  },
  buscarVentas: async (searchTerm) => {
    console.log("Searching ventas for:", searchTerm)
  },
  editVenta: (id) => {
    console.log("Editing venta with id:", id)
  },
}

const almacenController = {
  loadInventario: async () => {
    console.log("Loading almacen data...")
  },
}

const diseñosController = {
  loadDiseños: async () => {
    console.log("Loading diseños data...")
  },
  createDiseño: async (data) => {
    console.log("Creating diseño:", data)
  },
  updateDiseño: async (id, data) => {
    console.log("Updating diseño with id:", id, "data:", data)
  },
  buscarDiseños: async (searchTerm) => {
    console.log("Searching diseños for:", searchTerm)
  },
  editDiseño: (id) => {
    console.log("Editing diseño with id:", id)
  },
}

document.addEventListener("DOMContentLoaded", async () => {
  // Inicializar controladores
  await initializeApp()

  // Configurar eventos de navegación
  setupNavigation()

  // Configurar eventos de formularios
  setupForms()

  // Configurar búsqueda
  setupSearch()

  // Cargar datos iniciales
  await loadInitialData()
})

// Inicializar aplicación
async function initializeApp() {
  try {
    // Verificar conectividad con microservicios
    await checkMicroservicesHealth()

    // Configurar interceptores de errores
    setupErrorHandling()

    console.log("Aplicación inicializada correctamente")
  } catch (error) {
    console.error("Error inicializando aplicación:", error)
    showGlobalError("Error de conectividad con los servicios")
  }
}

// Verificar salud de microservicios
async function checkMicroservicesHealth() {
  const services = [
    { name: "Productos", url: API_CONFIG.PRODUCTOS + "/health" },
    { name: "Almacén", url: API_CONFIG.ALMACEN + "/health" },
    { name: "Ventas", url: API_CONFIG.VENTAS + "/health" },
    { name: "Diseños", url: API_CONFIG.DISEÑOS + "/health" },
  ]

  const healthChecks = await Promise.allSettled(
    services.map((service) =>
      fetch(service.url, { method: "GET", timeout: 5000 })
        .then((response) => ({ name: service.name, status: response.ok }))
        .catch(() => ({ name: service.name, status: false })),
    ),
  )

  healthChecks.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(`${result.value.name}: ${result.value.status ? "✅" : "❌"}`)
    }
  })
}

// Configurar navegación
function setupNavigation() {
  const menuItems = document.querySelectorAll(".menu-item")
  const contentSections = document.querySelectorAll(".content-section")

  menuItems.forEach((item) => {
    item.addEventListener("click", async function (e) {
      e.preventDefault()

      // Actualizar UI de navegación
      menuItems.forEach((mi) => mi.classList.remove("active"))
      this.classList.add("active")

      contentSections.forEach((section) => section.classList.remove("active"))

      const sectionId = this.getAttribute("data-section")
      document.getElementById(sectionId).classList.add("active")

      // Cargar datos de la sección
      await loadSectionData(sectionId)
    })
  })
}

// Cargar datos de sección específica
async function loadSectionData(sectionId) {
  switch (sectionId) {
    case "dashboard":
      await dashboardController.loadDashboard()
      break
    case "productos":
      await productosController.loadProductos()
      break
    case "ventas":
      await ventasController.loadVentas()
      break
    case "almacen":
      await almacenController.loadInventario()
      break
    case "diseños":
      await diseñosController.loadDiseños()
      break
  }
}

// Configurar formularios
function setupForms() {
  // Formulario de productos
  const productoForm = document.querySelector("#productoModal form")
  if (productoForm) {
    productoForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData)

      const editId = document.getElementById("productoModal").dataset.editId

      if (editId) {
        await productosController.updateProducto(editId, data)
      } else {
        await productosController.createProducto(data)
      }
    })
  }

  // Formulario de ventas
  const ventaForm = document.querySelector("#ventaModal form")
  if (ventaForm) {
    ventaForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData)

      const editId = document.getElementById("ventaModal").dataset.editId

      if (editId) {
        await ventasController.updateVenta(editId, data)
      } else {
        await ventasController.createVenta(data)
      }
    })
  }

  // Formulario de diseños
  const diseñoForm = document.querySelector("#diseñoModal form")
  if (diseñoForm) {
    diseñoForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData)

      const editId = document.getElementById("diseñoModal").dataset.editId

      if (editId) {
        await diseñosController.updateDiseño(editId, data)
      } else {
        await diseñosController.createDiseño(data)
      }
    })
  }
}

// Configurar búsqueda
function setupSearch() {
  const searchInputs = document.querySelectorAll(".search-input")

  searchInputs.forEach((input) => {
    let timeoutId

    input.addEventListener("input", (e) => {
      clearTimeout(timeoutId)

      timeoutId = setTimeout(async () => {
        const section = e.target.closest(".content-section").id
        const searchTerm = e.target.value

        switch (section) {
          case "productos":
            await productosController.buscarProductos(searchTerm)
            break
          case "ventas":
            await ventasController.buscarVentas(searchTerm)
            break
          case "diseños":
            await diseñosController.buscarDiseños(searchTerm)
            break
        }
      }, 300) // Debounce de 300ms
    })
  })
}

// Cargar datos iniciales
async function loadInitialData() {
  // Cargar dashboard por defecto
  await dashboardController.loadDashboard()
}

// Configurar manejo de errores
function setupErrorHandling() {
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Error no manejado:", event.reason)
    showGlobalError("Ha ocurrido un error inesperado")
  })
}

// Mostrar error global
function showGlobalError(message) {
  // Crear toast de error o modal
  const errorDiv = document.createElement("div")
  errorDiv.className = "global-error"
  errorDiv.textContent = message
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    z-index: 9999;
  `

  document.body.appendChild(errorDiv)

  setTimeout(() => {
    errorDiv.remove()
  }, 5000)
}

// Funciones globales para compatibilidad
window.editVenta = (id) => ventasController.editVenta(id)
window.editProducto = (id) => productosController.editProducto(id)
window.editDiseño = (id) => diseñosController.editDiseño(id)
