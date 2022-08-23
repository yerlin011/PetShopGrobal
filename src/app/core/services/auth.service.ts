import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AuthService {
  user$ = this.afAuth.authState;

  constructor(
    private afAuth: AngularFireAuth,
    public toastController: ToastController
  ) {}

  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.toastError(error);
      throw new Error(error);
    }
  }

  async logout() {
    return await this.afAuth.signOut().catch((error) => {
      this.toastError(error);
      throw new Error(error);
    });
  }

  async register(email: string, password: string) {
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        this.toastError(error);
        throw new Error(error);
      });
  }

  async requestPassword(email: string) {
    return await this.afAuth.sendPasswordResetEmail(email).catch((error) => {
      this.toastError(error);
      throw new Error(error);
    });
  }

  async resetPassword(passsword: string, oobCode: string) {
    return await this.afAuth
      .confirmPasswordReset(oobCode, passsword)
      .catch((error) => {
        this.toastError(error);
        throw new Error(error);
      });
  }

  async toastError(error: any) {
    const toast = await this.toastController.create({
      message:
        (error.message as string).split(': ')[1] || 'Algo malo ha ocurrido',
      duration: 4000,
      color: 'danger',
    });
    toast.present();
  }
}
