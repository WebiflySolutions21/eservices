import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  IFormValueData,
  INPUT_TYPES,
  LOGIN_TYPE_LANDING_PAGE,
} from '@assets/constants/app.constants';
import { DataService } from 'src/app/core/services';
@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
})
export class ConfigurationsComponent implements OnInit {
  dynamicForm: FormGroup;
  isPreviewOpen: boolean = false;
  previewForm: any = null; // Holds form data for preview
  dragging = false;
  isOver = false;
  jsonObs$ = new BehaviorSubject<any>(null);
  formValueObs$ = new BehaviorSubject<IFormValueData>({
    isSubmit: false,
    isPreload: false,
    data: null,
  });

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  inputTypes = INPUT_TYPES;
  storedData: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.dynamicForm = this.fb.group({
      title: ['', Validators.required], // Universal Title
      description: ['', Validators.required], // Universal Description
      buttonTitle: ['Submit', Validators.required], // Universal Button Title
      fields: this.fb.array([]), // FormArray for Dynamic Fields
    });
  }

  ngOnInit() {
    this.dropdownList = LOGIN_TYPE_LANDING_PAGE;

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item.path);
    console.log('Updated Selected Paths:', this.selectedItems);
  }

  onDeSelect(item: any) {
    this.selectedItems = this.selectedItems.filter(
      (path) => path !== item.path
    );
    console.log('Updated Selected Paths:', this.selectedItems);
  }
}
