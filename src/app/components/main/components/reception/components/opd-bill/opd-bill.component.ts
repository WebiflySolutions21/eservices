import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-opd-bill',
  templateUrl: './opd-bill.component.html',
  styleUrls: ['./opd-bill.component.scss'],
})
export class OpdBillComponent {
  @ViewChild('manageChargesModal', { static: false })
  manageChargesModalRef!: ElementRef;
  private manageChargesModal!: Modal;
  chargeForm: FormGroup;
  totalAmount: number = 0;

  constructor(private fb: FormBuilder,private router:Router) {
    this.chargeForm = this.fb.group({
      charges: this.fb.array([]),
      opdBills: this.fb.array([]),
      paymentMethods:this.fb.array([])
    });
  }


ngOnInit(): void {
  // Subscribe to form changes to update the total
  this.chargeForm.get('opdBills')?.valueChanges.subscribe(() => {
    this.calculateTotal();
  });
}

calculateTotal(): void {
  this.totalAmount = this.opdBills.controls.reduce((acc, charge) => {
    const amount = charge.value.chargeAmount || 0;
    const quantity = charge.value.quantity || 1;
    return acc + amount * quantity;
  }, 0);
}
  
  // Common method to get any form array
  private getFormArray(arrayName: string): FormArray {
    return this.chargeForm.get(arrayName) as FormArray;
  }
  
  // Getters for charges and OPD bills form arrays
  get charges(): FormArray {
    return this.getFormArray('charges');
  }
  
  get opdBills(): FormArray {
    return this.getFormArray('opdBills');
  }

  get paymentMethods(): FormArray {
    return this.getFormArray('paymentMethods');
  }
  
  // Generic method to add a form group to any form array
  private addFormGroup(arrayName: string): void {
    const group = this.fb.group({
      chargeName: ['', Validators.required],
      chargeAmount: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  
    this.getFormArray(arrayName).push(group);
  }

  // Generic method to add a form group to any form array
  private paymentGroup(arrayName: string): void {
    const paymentGroup = this.fb.group({
      paymentMode: ['', Validators.required],
      paymentType: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]],
    });
  
    this.getFormArray(arrayName).push(paymentGroup);
  }

  addPaymentMehotd(){
    this.paymentGroup('paymentMethods');
  }
  
  // Adding charge and OPD bill using the generic method
  addCharge(): void {
    this.addFormGroup('charges');
  }
  
  addOpdBill(): void {
    this.addFormGroup('opdBills');
  }
  
  // Generic method to remove an item from any form array
  removeItem(arrayName: string, index: number): void {
    this.getFormArray(arrayName).removeAt(index);
  }
  
  removePaymentMethod(index: number): void {
    this.removeItem('paymentMethods', index);
  }
  // Remove charge and OPD bill using the generic method
  removeCharge(index: number): void {
    this.removeItem('charges', index);
  }
  
  removeOpdBill(index: number): void {
    this.removeItem('opdBills', index);
  }
  
  // Submit methods for charges and OPD bills
  submitForm(): void {
    console.log("Form Data:", this.chargeForm.value);
  }
  
  submitOpdBill(arg?): void {
    console.log("OPD Bills:", this.opdBills.value);
    if(arg === "print"){
      this.router.navigate(["/main/reception/print-page"],{
        state:{
          paymentMethods:this.paymentMethods.value,
          opdBills:this.opdBills.value,
          billTitle:"OPD BILL"
        }
      })
    }
  }
  
  submitPaymentMethod(): void {
    console.log("Payment Methods:", this.paymentMethods.value);
  }

  ngAfterViewInit() {
    if (this.manageChargesModalRef) {
      this.manageChargesModal = new Modal(
        this.manageChargesModalRef.nativeElement
      );
    }
  }


  openModal() {
    this.manageChargesModal.show();
  }

  closeModal() {
    this.manageChargesModal.hide();
  }

  
}
