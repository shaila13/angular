import { Component } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Instagram } from '@ionic-native/instagram/ngx';

@Component({
  selector: 'app-picker-page',
  templateUrl: './picker-page.page.html',
  styleUrls: ['./picker-page.page.scss'],
})
export class PickerPagePage {

// tslint:disable-next-line:variable-name
picked_image: string;
// tslint:disable-next-line:variable-name
has_picked_image = false;
caption: string;
readonly DEFAULT_IMAGE: string = 'http://placehold.it/500x500';

  constructor(private imagePicker: ImagePicker, private instagram: Instagram) {
    this.picked_image = this.DEFAULT_IMAGE;
  }

pickImage() {
// tslint:disable-next-line:prefer-const
let options = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      quality: 50,
      outputType: 1
    };

// tslint:disable-next-line:align
this.imagePicker.getPictures(options).then((results) => {
      this.picked_image = 'data:image/jpeg;base64,' + results[0];
      this.has_picked_image = true;
    }, (err: any) => {
      console.log(err);
      this.has_picked_image = false;
    });

  }

shareImage() {
    this.instagram.share(this.picked_image, this.caption)
      .then(() => {
        this.picked_image = this.DEFAULT_IMAGE;
        this.has_picked_image = false;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
