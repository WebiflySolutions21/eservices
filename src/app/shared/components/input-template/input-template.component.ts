import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  Validators,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { IFormValueData } from "../../../../assets/constants/app.constants";

@Component({
  selector: "app-input-template",
  templateUrl: "./input-template.component.html",
  styleUrls: ["./input-template.component.scss"],
})
export class InputTemplateComponent implements OnInit {
  @Input() jsonObs$: BehaviorSubject<any>;
  @Input() formValueObs$: BehaviorSubject<IFormValueData>;
  @Output() sectionCtaClick = new EventEmitter<any>();

  jsonData: any;
  imgStatus = {}; //imgStatus for imageUpload inputs
  seasonId;
  dynamicForm: FormGroup;
  showForm = false
  data = {
    sections: [
      {
        title: "Section 1",
        description: "Description 1",
        isOpen: false,
        piFields: [
          {
            type: "text",
            label: "Voting Title",
            subLabel: "*(No value will show default text)",
            apiKey: "votingTitle",
            default: "",
            placeholder: "Enter Voting Title",
            info: "*Enter only alphanumeric characters",
            validations: {
              maximum_length: { val: 16, msg: "" },
              minimum_length: { val: 2, msg: "" },
              maximum_space: { val: 2, msg: "" },
              required: { val: 0, msg: "" },
              alphanumeric: { val: 0, msg: "" },
            },
            extra: {},
          },
          {
            type: "number",
            label: "Voting Count",
            subLabel: "*(No value will show default text)",
            apiKey: "votingCount",
            default: "",
            placeholder: "Enter Voting Count",
            info: "*(0-20)",
            validations: {
              maximum_value: { val: 20, msg: "" },
              minimum_value: { val: 0, msg: "" },
              required: { val: 0, msg: "" },
            },
            extra: {},
          },
          {
            type: "imageUpload",
            label: "Splash Bg",
            subLabel: "*(No value will show default value)",
            apiKey: "splashBg",
            default: "",
            placeholder: "",
            info: "360 * 355 px (jpg/png/webp only)",
            validations: {
              fileType: { val: ["jpg", "png", "webp"], msg: "" },
              maxsize_KB: { val: 200, msg: "" },
              minsize_KB: { val: 0, msg: "" },
              required: { val: 0, msg: "" },
            },
            extra: {
              uploadApi: "",
            },
          },
          {
            type: "select",
            label: "Select Contestant",
            subLabel: "*(No value will show default value)",
            apiKey: "contestant",
            default: "",
            placeholder: "",
            info: "",
            validations: {
              required: { val: 0, msg: "" },
            },
            extra: {
              options: [
                { id: 1, name: "Contestant 1" },
                { id: 2, name: "Contestant 2" },
                { id: 3, name: "Contestant 3" },
                { id: 4, name: "Contestant 4" },
              ],
              multiSelect: false,
            },
          },
          {
            type: "datetime",
            label: "Start Date",
            subLabel: "*(No value will show default value)",
            apiKey: "startDate",
            default: "",
            placeholder: "",
            info: "",
            validations: {
              required: { val: 0, msg: "" },
            },
            extra: {},
          },
        ],
      },
    ],
    hideSectionHeader: false,
    isSubmit: false,
  };

  constructor(
    public toastr: ToastrService,
    private _formBuilder: FormBuilder,

  ) {
  }

