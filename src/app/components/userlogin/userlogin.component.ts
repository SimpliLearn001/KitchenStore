import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {

  userForm!: FormGroup;
  constructor(private userService: UserService, private router: Router, private fireDataBase: AngularFireDatabase) { }

  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }
  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    );
  }

  submit(): void {
    let username = this.userForm.get('username')?.value;
    let password = this.userForm.get('password')?.value;
    this.userService.checkUser(username, password);
    let tempCheck: boolean = false;
    this.userService.isAuthenticated().then((check) => {tempCheck = check;
      if (tempCheck) {
        Swal.fire('Yes!', 'LogIn Success!!!', 'success');
        this.router.navigate(['products']);
      }
      else
        Swal.fire('Invalid Credentials!', 'LogIn Failed', 'error');
    })
  }

}
