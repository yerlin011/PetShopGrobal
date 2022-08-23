import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIdeaPage } from './create-idea.page';

const routes: Routes = [
  {
    path: '',
    component: CreateIdeaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateIdeaPageRoutingModule {}
