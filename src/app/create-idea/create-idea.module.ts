import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateIdeaPageRoutingModule } from './create-idea-routing.module';

import { CreateIdeaPage } from './create-idea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateIdeaPageRoutingModule,
  ],
  declarations: [CreateIdeaPage],
})
export class CreateIdeaPageModule {}
