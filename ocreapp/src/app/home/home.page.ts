import { Component } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { NgProgress } from '@ngx-progressbar/core';
import Tesseract from 'tesseract.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedImage: string;
  imageText: string;

constructor(private navCtrl: NavController, private camera: Camera,
            private actionSheetCtrl: ActionSheetController,
            private progress: NgProgress) {
  }

selectSource() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
 
getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    });
  }

recognizeImage() {
    Tesseract.recognize(this.selectedImage)
    .progress(message => {
      if (message.status === 'recognizing text') {
      this.progress.set(message.progress);
      }
    })
    .catch(err => console.error(err))
    .then(result => {
      this.imageText = result.text;
    })
    .finally(resultOrError => {
      this.progress.complete();
    });
  }

}
