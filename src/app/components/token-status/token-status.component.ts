import { Component } from '@angular/core';
import { QueueService } from '../../core/services/queue.service';

@Component({
  selector: 'app-token-status',
  templateUrl: './token-status.component.html',
  styleUrls: ['./token-status.component.scss']
})
export class TokenStatusComponent {
  tokenNumber: number | null = null;
  tokenStatus: any = null;
  errorMessage: string = '';

  constructor(private queueService: QueueService) {}

  checkTokenStatus(): void {
    if (this.tokenNumber) {
      this.queueService.getTokenStatus(this.tokenNumber).subscribe(
        (status) => {
          if (status) {
            this.tokenStatus = status;
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Invalid token number or not found!';
            this.tokenStatus = null;
          }
        }
      );
    }
  }
}
