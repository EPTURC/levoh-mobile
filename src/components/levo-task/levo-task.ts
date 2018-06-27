import { Component } from '@angular/core';

/**
 * Generated class for the LevoTaskComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'levo-task',
  templateUrl: 'levo-task.html'
})
export class LevoTaskComponent {

  text: string;

  constructor() {
    console.log('Hello LevoTaskComponent Component');
    this.text = 'Hello World';
  }

}
