import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import JsBarcode from 'jsbarcode';
import { PatientService } from 'src/app/core/services';
interface Patient {
  id: number;
  name: string;
  mobile: string;
  dob: string;
  age: number;
  sex: string;
  address: string;
  taluka: string;
  district: string;
  consultant: string;
  visitType: string;
}

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
})
export class PatientRegistrationComponent implements OnInit {
  patientForm!: FormGroup;
  uploadedPicFile!: File;
  uploadedImageUrl: string | null = null;
  consultants: string[] = [
    'Dr. Eknath Pawar',
    'Dr. Amit Deshmukh',
    'Dr. Priya Kulkarni',
    'Dr. Rakesh Patil',
  ];
  livePicFile: any;
  visitTypes: string[] = [
    'General Checkup',
    'Eye Checkup',
    'Dental Visit',
    'Emergency',
    'Follow-up',
  ];
  @ViewChild('barcode') barcodeElement!: ElementRef;
  patientId: string = '';

  showSearchBar: boolean = false;
  searchQuery: string = '';
  searchResults: Patient[] = [];
  selectedPatient: Patient | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  imagePreview: string | null = null;
  isCameraOpen: any;
  cameraImagePreview: any;
  savedPicture = false;

  // Mock existing patient data (replace with real API data)
  existingPatients: Patient[] = [
    {
      id: 1,
      name: 'John Doe',
      mobile: '1234567890',
      dob: '1990-05-15',
      age: 32,
      sex: 'Male',
      address: '123 Street',
      taluka: 'Taluka A',
      district: 'District X',
      consultant: 'Dr. Eknath Pawar',
      visitType: 'General Checkup',
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobile: '9876543210',
      dob: '1985-10-20',
      age: 37,
      sex: 'Female',
      address: '456 Avenue',
      taluka: 'Taluka B',
      district: 'District Y',
      consultant: 'Dr. Priya Kulkarni',
      visitType: 'Eye Checkup',
    },
    {
      id: 3,
      name: 'Lokesh Thakare',
      mobile: '7218509409',
      dob: '1985-10-20',
      age: 37,
      sex: 'Female',
      address: '456 Avenue',
      taluka: 'Taluka B',
      district: 'District Y',
      consultant: 'Dr. Priya Kulkarni',
      visitType: 'Eye Checkup',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      oldPatient: ['no', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      taluka: ['', Validators.required],
      district: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['Male', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      consultant: ['', Validators.required],
      visitType: ['', Validators.required],
      weight: ['', Validators.required],
      pulse: ['', Validators.required],
      bp: ['', Validators.required],
      temperature: ['', Validators.required],
      referredBy: [''],
      complaints: [''],
      searchQuery: [''],
    });

    // Trigger search when the search query changes
    this.patientForm
      .get('searchQuery')
      ?.valueChanges.subscribe((query: string) => {
        this.searchPatients(query);
      });
    this.patientId = 'P' + Date.now().toString();

  }

  generateBarcode(): void {
    if (this.barcodeElement) {
      JsBarcode(this.barcodeElement.nativeElement, this.patientId, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: true,
      });
    }
    // Get SVG string
    const svgString = new XMLSerializer().serializeToString(
      this.barcodeElement.nativeElement
    );
    console.log('SVG Barcode:', svgString);
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedPicFile = file; // <- Store the actual file for FormData
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onPatientTypeChange(type: string): void {
    this.showSearchBar = type === 'yes';
    if (!this.showSearchBar) {
      this.searchQuery = '';
      this.searchResults = [];
      this.selectedPatient = null;
      // Only reset relevant fields, not the entire form
      this.patientForm.patchValue({
        searchQuery: '',
        name: '',
        address: '',
        taluka: '',
        district: '',
        dob: '',
        age: '',
        sex: 'Male', // or any default value
        mobile: '',
        consultant: '',
        visitType: '',
        weight: '',
        pulse: '',
        bp: '',
        temperature: '',
        referredBy: '',
        complaints: '',
        image: '',
      });
    }
  }

  searchPatients(query: string): void {
    query = query?.toLowerCase().trim();
    if (query) {
      this.searchResults = this.existingPatients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.mobile.toLowerCase().includes(query) ||
          patient.id.toString().includes(query) ||
          patient.dob.toLowerCase().includes(query) ||
          patient.age.toString().includes(query) ||
          patient.sex.toLowerCase().includes(query) ||
          patient.address.toLowerCase().includes(query) ||
          patient.taluka.toLowerCase().includes(query) ||
          patient.district.toLowerCase().includes(query) ||
          patient.consultant.toLowerCase().includes(query) ||
          patient.visitType.toLowerCase().includes(query)
      );
    } else {
      this.searchResults = [];
    }
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.patientForm.get('searchQuery').reset();
    this.patientForm.patchValue({
      name: patient.name,
      address: patient.address,
      taluka: patient.taluka,
      district: patient.district,
      dob: patient.dob,
      age: patient.age,
      sex: patient.sex,
      mobile: patient.mobile,
      consultant: patient.consultant,
      visitType: patient.visitType,
    });
  }

  onSubmit() {
    this.generateBarcode();
    const formData = new FormData();

    Object.entries(this.patientForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    formData.append('patientId', this.patientId);

    // Append file uploads
    if (this.livePicFile) {
      formData.append('patientLivePic', this.livePicFile);
    }
    if (this.uploadedPicFile) {
      formData.append('imageUploaded', this.uploadedPicFile);
    }

    this.patientService.savePatient(formData).subscribe((res) => {
      console.log('Patient registered!', res);
    });
  }
  openCamera() {
    this.isCameraOpen = true;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  }

  capturePhoto() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      this.cameraImagePreview = dataUrl;
      this.livePicFile = this.dataURLToFile(dataUrl, 'live-photo.png');
      this.stopCamera();
    }
  }

  // Convert base64 to File
  dataURLToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  retakePhoto() {
    this.cameraImagePreview = null;
    this.savedPicture = false;
    this.openCamera();
  }

  savePhoto() {
    this.savedPicture = true;

    alert('Photo saved successfully!');
  }

  stopCamera() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const stream = video.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    this.isCameraOpen = false;
  }
}
