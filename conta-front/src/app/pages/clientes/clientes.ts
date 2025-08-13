import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  mensaje: string = '';

  clienteForm: any = {
    id: null,
    nombre: '',
    email: '',
    telefono: ''
  };

  private apiUrl = 'http://localhost:8085/clientes';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.clientes = data;
    });
  }

  guardarCliente() {
    const url = this.modoEdicion
      ? `${this.apiUrl}/${this.clienteForm.id}`
      : this.apiUrl;

    const request = this.modoEdicion
      ? this.http.put(url, this.clienteForm)
      : this.http.post(url, this.clienteForm);

    request.subscribe(() => {
      this.cargarClientes();
      this.cerrarModal();
      this.mostrarMensaje(this.modoEdicion ? 'Cliente actualizado' : 'Cliente registrado');
    });
  }

  editarCliente(cliente: any) {
    this.clienteForm = { ...cliente };
    this.modoEdicion = true;
    this.mostrarFormulario = true;
  }

  eliminarCliente(id: number) {
    if (confirm('¿Deseas eliminar este cliente?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.cargarClientes();
        this.mostrarMensaje('Cliente eliminado');
      });
    }
  }

  cerrarModal() {
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.clienteForm = {
      id: null,
      nombre: '',
      email: '',
      telefono: ''
    };
  }

  mostrarMensaje(texto: string) {
    this.mensaje = texto;
    setTimeout(() => this.mensaje = '', 3000);
  }
}
