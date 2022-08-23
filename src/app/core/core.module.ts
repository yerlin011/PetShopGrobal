import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeasService } from './services/ideas.service';
import { AuthService } from './services/auth.service';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule],
  providers: [IdeasService, AuthService],
})
export class CoreModule {}
