import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { ProductoComponent } from './componentes/producto/producto.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'home'
    },
    {
        path: 'cliente',
        component: ClienteComponent,
        title: 'cliente'
    },
    {
        path: 'producto',
        component: ProductoComponent,
        title: 'producto'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
