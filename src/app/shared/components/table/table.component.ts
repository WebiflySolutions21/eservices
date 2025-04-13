import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit,OnChanges {
  @Input() tableData: any[] = [];
  @Input() tableColumns: { key: string; title: string; filterType?: string; options?: any[] }[] = [];
  @Input() actions: { label: string; action: string; class?: string }[] = [];
  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();
  @Input() type = "normal";
  searchValues: { [key: string]: string } = {};
  dropdownValues: { [key: string]: any } = {};
  dateValues: { [key: string]: string } = {};
  filteredData: any[] = [];
  sortDirection: { [key: string]: boolean } = {};

  ngOnInit(): void {
    console.log("tableData",this.tableData)
    this.filteredData = this.tableData?.map(row => {
      if (row.regDate) {
        row.regDate = this.convertToDisplayDateFormat(this.convertToInputDateFormat(row.regDate));
      } else {
        row.regDate = this.getTodayDate(); // Auto-populate with today's date if empty
      }
      return row;
    });
    console.log("filteredData",this.filteredData)
    this.initializeFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      this.filteredData = this.tableData;
    }
  }

  initializeFilters() {
    this.tableColumns.forEach((col) => {
      this.searchValues[col.key] = '';
      this.dropdownValues[col.key] = '';
      this.dateValues[col.key] = '';
      this.sortDirection[col.key] = false;
    });
  }

  toggleDropdown(row: any) {
    row.showDropdown = !row.showDropdown;
  }

  onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }
  getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }
  // Convert from DD/MM/YYYY to YYYY-MM-DD for date input
convertToInputDateFormat(dateString: string): string {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
}

// Convert from YYYY-MM-DD to DD/MM/YYYY for display
convertToDisplayDateFormat(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
  onFilterChange() {
    this.filteredData = this.tableData.filter((row) => {
      return this.tableColumns.every((col) => {
        const value = row[col.key] ? row[col.key].toString().toLowerCase() : '';

        if (col.filterType === 'search') {
          const searchValue = this.searchValues[col.key]?.toString().toLowerCase() || '';
          return !searchValue || value.includes(searchValue);
        }

        if (col.filterType === 'dropdown') {
          const dropdownValue = this.dropdownValues[col.key];
          return !dropdownValue || value === dropdownValue.toString().toLowerCase();
        }

        if (col.filterType === 'date') {
          console.log("row[col.key]", row[col.key]);
          const rowDate = this.convertToInputDateFormat(row[col.key]);
          const filterDate = this.dateValues[col.key];
          return !filterDate || rowDate === filterDate;
        }

        return true;
      });
    });
  }

  onDateChange(row: any, key: string, event: any) {
    const inputDate = event.target.value;
    row[key] = this.convertToDisplayDateFormat(inputDate);
    this.onFilterChange();
  }

  sortData(key: string) {
    const direction = this.sortDirection[key] ? 1 : -1;
    this.filteredData.sort((a, b) => {
      if (a[key] < b[key]) return -1 * direction;
      if (a[key] > b[key]) return 1 * direction;
      return 0;
    });
    this.sortDirection[key] = !this.sortDirection[key];
  }
}
