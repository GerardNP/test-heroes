import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'heroes',
        loadComponent: () => import('./heroes/heroes.component'),
        children: [
            {
                path: '',
                title: 'Héroes',
                loadComponent: () => import('./heroes/pages/heroes-list/heroes-list.component')
            },
            {
                path: 'nuevo-heroe',
                title: 'Nuevo Héroe',
                loadComponent: () => import('./heroes/pages/hero-managament/hero-managament.component')
            },
            {
                path: 'editar-heroe/:id',
                title: 'Editar Héroe',
                loadComponent: () => import('./heroes/pages/hero-managament/hero-managament.component')
            },
        ]
    },
    {
        path: '**',
        redirectTo: '/heroes',
    },
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    }
];
