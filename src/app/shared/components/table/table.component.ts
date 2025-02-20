import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() tableData: any[] = []; // Data for the table
  @Input() tableColumns: { key: string; title: string }[] = []; // Columns
  @Input() actions: { label: string; action: string; class?: string }[] = []; // Actions like Edit, Delete

  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>(); // Emit action event
ngOnInit(): void {
  console.log(this.tableData)
  console.log(this.tableColumns)
}
  onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }
}
