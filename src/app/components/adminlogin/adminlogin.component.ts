import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  adminForm!: FormGroup;
  constructor(private adminService: AdminService, private router:Router) { }

  get admin(){
    return this.adminForm.get('admin');
  }
  get password(){
    return this.adminForm.get('password');
  }
  ngOnInit(): void {
    this.adminForm = new FormGroup(
      {
        admin: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required)
      }
    );
  }

  submit() {
    let username = this.adminForm.get('admin')?.value;
    let password = this.adminForm.get('password')?.value;
    this.adminService.checkAdmin(username, password);
    let tempCheck: boolean = false;
    this.adminService.isAuthenticated().then((check) => {tempCheck = check;
      if (tempCheck) {
        Swal.fire('Yes!', 'Admin LogIn Success!!!', 'success');
        this.router.navigate(['manage-products']);
      }
      else
        Swal.fire('Invalid Credentials!', 'Admin LogIn Failed', 'error');
    })
  }

}
