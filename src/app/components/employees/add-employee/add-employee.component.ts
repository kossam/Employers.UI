import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  submitted = false;
  
  addEmployeeRequest: Employee ={
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''

  }

  constructor(private employeesService: EmployeesService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    });
  }
  get f() {
    return this.addEmployeeForm.controls;
  }
  addEmployee(){
    if (this.addEmployeeForm.invalid) {
      return
    }
    this.employeesService.addEmployee(this.addEmployeeForm.value).subscribe((response)=>{
      console.log(response)
      this.toastr.success('Employee Added Successfully', 'Success!')
      this.router.navigate(['employees']);
    }, (error) => {
      this.toastr.error(error.error)
    })
  }
}
