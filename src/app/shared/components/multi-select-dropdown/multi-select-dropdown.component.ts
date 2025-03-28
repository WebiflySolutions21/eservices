import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownStateService } from 'src/app/core/services';

interface OptionsFormat {
  name: string;
  value: string;
  dropdownId: any;
}

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss'],
})
export class MultiSelectDropdownComponent implements OnInit {
  @Input() options: OptionsFormat[] = [];
  @Input() label: string = '';
  @Input() dropdownId: string = ''; // Unique ID for each dropdown
  @Output() selectionChanged = new EventEmitter(); // Emit selected options to parent
  selectedOptions: OptionsFormat[] = [];
  filteredOptions: OptionsFormat[] = [];
  searchTerm: string = '';
  dropdownOpen: boolean = false;
  allData = [];
  isPrintEnabled: boolean = true; // Default ON

  constructor(
    private dropdownStateService: DropdownStateService,
    private eRef: ElementRef
  ) {}

  ngOnInit() {
    this.dropdownStateService.setActiveDropdown(null);
    this.filteredOptions = [...this.options]; // Initialize filtered options

    // Emit an empty selection if there are no dropdown options
    if (!this.options || this.options.length === 0) {
      this.emitSelectionChanged();
    }
  }

  toggleDropdown(open: boolean) {
    if (open) {
      this.dropdownStateService.setActiveDropdown(this.dropdownId);
      this.dropdownOpen = true;
    } else {
      this.dropdownOpen = false;
      this.dropdownStateService.setActiveDropdown(null);
    }
    this.filterOptions();
  }

  printPage() {
    if (this.isPrintEnabled) {
      window.print();
    } else {
      console.log('Print Disabled for this Dropdown');
    }
  }

  filterOptions() {
    if (!Array.isArray(this.options)) {
      this.options = [];
    }

    this.filteredOptions = this.options.filter((option) =>
      option.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isSelected(option: OptionsFormat): boolean {
    return this.selectedOptions.some((item) => item.name === option.name);
  }

  toggleSelection(option: OptionsFormat) {
    const index = this.selectedOptions.findIndex(
      (item) => item.name === option.name
    );
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
    this.emitSelectionChanged(); // Emit data on every change
  }
  emitSelectionChanged() {
    // Create the new entry
    const newEntry = {
      label: this.label,
      options: [...this.selectedOptions], // Clone to avoid reference issues
      isPrintEnabled: this.isPrintEnabled, // Include toggle switch value
    };
  
    // Find existing index
    const existingIndex = this.allData.findIndex(
      (item) => item.label === this.label
    );
  
    // Update or add
    if (this.selectedOptions.length > 0) {
      if (existingIndex !== -1) {
        this.allData[existingIndex] = newEntry;
      } else {
        this.allData.push(newEntry);
      }
    } else {
      // Remove if no selections
      if (existingIndex !== -1) {
        this.allData.splice(existingIndex, 1);
      }
    }
    // Emit a deep copy to prevent external modifications
    this.selectionChanged.emit(JSON.parse(JSON.stringify(this.allData)));
  }
  
  

  removeItem(item: OptionsFormat) {
    this.selectedOptions = this.selectedOptions.filter(
      (option) => option.name !== item.name
    );
    this.emitSelectionChanged(); // Emit data on item removal
  }

  addNewOption() {
    if (
      this.searchTerm &&
      !this.options?.some((option) => option.name === this.searchTerm)
    ) {
      const newOption: OptionsFormat = {
        name: this.searchTerm,
        value: 'custom',
        dropdownId: this.dropdownId,
      };
      this.options = [...this.options, newOption]; // Create a new array reference to trigger change detection
      this.selectedOptions.push(newOption);
      this.searchTerm = '';
      this.filterOptions();
      this.emitSelectionChanged(); // Emit data on adding a new option
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.toggleDropdown(false);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.toggleDropdown(false);
  }
}
