import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import ImageEditor from 'tui-image-editor';

interface Image {
  name: string;
  url: string;
}

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('tuiImageEditor', { static: false })
  imageEditorContainer!: ElementRef;
  editorInstance: any;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  images: Image[] = [];

  ngOnInit(): void {
    this.loadImagesFromStorage();
  }

  ngAfterViewInit(): void {}

  loadImagesFromStorage(): void {
    const storedImages = localStorage.getItem('galleryImages');
    if (storedImages) {
      this.images = JSON.parse(storedImages);
    }
  }

  saveImagesToStorage(): void {
    console.log(this.images)
    localStorage.setItem('galleryImages', JSON.stringify(this.images));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const newImage: Image = {
          name: this.selectedFile!.name,
          url: e.target.result,
        };
        this.images.push(newImage);
        this.saveImagesToStorage();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  openEditor(image: Image): void {
    this.imageUrl = image.url;
    setTimeout(() => {
      this.initializeImageEditor(image.url);
    }, 0);
  }

  initializeImageEditor(imagePath: string): void {
    if (this.editorInstance) {
      this.editorInstance.destroy();
    }
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

  saveEditedImage(): void {
    const dataURL = this.editorInstance.toDataURL();
    const editedImage: Image = {
      name: 'edited-' + Date.now(),
      url: dataURL,
    };
    this.images.push(editedImage);
    this.saveImagesToStorage();
    alert('Image saved to gallery!');
  }
}
