// src/app/pages/productos/productos.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.html',
  styleUrls: ['./productos.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class Productos implements OnInit {
  productos: any[] = [];
  disenios: any[] = [];
  mostrarFormulario = false;
  modoEdicion = false;
  mensaje = '';

  nuevoProducto: any = {
    idProducto: null,
    nombreProducto: '',
    descripcion: '',
    precioUnitario: 0,
    stock: 0,
    idDisenio: null,
    nombreDisenio: ''
  };

  disenioSeleccionado: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarDisenios();
  }

  cargarProductos() {
    this.http.get<any[]>('http://localhost:8085/api/productos').subscribe(data => {
      this.productos = data;
    });
  }

  cargarDisenios() {
    this.http.get<any[]>('http://localhost:8085/api/disenos').subscribe(data => {
      this.disenios = data;
    });
  }

  seleccionarDisenio() {
    const id = this.nuevoProducto.idDisenio;
    this.disenioSeleccionado = this.disenios.find(d => d.idDisenio === +id);
    this.nuevoProducto.nombreDisenio = this.disenioSeleccionado?.nombrePrenda || '';
  }

  guardarProducto() {
    const url = this.modoEdicion
      ? `http://localhost:8085/api/productos/${this.nuevoProducto.idProducto}`
      : 'http://localhost:8085/api/productos';

    const request = this.modoEdicion
      ? this.http.put(url, this.nuevoProducto)
      : this.http.post(url, this.nuevoProducto);

    request.subscribe(() => {
      this.cargarProductos();
      this.cerrarModal();
      this.mostrarMensaje(this.modoEdicion ? 'Producto actualizado' : 'Producto creado');
    });
  }

  editarProducto(producto: any) {
    this.nuevoProducto = { ...producto };
    this.seleccionarDisenio();
    this.mostrarFormulario = true;
    this.modoEdicion = true;
  }

  eliminarProducto(id: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.http.delete(`http://localhost:8085/api/productos/${id}`).subscribe(() => {
        this.cargarProductos();
        this.mostrarMensaje('Producto eliminado');
      });
    }
  }

  cerrarModal() {
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.disenioSeleccionado = null;
    this.nuevoProducto = {
      idProducto: null,
      nombreProducto: '',
      descripcion: '',
      precioUnitario: 0,
      stock: 0,
      idDisenio: null,
      nombreDisenio: ''
    };
  }

  mostrarMensaje(texto: string) {
    this.mensaje = texto;
    setTimeout(() => this.mensaje = '', 3000);
  }
  mostrarMaterialesDelDisenio() {
    const disenio = this.disenios.find(d => d.idDisenio === this.nuevoProducto.idDisenio);
    if (disenio) {
      this.disenioSeleccionado = disenio;
    } else {
      this.disenioSeleccionado = null;
    }
  }

}
