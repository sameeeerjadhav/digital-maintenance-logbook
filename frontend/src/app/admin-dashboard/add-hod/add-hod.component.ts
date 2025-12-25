import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HodService, Hod } from '../../services/hod.service';

@Component({
selector: 'app-add-hod',
standalone: true,
imports: [CommonModule, ReactiveFormsModule],
templateUrl: './add-hod.component.html',
styleUrls: ['./add-hod.component.css']
})
export class AddHodComponent implements OnInit {
form!: FormGroup;
loading = false;
editMode = false;
hodId!: number;
serverError = '';

departments = ['CSE', 'AIML', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'MBA', 'BBA'];

constructor(
private fb: FormBuilder,
private hodApi: HodService,
private route: ActivatedRoute,
public router: Router
) {}

ngOnInit() {
this.form = this.fb.group({
name: ['', [Validators.required, Validators.minLength(2)]],
email: ['', [Validators.required, Validators.email]],
department: ['', [Validators.required]],
collegeId: ['', [Validators.required, Validators.minLength(2)]],
password: ['']
});

this.route.params.subscribe(params => {  
  if (params['id']) {  
    this.editMode = true;  
    this.hodId = +params['id'];  
    this.loadHodData(this.hodId);  
  } else {  
    this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);  
    this.form.get('password')?.updateValueAndValidity();  
  }  
});
}

loadHodData(id: number) {
this.loading = true;
this.hodApi.getById(id).subscribe({
next: (hod) => {
this.form.patchValue({
name: hod.name,
email: hod.email,
department: hod.department,
collegeId: hod.collegeId
});
this.loading = false;
},
error: (err) => {
console.error('Failed to load HOD data', err);
this.loading = false;
this.serverError = 'Failed to load HOD details.';
}
});
}

submit() {
if (this.form.invalid) return;

this.loading = true;  
const payload: Hod = this.form.value;  

if (this.editMode) {  
  this.hodApi.update(this.hodId, payload).subscribe({  
    next: () => {  
      alert('HOD updated successfully ✅');  
      this.router.navigate(['/admin-dashboard/view-hods']);  
    },  
    error: (err) => {  
      console.error(err);  
      this.loading = false;  
      this.serverError = 'Failed to update HOD.';  
    }  
  });  
} else {  
  this.hodApi.create(payload).subscribe({  
    next: () => {  
      alert('HOD added successfully ✅');  
      this.router.navigate(['/admin-dashboard/view-hods']);  
    },  
    error: (err) => {  
      console.error(err);  
      this.loading = false;  
      this.serverError = 'Failed to add HOD.';  
    }  
  });  
}
}
}