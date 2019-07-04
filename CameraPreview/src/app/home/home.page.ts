import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PostserviceService } from '../services/postservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: string = null;

  constructor(private camera: Camera, private postService: PostserviceService) {}

  takePhoto() {

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 300,
      targetHeight: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    };


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
  };

  this.camera.getPicture(options).then((imageData) => {
    this.image = 'data:image/jpeg;base64,' + imageData;

  }, (err) => {
    console.log('ERROR ' + err);
  });

}
cropped() {
  const options: CameraOptions = {
    quality: 100,
    targetWidth: 300,
    targetHeight: 500,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false,
    allowEdit: true
  };

  this.camera.getPicture(options).then((imageData) => {
    this.image = 'data:image/jpeg;base64,' + imageData;

  }, (err) => {
    console.log('ERROR ' + err);
  });
}

sendPicture( ) {
  const random = Math.floor(Math.random() * 1000);
  const fileName = 'image_' + random + '.jpg';

  const formDataToUpload = new FormData();
  const blob = this.dataURItoBlob(this.image);
  alert(blob);
  formDataToUpload.append('image', blob, fileName);
  alert(formDataToUpload);
  this.postService.post(formDataToUpload);

}

private dataURItoBlob(dataURI: any) {

  // convert base64/URLEncoded data component to raw binary data held in a string
              let byteString: string;
              if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                  byteString = atob(dataURI.split(',')[1]);
              } else {
                  byteString = unescape(dataURI.split(',')[1]);
              }
              // separate out the mime component
              const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
              // write the bytes of the string to a typed array

              const ia = new Uint8Array(byteString.length);
              for (let i = 0; i < byteString.length; i++) {
                  ia[i] = byteString.charCodeAt(i);
              }
              return new Blob([ia], {type: mimeString});
}
}