  ngOnInit(): void {
    console.log(this.jsonObs$)
    this.jsonObs$.subscribe((data) => {
      if (!data) {
        return;
      }

      if (!this.jsonData) {
        this.jsonData = data;
        console.log("data",data)
        this.createRegisterForm();
      } else {
        //save current form value
        let formValue = this.dynamicForm.value;
        //clear dynamic form, imgStatus and create new form
        this.dynamicForm = null;
        this.imgStatus = {};
        this.jsonData = data;
        this.createRegisterForm();

        //set previous form value to new form if non empty and common fields are present
        Object.entries(this.dynamicForm.controls).forEach(([key, control]) => {
          if (formValue[key] !== null && formValue[key] !== undefined) {
            control?.setValue(formValue[key]);
          }
        });
      }
    });
    this.formValueObs$.subscribe((data) => {
      if (data.isPreload) {
        for (const key in data.data) {
          if (Object.prototype.hasOwnProperty.call(data.data, key)) {
            this.dynamicForm.get(key)?.setValue(data.data[key]);
          }
        }
      }
    });
  }
  showPreview(){
    this.showForm = !this.showForm
  }
  createRegisterForm() {
    let grp = {};
    this.jsonData.sections.forEach((ele: any) => {
      // console.log(ele);
      ele.piFields.forEach((field: any) => {
        field.isRequired = field.validations.required ? true : false;
        grp[field.apiKey] = this.getControlWithDefault(field);

        if (field.type === "imageUpload") {
          this.initiateImageStatus(field);
        }
      });

      this.dynamicForm = this._formBuilder.group(grp);

      //add additional validations
      ele.piFields.forEach((field: any) => {
        this.addValidations(field);
      });

      //send data to formValue$ observable when there is any change in value of dynamic form
      this.dynamicForm.valueChanges.subscribe((data) => {
        this.formValueObs$.next({
          isSubmit: false,
          isPreload: false,
          data: data,
        });
      });
    });
  }

  initiateImageStatus(field) {
    this.imgStatus[field.apiKey] = {
      imageUploading: "",
      imageUploadError: "",
      errorMsg: "",
    };
  }

  getControlWithDefault(field) {
    switch (field.type) {
      case "number":
        let validations = [];
        if (field.validations.maximum_value) {
          validations.push(
            MaxNumValidator(field.validations.maximum_value.val)
          );
        }
        if (field.validations.minimum_value) {
          validations.push(
            MinNumValidator(field.validations.minimum_value.val)
          );
        }
        if (field.isRequired) {
          validations.push(Validators.required);
        }
        return [field.default || null, validations];
        break;

      default:
        return [
          field.default || null,
          field.isRequired ? Validators.required : null,
        ];
    }
  }

  addValidations(field) {
    switch (field.type) {
      case "text":
        if (field.validations.maximum_space) {
          this.dynamicForm
            .get(field.apiKey)
            .setValidators([
              SpaceValidator(field.validations.maximum_space.val),
            ]);
        }
        if (field.validations.alphanumeric) {
          this.addAlphanumericValidator(this.dynamicForm.get(field.apiKey));
        }
        if (field.validations.alphanumeric_with_space) {
          this.addAlphanumericWithSpaceValidator(
            this.dynamicForm.get(field.apiKey)
          );
        }
        break;
    }
  }

  addAlphanumericValidator(ctrl) {
    let oldValue = "";
    ctrl.valueChanges.subscribe((value) => {
      if (value === oldValue) {
        return;
      }

      if (value && !/^[a-zA-Z0-9_]+$/.test(value)) {
        ctrl?.setValue(oldValue);
      } else {
        oldValue = value;
      }
    });
  }

  addAlphanumericWithSpaceValidator(ctrl) {
    let oldValue = "";
    ctrl.valueChanges.subscribe((value) => {
      if (value === oldValue) {
        return;
      }

      if (value && !/^[a-zA-Z0-9_ ]+$/.test(value)) {
        ctrl?.setValue(oldValue);
      } else {
        oldValue = value;
      }
    });
  }

  uploadImage(field, payload) {
    // let url =
    //   field?.extra?.uploadApi ||
    //   this.appService.getConfigEnvParam("API_ENDPOINT") +
    //     "/admin/seasons/" +
    //     this.seasonId +
    //     "/type/homepageBanner/uploadImage";
    // return this.restService.post(url, payload);
  }

  getImageFileTypeString(fileTypes) {
    let str = "";
    fileTypes?.forEach((type) => {
      str += "image/" + type + ", ";
    });
    return str.slice(0, -2);
  }

