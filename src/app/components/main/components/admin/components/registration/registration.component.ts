import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  photoFile:any
  govIdFile:any
  signatureFile:any
  constructor(private fb: FormBuilder,private registrationService:RegistrationService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.registrationForm = this.fb.group({
      name: [''],
      contactNo: [''],
      address: [''],
      profession: [''],
      district: [''],
      regDate: [today],
      sex: [''],
      age: [''],
      dob: [''],
      username: [''],
      password: [''],
      type: [''],
      loginType: [''],
      signature: [null],
      photo: [null],
      govtId: [null],
    });
  }

  // Convert file to Base64
  async toBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  onFileChange(event: any, type: 'photo' | 'signature' | 'govId') {
    const file = event.target.files[0];
    if (type === 'photo') this.photoFile = file;
    if (type === 'signature') this.signatureFile = file;
    if (type === 'govId') this.govIdFile = file;
  }
  onSubmit() {
    const formData = new FormData();
    Object.entries(this.registrationForm.value).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(key, val.toString());
      }
    });
    
  
    formData.append('photo', this.photoFile);
    formData.append('signature', this.signatureFile);
    formData.append('govId', this.govIdFile);
  
    this.registrationService.save(formData).subscribe(res => {
      alert('Saved successfully!');
    });
  }
}
