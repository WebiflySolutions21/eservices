import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../core/services/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  queue: any[] = [];
  currentToken: number = 1;

  constructor(private queueService: QueueService) {}

  ngOnInit(): void {
    this.queue = this.queueService.getQueue();
    this.queueService.getCurrentToken().subscribe(token => {
      this.currentToken = token;
    });
  }

  startQueue(): void {
    this.queueService.advanceToken();
  }
}
