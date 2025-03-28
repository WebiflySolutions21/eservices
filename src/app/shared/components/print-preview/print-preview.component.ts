import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss'],
})
export class PrintPreviewComponent {
  @Input() printContent: string = '';
  selectedPrintSize: string = 'A4';

  updatePrintSize() {
    const printArea = document.getElementById('printContent');
    if (printArea) {
      printArea.className = 'print-area ' + this.selectedPrintSize;
    }
  }

  triggerPrint() {
    window.print();
  }
}
