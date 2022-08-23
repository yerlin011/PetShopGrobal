import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Idea } from '../../idea.interface';

@Injectable()
export class IdeasService {
  constructor(
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {}

  get collection() {
    return this.firestore.collection<Idea>('ideas');
  }

  getAll(): Observable<Idea[]> {
    return this.collection.snapshotChanges().pipe(
      map((docActions) =>
        docActions.map((doc) => ({
          ...doc.payload.doc.data(),
          id: doc.payload.doc.id,
        }))
      )
    );
  }

  getOne(id: string): Observable<Idea> {
    return this.collection
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((doc) => ({
          ...doc.payload.data(),
          id: doc.payload.id,
        }))
      );
  }

  async create(idea: Idea) {
    try {
      const random1to5 = Math.floor(Math.random() * (5 - 1 + 1) + 1);

      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const cover = `/assets/images/${random1to5}.jpeg`;

      return await this.collection.add({
        ...idea,
        createdAt,
        updatedAt,
        cover,
      });
    } catch (error) {
      this.toastError(error || 'No tienes permisos para grabar');
    }
  }

  async update(id: string, idea: Partial<Idea>) {
    try {
      await this.collection.doc(id).update(idea);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    try {
      await this.collection.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async toastError(error: any) {
    const toast = await this.toastController.create({
      message:
        (error.message as string).split(': ')[1] ||
        error ||
        'Algo malo ha ocurrido',
      duration: 4000,
      color: 'danger',
    });
    toast.present();
  }
}
