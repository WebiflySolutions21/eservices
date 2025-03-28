import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() tableColumns: { key: string; title: string; filterType?: string; options?: any[] }[] = [];
  @Input() actions: { label: string; action: string; class?: string }[] = [];

  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();

  searchValues: { [key: string]: string } = {};
  dropdownValues: { [key: string]: any } = {};
  dateValues: { [key: string]: string } = {};
  filteredData: any[] = [];
  sortDirection: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.filteredData = [...this.tableData];
    this.tableColumns.forEach((col) => {
      this.searchValues[col.key] = '';
      this.dropdownValues[col.key] = '';
      this.dateValues[col.key] = '';
      this.sortDirection[col.key] = false;
    });
  }

  onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }
  onFilterChange() {
    this.filteredData = this.tableData.filter((row) => {
      return this.tableColumns.every((col) => {
        const value = row[col.key] ? row[col.key].toString().toLowerCase() : '';
  
        // Search Filter
        if (col.filterType === 'search') {
          const searchValue = this.searchValues[col.key]?.toString().toLowerCase() || '';
          return !searchValue || value.includes(searchValue);
        }
  
        // Dropdown Filter
        if (col.filterType === 'dropdown') {
          const dropdownValue = this.dropdownValues[col.key];
          return !dropdownValue || value === dropdownValue.toString().toLowerCase();
        }
  
        // Date Filter
        if (col.filterType === 'date') {
          // Format the date in 'dd/mm/yyyy' format
          const rowDate = new Date(row[col.key]).toLocaleDateString('en-GB');
          const filterDate = new Date(this.dateValues[col.key]).toLocaleDateString('en-GB');
          return !this.dateValues[col.key] || rowDate === filterDate;
        }
  
        return true; // Default to true if no filter type is specified
      });
    });
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
