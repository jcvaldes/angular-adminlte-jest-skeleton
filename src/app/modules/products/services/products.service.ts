import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { FileItem } from '@core/models/file-item';
import { Product } from '../models/product.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private folderImgs = 'img';
  private productCollection: AngularFirestoreCollection<Product>;
  constructor(private db: AngularFirestore) {
    this.productCollection = db.collection<Product>('products');
  }

  getProducts(): Observable<Product[]> {
    return this.productCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  uploadProductFirebase(images: FileItem[], product: Product) {
    const storage = getStorage();
    for (const image of images) {
      let fileName = product.name.toLocaleLowerCase();
      fileName = fileName.replace(/ /g, '-');
      // fileName = `${fileName}.${image.file.name.split('.').pop()}`;
      const storageRef = ref(storage, `${this.folderImgs}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image['file']);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => {
          console.error('error al subir archivo');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            product.imgUrl = downloadURL;
            this.saveProduct(product);
          });
        }
      );
    }
  }

  async saveProduct(product: Product): Promise<void> {
    try {
      const resp = await this.db.collection('products').add(product);
      if (resp) {
        Swal.fire({
          icon: 'success',
          title: 'El producto se guardó correctamente',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.value) {
            $('#productModal').modal('hide');
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  deleteProduct(product: Product) {
    const storage = getStorage();
    let fileName = product.name.toLocaleLowerCase();
    fileName = fileName.replace(/ /g, '-');

    const storageRef = ref(storage, `${this.folderImgs}/${fileName}`);
    deleteObject(storageRef)
      .then((resp) => {
        debugger;
        return this.productCollection.doc(product.id).delete();
      })
      .then((resp) => {
        debugger;
        Swal.fire(
          'Eliminado',
          'El producto se eliminó correctamente',
          'success'
        );
      })
      .catch((err) => {
        Swal.fire('Atención', 'El producto no se eliminó', 'error');
      });
  }
}
