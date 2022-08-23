import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...AuthRoutingModule.components],
  imports: [CommonModule, IonicModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
