import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-draw-write-modal',
  templateUrl: './draw-write-modal.component.html',
  styleUrls: ['./draw-write-modal.component.scss'],
})
export class DrawWriteModalComponent implements OnInit {
  @Input() patientId: string = ''; // Get patient ID from parent
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private drawing = false;

  ngOnInit(): void {
    this.initializeCanvas();
  }

  initializeCanvas(): void {
    this.canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    // Mouse events for drawing
    this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.stopDrawing());
    this.canvas.addEventListener('mouseleave', () => this.stopDrawing());

    // Load existing data if available
    this.loadDrawing();
  }

  startDrawing(event: MouseEvent): void {
    this.drawing = true;
    this.context.beginPath();
    this.context.moveTo(event.offsetX, event.offsetY);
  }

  draw(event: MouseEvent): void {
    if (!this.drawing) return;
    this.context.lineTo(event.offsetX, event.offsetY);
    this.context.strokeStyle = '#000';
    this.context.lineWidth = 3;
    this.context.stroke();
  }

  stopDrawing(): void {
    this.drawing = false;
    this.context.closePath();
  }

  saveDrawing(): void {
    const imageData = this.canvas.toDataURL();
    localStorage.setItem(`drawing_${this.patientId}`, imageData);
    alert('Drawing saved successfully!');
  }

  loadDrawing(): void {
    const savedData = localStorage.getItem(`drawing_${this.patientId}`);
    if (savedData) {
      const image = new Image();
      image.onload = () => this.context.drawImage(image, 0, 0);
      image.src = savedData;
    }
  }
}
