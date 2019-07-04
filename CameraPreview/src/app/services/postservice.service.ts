import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PostserviceService {


constructor(private firestore: AngularFireStorage) { }

  post(formDataToUpload: FormData) {
     // Upload image
    this.firestore.upload('/upload', formDataToUpload);
    alert('Send');
}
}
