import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() hospitalName!: string;
  @Input() headingRoutes: { title: string; path: string }[] = [];

  @Output() titleClick = new EventEmitter<{ title: string; path: string }>();

  ngOnInit(){
    console.log(this.headingRoutes)
  }

  onTitleClick(data: { title: string; path: string }) {
    this.titleClick.emit(data); // Emit event when clicked
  }
}
