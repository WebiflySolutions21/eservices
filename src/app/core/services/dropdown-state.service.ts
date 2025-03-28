import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DropdownStateService {
  private activeDropdownId: string | null = null;

  setActiveDropdown(dropdownId: string | null) {
    this.activeDropdownId = dropdownId;
  }

  getActiveDropdown(): string | null {
    return this.activeDropdownId;
  }
}
