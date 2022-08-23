import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLogoutGuard } from './core/guards/is-logout.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./mascotas/mascotas.module').then((m) => m.MascotasPageModule),
  },
  {
    path: 'create',
    canActivate: [IsLogoutGuard],
    loadChildren: () =>
      import('./create-idea/create-idea.module').then(
        (m) => m.CreateIdeaPageModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'idea/:ideaId',
    loadChildren: () =>
      import('./idea/idea.module').then((m) => m.IdeaPageModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}