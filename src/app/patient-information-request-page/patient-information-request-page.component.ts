import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-patient-information-request-page',
  templateUrl: './patient-information-request-page.component.html',
  styleUrls: ['./patient-information-request-page.component.css']
})
export class PatientInformationRequestPageComponent implements OnInit {
  prediction: any;

  formData: any = {
    age:null,
    sex: '',
    cp:null,
    trestbps:null,
    chol:null,
    fbs:null,
    restecg:null,
    thalach:null,
    exang:null,
    oldpeak:null,
    slpoe:null,
    ca:null,
    thal:null,
  };
  numberTouched: boolean | undefined;
  numberValid: boolean | undefined;
  form:any;

    constructor(private apiService: ApiService,private fb:FormBuilder,private dialog: MatDialog) { this.createForm() }
    ngOnInit(): void {
    }
  
     createForm() {
    this.form = this.fb.group({
      cp: ['', [Validators.required, this.validateCP]],
      sex:['', [Validators.required]],
      age:['', [Validators.required, this.validateNumber]],
      trestbps:['', [Validators.required, this.validateNumber]],
      chol:['', [Validators.required, this.validateNumber]],
      fbs:['', [Validators.required, this.validateFbs]],
      restecg:['', [Validators.required, this.validateRestecg]],
      thalach:['', [Validators.required, this.validateNumber]],
      exang:['', [Validators.required, this.validateFbs]],
      oldpeak:['', [Validators.required, this.validateNumber]],
      slope:['', [Validators.required, this.validateRestecg]],
      ca:['', [Validators.required, this.validateCP]],
      thal:['', [Validators.required, this.validateCP]],
    });
  }

    validateNumber(control: any) {
    if (/^\d+$/.test(control.value)) {
      return null; // Valid number
    } else {
      return { invalidNumber: true }; // Invalid number
    }
  }

  validateCP(control:any)
  {
    const value = parseFloat(control.value);
    if (isNaN(value) || value < 0 || value > 3) {
      return { invalidNumber: true };
    }
    return null;
  }

  validateFbs(control:any)
  {
    const value = parseFloat(control.value);
    if (isNaN(value) || value < 0 || value > 1) {
      return { invalidNumber: true };
    }
    return null;
  }

  validateRestecg(control:any)
  {
    const value = parseFloat(control.value);
    if (isNaN(value) || value < 0 || value > 2) {
      return { invalidNumber: true };
    }
    return null;
  }
  
    predict(formDataRead:any): any {
     let data = {
       // age: 25, "sex": 1,"cp": 0,"trestbps": 125,"chol": 212,"fbs": 0,"restecg": 1,"thalach": 168,"exang": 0,"oldpeak": 1,"slope": 2,"ca": 2,"thal": 3 // Example data, replace with actual data
        // Add other feature values

        age: parseInt(formDataRead.age), 
        "sex": formDataRead.sex=='female'?0:1,
        "cp": parseInt(formDataRead.cp),
        "trestbps": parseInt(formDataRead.trestbps),
        "chol": parseInt(formDataRead.chol),
        "fbs": parseInt(formDataRead.fbs),
        "restecg": parseInt(formDataRead.restecg),
        "thalach": parseInt(formDataRead.thalach),
        "exang": parseInt(formDataRead.exang),
        "oldpeak": parseInt(formDataRead.oldpeak),
        "slope": parseInt(formDataRead.slope),
        "ca": parseInt(formDataRead.ca),
        "thal": parseInt(formDataRead.thal) // Example data, replace with actual data
        // Add other feature values
       };
  
      this.apiService.predict(data).subscribe(
        response => {
          return this.prediction = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    }

    onSubmit() {
      // Here you can handle form submission, for now, let's just log the data
      console.log("Enetering submit",this.form.value);
  //  if(this.form.valid)

    this.prediction = this.predict(this.form.value);
        console.log("Enetering submit",this.form.valid,this.prediction);

        this.openPopup(this.prediction)

    }
  
    resetForm() {
      console.log("Inside reset")
      // this.formData = {
      //   gender: '',
      //   name: ''
      // };
    }

    openPopup(prediction:any) {
      this.dialog.open(PopUpComponent, {
        width: '250px',
        data: { message: prediction } // You can pass data to the popup if needed
      });
    }
}
