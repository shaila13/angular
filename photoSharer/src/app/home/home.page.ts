import { Component } from '@angular/core';
import {AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  password: string;

  readonly APP_USERNAME: string = 'me';
  readonly APP_PASSWORD: string = 'secret';

  constructor(public router: Router, public alertCtrl: AlertController) {

  }

  async login() {
    const alert = await this.alertCtrl.create({
      header: 'Login Failed',
      subHeader: 'Ohhh!!!',
      message: 'The username or password you entered is incorrect.',
      buttons: ['OK']
    });

    if (this.username === this.APP_USERNAME && this.password === this.APP_PASSWORD) {
      this.router.navigateByUrl('/picker-page');

    } else {
      await alert.present();
    }
    this.username = '';
    this.password = '';
  }



}
