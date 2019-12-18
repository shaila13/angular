import { Component } from '@angular/core';
import { SelectSearchableComponent } from 'ionic-select-searchable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // const searchbar = document.querySelector('ion-searchbar');
  // const items = Array.from(document.querySelector('ion-list').children);
  // searchbar.addEventListener('ionInput', handleInput);

  constructor() {}


 /* 
  function handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }
*/
}
