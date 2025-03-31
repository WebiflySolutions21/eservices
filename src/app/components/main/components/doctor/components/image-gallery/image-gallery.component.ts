import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import ImageEditor from 'tui-image-editor';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('tuiImageEditor', { static: true })
  imageEditorContainer!: ElementRef;
  editorInstance: any;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeImageEditor('/assets/images/header/doctor.jpeg'); // Load default image
  }

  initializeImageEditor(imagePath: string): void {
    this.editorInstance = new ImageEditor(
      this.imageEditorContainer.nativeElement,
      {
        includeUI: {
          loadImage: {
            path: imagePath,
            name: 'SampleImage',
          },
          theme: {},
          menu: [
            'crop',
            'flip',
            'rotate',
            'draw',
            'shape',
            'icon',
            'text',
            'mask',
            'filter',
          ],
          initMenu: 'filter',
          uiSize: {
            width: '100%',
            height: '100%',
          },
          menuBarPosition: 'bottom',
        },
        cssMaxWidth: 1000,
        cssMaxHeight: 450,
        usageStatistics: false,
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        // Instead of re-initializing, load the new image
        this.editorInstance
          .loadImageFromURL(this.imageUrl, 'Uploaded Image')
          .then(() => {
            console.log('Image loaded successfully');
          })
          .catch((error: any) => {
            console.error('Error loading image:', error);
          });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addText(): void {
    this.editorInstance.addText('Sample Text', {
      styles: {
        fill: '#000000',
        fontSize: 50,
      },
      position: {
        x: 250,
        y: 100,
      },
    });
  }

  changeTextColor(color: string): void {
    const activeObject = this.editorInstance.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      this.editorInstance.changeTextStyle(activeObject.id, { fill: color });
    }
  }

  saveImage(): void {
    const dataURL = this.editorInstance.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited-image.png';
    link.click();
  }
}
