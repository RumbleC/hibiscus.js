import {NgModule} from '@angular/core';

import {ImageUploadComponent} from './image-upload.component';
import {CommonModule} from '@angular/common';
import {AlertBoxModule} from '../alert-box/alert-box.module';
import {DraggableModule} from '../draggable/draggable.module';
import {ViewImageModalComponent} from './view-image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    AlertBoxModule,
    DraggableModule
  ],
  exports: [
    ImageUploadComponent,
    ViewImageModalComponent
  ],
  providers: [],
  declarations: [
    ImageUploadComponent,
    ViewImageModalComponent
  ],

  entryComponents: [ViewImageModalComponent]
})
export class ImageUploadModule {
}
