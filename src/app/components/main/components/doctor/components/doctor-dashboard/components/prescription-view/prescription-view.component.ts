import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FOLLOW_UP_DETAILS,
  PATIENT_DETAILS,
} from '@assets/constants/doctor.constants';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-prescription-view',
  templateUrl: './prescription-view.component.html',
  styleUrls: ['./prescription-view.component.scss'],
})
export class PrescriptionViewComponent {
  patientDetails = PATIENT_DETAILS;
  showFollowup = false;
  isFollowupOpen = false;
  selectedDate: string = '';
  followupDay: string = '';
  followupDuration: string = '';
  followupDate: string = '';
  selectedCheckboxes = [];
  followupOptions = FOLLOW_UP_DETAILS;
  isAdmitted = false;
  showReferDropdown = false;
  selectedDoctor: any = null;
  searchQuery = '';
  prescriptionData: any[] = [];
  doctors = [
    { id: 1, name: 'Dr. Sharma' },
    { id: 2, name: 'Dr. Patel' },
    { id: 3, name: 'Dr. Nair' },
    { id: 4, name: 'Dr. Mehta' },
    { id: 5, name: 'Dr. Rao' },
  ];
  selectedPatientId = 1
  @ViewChild('admitPatientModal', { static: false })
  admitPatientModalRef!: ElementRef;
  private admitPatientModal!: Modal;
  @ViewChild('followUpPatientModal', { static: false })
  followUpPatientModalRef!: ElementRef;
  private followUpPatientModal!: Modal;
  @ViewChild('referUpPatientModal', { static: false })
  referUpPatientModalRef!: ElementRef;
  private referUpPatientModal!: Modal;
  filteredDoctors = [...this.doctors];
  payload;
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}
  @ViewChild('prescriptionSection', { static: false })
  prescriptionSection!: ElementRef;

  scrollToPrescription() {
    setTimeout(() => {
      this.prescriptionSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }
  examinationOptions = [
    { name: 'Headache', value: 'active' },
    { name: 'Back Pain', value: 'inactive' },
    { name: 'Having very much pain in my muscle', value: 'inactive' },
  ];
  dropdowns = [
    { label: 'Examination', options: this.examinationOptions, dropdownId: 1 },
    { label: 'Past History', options: '', dropdownId: 2 },
    { label: 'Personal History', options: '', dropdownId: 3 },
    { label: 'Family/Drug History', options: '', dropdownId: 4 },
    { label: 'Surgical History', options: '', dropdownId: 5 },
    { label: 'Medical History', options: '', dropdownId: 6 },
    { label: 'Examinations', options: '', dropdownId: 7 },
    { label: 'Investigation Lab', options: '', dropdownId: 8 },
    { label: 'Investigation Imaging', options: '', dropdownId: 9 },
    { label: 'Symptoms', options: '', dropdownId: 10 },
    { label: 'Instructions', options: '', dropdownId: 11 },
    { label: 'Diagnosis', options: '', dropdownId: 12 },
  ];

  ngAfterViewInit() {
    if (this.admitPatientModalRef) {
      this.admitPatientModal = new Modal(
        this.admitPatientModalRef.nativeElement
      );
    }
    if (this.followUpPatientModalRef) {
      this.followUpPatientModal = new Modal(
        this.followUpPatientModalRef.nativeElement
      );
    }

    if (this.referUpPatientModalRef) {
      this.referUpPatientModal = new Modal(
        this.referUpPatientModalRef.nativeElement
      );
    }
  }

  openModal(type: 'admit' | 'followup' | 'refer') {
    if (type === 'admit' && this.admitPatientModal) {
      this.admitPatientModal.show();
    } else if (type === 'followup' && this.followUpPatientModal) {
      this.followUpPatientModal.show();
    } else if (type === 'refer' && this.referUpPatientModal) {
      this.referUpPatientModal.show();
    }
  }

  closeModal() {
    if (this.admitPatientModal) {
      this.admitPatientModal.hide();
    }

    if (this.followUpPatientModal) {
      console.log('Follow-up modal closed');
      this.followUpPatientModal.hide();
    }
    if (this.referUpPatientModal) {
      this.referUpPatientModal.hide();
    }
  }

  admitPatient() {
    this.isAdmitted = true;
    this.closeModal();
  }

  toggleReferDropdown() {
    this.showReferDropdown = !this.showReferDropdown;
    if (this.showReferDropdown) {
      this.filteredDoctors = [...this.doctors]; // Reset only when opening
      this.searchQuery = ''; // Clear search input
    }
  }

  filterDoctors() {
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.cdr.detectChanges(); // Force UI update
  }

  selectDoctor(doctor: any) {
    this.selectedDoctor = doctor;
  }

  referPatient() {
    if (this.selectedDoctor) {
      console.log(`Patient referred to ${this.selectedDoctor.name}`);
      alert(`Patient referred to Dr. ${this.selectedDoctor.name}`);
      this.showReferDropdown = false; // Hide dropdown after refer
      this.selectedDoctor = null;
      this.searchQuery = '';
      this.closeModal();
    }
  }

  toggleFollowup() {
    this.isFollowupOpen = !this.isFollowupOpen;
  }

  onDateChange(event: any) {
    const selected = new Date(event.target.value);
    this.selectedDate = event.target.value;
    this.followupDay = selected.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    this.calculateFollowupDate();
  }

  onDurationChange(days: number) {
    this.followupDuration = `${days} days`;
    this.calculateFollowupDate(days);
  }

  calculateFollowupDate(days: number = 0) {
    let selected = this.selectedDate ? new Date(this.selectedDate) : new Date();
    selected.setDate(selected.getDate() + days);

    this.followupDate = selected.toISOString().split('T')[0]; // Format YYYY-MM-DD
    this.followupDay = selected.toLocaleDateString('en-US', {
      weekday: 'long',
    });

    console.log('Follow-up Date:', this.followupDate);
    console.log('Follow-up Day:', this.followupDay);
    this.toggleFollowup();
  }

  onPrescriptionUpdate(data: any[]) {
    this.prescriptionData = data;
    console.log('Updated Prescription Data:', this.prescriptionData);
  }

  onSelectionChanged(selectedOptions) {
    if (selectedOptions.length) {
      selectedOptions.forEach((option) => {
        // Check if the label already exists in selectedCheckboxes
        let existingLabelIndex = this.selectedCheckboxes.findIndex(
          (item) => Object.keys(item)[0] === option.label
        );
        // Prepare a dynamic list of options without duplicates
        const dynamicOptions = option.options.map((opt) => ({
          id: opt.dropdownId,
          name: opt.name,
        }));

        if (existingLabelIndex !== -1) {
          // Replace existing data with the new data
          this.selectedCheckboxes[existingLabelIndex] = {
            [option.label]: dynamicOptions,
            isPrintable: option.isPrintEnabled,
          };
        } else {
          // Create a new label object with the dynamic options
          let newOption = {
            [option.label]: dynamicOptions,
            isPrintable: option.isPrintEnabled,
          };
          this.selectedCheckboxes.push(newOption);
        }
      });

      console.log(this.selectedCheckboxes);
    }
  }

  saveDetails(isPrint?) {
    // console.log("selected options",this.selectedCheckboxes)
     this.payload = {
      followupDate: this.followupDate || null,
      followupDay: this.followupDay || null,
      isAdmitted: this.isAdmitted ? this.isAdmitted : false,
      referDoctor: this.selectedDoctor || null,
      prescriptionData: this.prescriptionData || [],
      selectedCheckboxes: this.selectedCheckboxes,
    };
    console.log('Payload', this.payload);
    if(isPrint === 'print'){
      this.saveAndPrintPrescription();
    }

    // Your logic to save the prescription goes here
  }
  saveAndPrintPrescription() {
    console.log(this.payload)
    this.router.navigate(['/main/doctor/doctor-dashboard/prescription-view/print-prescription'], {
      state: { patientDetails: this.payload },
    });
  }
}