  onImage(event, field) {
    // let control = field?.apiKey;
    // this.imgStatus[control].imageUploading = true;
    // this.imgStatus[control].imageUploadError = false;
    // this.imgStatus[control].errorMsg = "";
    // const formData = new FormData();
    // let img = (event.target as HTMLInputElement).files[0];

    // let name = img?.name;
    // //check no space is present in name
    // if (name?.includes(" ")) {
    //   this.imgStatus[control].imageUploading = false;
    //   this.imgStatus[control].imageUploadError = false;
    //   this.imgStatus[control].errorMsg = "Please remove spaces from image name";
    //   this.dynamicForm.get(control).setValue("");
    //   (event.target as HTMLInputElement).value = null;
    //   return;
    // }

    // //if no image is selected
    // if (img === undefined) {
    //   this.imgStatus[control].imageUploading = false;
    //   this.imgStatus[control].imageUploadError = false;
    //   this.imgStatus[control].errorMsg = "Please upload image";
    //   this.dynamicForm.get(control).setValue("");
    //   console.log("No image selected");
    //   return;
    // }

    // //check file type
    // let fileBool = false;
    // field?.validations?.fileType?.val?.forEach((type) => {
    //   if (img.type.includes(type)) {
    //     fileBool = true;
    //   }
    // });
    // if (!fileBool) {
    //   this.imgStatus[control].imageUploading = false;
    //   this.imgStatus[control].imageUploadError = false;
    //   this.imgStatus[control].errorMsg =
    //     field?.validations?.fileType?.msg ||
    //     "Please upload " +
    //       field?.validations?.fileType?.val?.join(", ") +
    //       " file only";
    //   this.dynamicForm.get(control).setValue("");
    //   (event.target as HTMLInputElement).value = null;
    //   return;
    // }

    // //check file size
    // if (img.size > field?.validations?.maxsize_KB?.val * 1024) {
    //   this.imgStatus[control].imageUploading = false;
    //   this.imgStatus[control].imageUploadError = false;
    //   this.imgStatus[control].errorMsg =
    //     field?.validations?.maxsize_KB?.msg ||
    //     "Please upload image of size less than " +
    //       field?.validations?.maxsize_KB?.val +
    //       " KB";
    //   this.dynamicForm.get(control).setValue("");
    //   (event.target as HTMLInputElement).value = null;
    //   return;
    // }

    // //upload image to bucket
    // formData.append("img", img);
    // this.uploadImage(field, formData).subscribe({
    //   next: (res: any) => {
    //     if (res) {
    //       this.toastr.success("Success", "Image is Uploaded");
    //       this.dynamicForm.get(control).setValue(res.url);
    //       this.dynamicForm.markAsDirty();

    //       this.imgStatus[control].imageUploading = false;
    //       this.imgStatus[control].errorMsg = "";
    //     } else {
    //       this.toastr.error("Error", "Error in uploading Image");
    //       this.imgStatus[control].imageUploading = false;
    //       this.imgStatus[control].imageUploadError = true;
    //       this.imgStatus[control].errorMsg = "";
    //       this.dynamicForm.get(control).setValue("");
    //       (event.target as HTMLInputElement).value = null;
    //     }
    //     console.log(this.imgStatus);
    //   },
    //   error: () => {
    //     this.toastr.error("Error", "Error in uploading Image");
    //     this.imgStatus[control].imageUploading = false;
    //     this.imgStatus[control].imageUploadError = true;
    //     this.imgStatus[control].errorMsg = "";
    //     this.dynamicForm.get(control).setValue("");
    //     (event.target as HTMLInputElement).value = null;
    //     console.log(this.imgStatus);
    //   },
    // });
  }

  handleSectionCtaClick(section) {
    this.sectionCtaClick.emit(section?.id);
  }

  submitForm() {
    this.formValueObs$.next({
      isSubmit: true,
      isPreload: false,
      data: this.dynamicForm.value,
    });
    this.dynamicForm.markAsPristine();
  }
}

function SpaceValidator(maxSpaces: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value !== null && control.value !== undefined) {
      let val = String(control.value);
      if (val.split(" ").length > maxSpaces + 1) {
        return { maxSpaces: true };
      }
    }
    return null; // Ensure null is returned in all cases
  };
}


function MinNumValidator(minNum: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value !== null && control.value !== undefined) {
      let val = parseInt(control.value);
      if (val < minNum) {
        return { minNumber: true };
      }
    }
    return null;  // Ensure null is returned when no error
  };
}

function MaxNumValidator(maxNum: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value !== null && control.value !== undefined) {
      let val = parseInt(control.value);
      if (val > maxNum) {
        return { maxNumber: true };
      }
    }
    return null;  // Ensure null is returned when no error
  };
}
