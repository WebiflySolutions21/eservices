import { Component, OnInit } from '@angular/core';
import {
  SUPER_ADMIN_TABLE_COLUMNS,
  SUPER_ADMIN_TABLE_DATA,
} from '@assets/constants/super-admin.constants';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss'],
})
export class SuperAdminDashboardComponent implements OnInit {
  tableData: any = SUPER_ADMIN_TABLE_DATA;
  actionType: any;
  popUpConfirmData: any;
  filteredTableData: any;
  tableColumns: any = SUPER_ADMIN_TABLE_COLUMNS;
  showConfirmDialog = false;
  title: any;
  message: any;

  ngOnInit() {
    this.filteredTableData = this.tableData;
  }

  handleAction(event: any) {
    console.log('event', event);
    switch (event.action) {
      case 'delete':
        this.title = `Delete ${event.row.name}`;
        this.message = `Are you sure you want to delete this ${event.row.name}?`;
        this.openConfirm(event?.action, event.row);
        break;
      case 'revoke':
        this.title = `Revoke ${event.row.name}`;
        this.message = `Are you sure you want to revoke this ${event.row.name}?`;
        this.openConfirm(event?.action, event.row);
        break;
    }
  }
  handleDeleteHospital(data: any) {
    console.log('Delete Hospital', this.title);
  }
  handleRevokeHospital(data: any) {
    console.log('Revoke Hospital', this.title);
  }

  openConfirm(action: any, data: any) {
    this.actionType = action;
    this.popUpConfirmData = data;
    this.showConfirmDialog = true;
  }

  handleConfirm() {
    if (!this.popUpConfirmData) return;
    this.showConfirmDialog = false;
    switch (this.actionType) {
      case 'delete':
        this.handleDeleteHospital(this.popUpConfirmData);
        break;
      case 'revoke':
        this.handleRevokeHospital(this.popUpConfirmData);
        break;
      default:
        console.warn('Unknown action:', this.actionType);
        break;
    }
  }

  handleCancel() {
    console.log('Cancelled!');
    this.showConfirmDialog = false;
    return false;
  }
}
