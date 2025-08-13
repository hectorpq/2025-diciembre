import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Productos } from './pages/productos/productos';
import { Disenios } from './pages/disenos/disenos';
import { Almacen } from './pages/almacen/almacen';
import { Pedidos } from './pages/pedidos/pedidos';
import { Reportes } from './pages/reportes/reportes';
import { ClientesComponent } from './pages/clientes/clientes';
import { VentasComponent } from './pages/ventas/ventas';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'productos', component: Productos },
  { path: 'disenos', component: Disenios },
  { path: 'almacen', component: Almacen },
  { path: 'pedidos', component: Pedidos },
  { path: 'reportes', component: Reportes },
  { path: 'clientes', component: ClientesComponent },
  { path: 'ventas', component: VentasComponent }, // <=== Asegúrate que sea así
];
