import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VentasComponent implements OnInit {

  productos: any[] = [];
  clientes: any[] = [];
  ventas: any[] = [];
  mensaje: string = '';
  mostrarFormulario = false;

  nuevaVenta: any = {
    clienteId: null,
    clienteNombre: '',
    clienteEmail: '',
    clienteTelefono: '',
    fecha: new Date().toISOString(),
    total: 0,
    detalles: []
  };

  productoSeleccionado: any = {
    idProducto: null,
    cantidad: 1,
    descuento: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarClientes();
    this.cargarVentas(); // si tienes endpoint para obtener ventas
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarModal() {
    this.mostrarFormulario = false;
    this.reiniciarFormulario();
  }

  cargarProductos() {
    this.http.get<any[]>('http://localhost:8085/productos')
      .subscribe(data => this.productos = data);
  }

  cargarClientes() {
    this.http.get<any[]>('http://localhost:8085/clientes')
      .subscribe(data => this.clientes = data);
  }

  cargarVentas() {
    this.http.get<any[]>('http://localhost:8085/api/ventas')
      .subscribe(data => this.ventas = data);
  }

  onClienteSeleccionado() {
    const cliente = this.clientes.find(c => c.id === this.nuevaVenta.clienteId);
    if (cliente) {
      this.nuevaVenta.clienteNombre = cliente.nombre;
      this.nuevaVenta.clienteEmail = cliente.email;
      this.nuevaVenta.clienteTelefono = cliente.telefono;
    } else {
      this.nuevaVenta.clienteNombre = '';
      this.nuevaVenta.clienteEmail = '';
      this.nuevaVenta.clienteTelefono = '';
    }
  }

  agregarDetalle() {
    const prod = this.productos.find(p => p.id === this.productoSeleccionado.idProducto);
    if (!prod) {
      this.mensaje = '⚠️ Producto no válido.';
      return;
    }

    const cantidad = +this.productoSeleccionado.cantidad;
    const precio = +prod.precioUnitario;
    const descuento = +this.productoSeleccionado.descuento || 0;

    const subtotal = cantidad * precio;
    const impuesto = subtotal * 0.18;
    const totalItem = subtotal + impuesto - descuento;

    this.nuevaVenta.detalles.push({
      productoId: prod.id,
      descripcion: prod.nombre,
      cantidad,
      precioUnitario: precio,
      subtotal,
      impuesto,
      descuento,
      totalItem
    });

    this.calcularTotal();
    this.limpiarProducto();
  }

  eliminarDetalle(index: number) {
    this.nuevaVenta.detalles.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal() {
    this.nuevaVenta.total = this.nuevaVenta.detalles.reduce((sum: number, d: any) => sum + d.totalItem, 0);
  }

  limpiarProducto() {
    this.productoSeleccionado = {
      idProducto: null,
      cantidad: 1,
      descuento: 0
    };
  }

  registrarVenta() {
    const ventaPayload = {
      clienteId: this.nuevaVenta.clienteId,
      clienteNombre: this.nuevaVenta.clienteNombre,
      clienteEmail: this.nuevaVenta.clienteEmail,
      clienteTelefono: this.nuevaVenta.clienteTelefono,
      fecha: new Date().toISOString(),
      total: this.nuevaVenta.total,
      detalles: this.nuevaVenta.detalles.map((d: any) => ({
        productoId: d.productoId,
        descripcion: d.descripcion,
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario,
        subtotal: d.subtotal,
        impuesto: d.impuesto,
        descuento: d.descuento,
        totalItem: d.totalItem
      }))
    };

    this.http.post('http://localhost:8085/api/ventas', ventaPayload)
      .subscribe({
        next: () => {
          this.mensaje = '✅ Venta registrada con éxito.';
          this.reiniciarFormulario();
          this.cargarVentas();
        },
        error: err => {
          console.error(err);
          this.mensaje = '❌ Error al registrar venta.';
        }
      });
  }

  reiniciarFormulario() {
    this.nuevaVenta = {
      clienteId: null,
      clienteNombre: '',
      clienteEmail: '',
      clienteTelefono: '',
      fecha: new Date().toISOString(),
      total: 0,
      detalles: []
    };
    this.limpiarProducto();
    this.mostrarFormulario = false;
  }
}
