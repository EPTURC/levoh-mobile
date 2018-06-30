import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmationTaskPage } from './confirmation-task';

@NgModule({
  declarations: [
    ConfirmationTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmationTaskPage),
  ],
})
export class ConfirmationTaskPageModule {}
