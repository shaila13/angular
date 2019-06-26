import { Component } from '@angular/core'; 

import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: any;
  
  constructor(private cameraPreview: CameraPreview, private camera: Camera) {}

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 300,
      targetHeight: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
   
      let flash_mode = 'off';
      this.cameraPreview.setFlashMode(flash_mode);
    
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      console.log('ERROR ' + err);
    });

}

getImage() {
  const options: CameraOptions = {
    quality: 100,
    targetWidth: 300,
    targetHeight: 500,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  }
  
  this.camera.getPicture(options).then((imageData) => {
    this.image = 'data:image/jpeg;base64,' + imageData;

  }, (err) => {
    console.log('ERROR ' + err);
  });

}
}
