import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() confirmButtonText: string = 'Yes';
  @Input() cancelButtonText: string = 'No';
  @Input() show: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.show = false;
  }

  onCancel() {
    this.cancel.emit();
    this.show = false;
  }
}
