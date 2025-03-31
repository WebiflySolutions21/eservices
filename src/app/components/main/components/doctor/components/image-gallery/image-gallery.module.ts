import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageGalleryRoutingModule } from './image-gallery-routing.module';
import { ImageGalleryComponent } from './image-gallery.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImageGalleryComponent
  ],
  imports: [
    CommonModule,
    ImageGalleryRoutingModule,
    FormsModule
  ]
})
export class ImageGalleryModule { }
