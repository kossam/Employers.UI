import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  employeeDetails: Employee= {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  }

  constructor(
    private route: ActivatedRoute, 
    private employeeService: EmployeesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    });
    
    this.route.paramMap.subscribe((params)=>{
     const id = params.get('id');
     if(id){
      this.employeeService.getEmployee(id).subscribe((response)=>{
        this.employeeDetails = response;
        console.log(response)
      })
     }
    })
  }
  get f() {
    return this.addEmployeeForm.controls;
  }
  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeDetails.id, this.employeeDetails).subscribe((response)=>{
      console.log(response);
      this.toastr.success('Employee Updated Successfully', 'Updated!')
      this.router.navigate(['/employees']);
    });
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.employeeDetails.id).subscribe((response)=>{
      console.log(response);
      this.toastr.success('Employee Deleted Successfully', 'Deleted!')
      this.router.navigate(['/employees'])
    }, (error) => {
        this.toastr.error('Oops Something Went Wrong', error.error);
        console.log(error)
      })
  }

}
