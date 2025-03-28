import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() hospitalName!: string;
@Input() headingRoutes: { title: string; path: string }[] = [];
isDropdownOpen = false;
isMenuOpen = false;
isMobileView = window.innerWidth <= 768; // Detect if it's a mobile view
@Output() titleClick = new EventEmitter<{ title: string; path: string }>();

ngOnInit() {
  console.log(this.headingRoutes);

  // Listen to window resize to update isMobileView
  window.addEventListener("resize", () => {
    this.isMobileView = window.innerWidth <= 768;
  });
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

onTitleClick(data: { title: string; path: string }) {
  this.titleClick.emit(data);
  this.isMenuOpen = false; // Close menu after clicking
  this.isDropdownOpen = false; // Close dropdown after selection
}

}
