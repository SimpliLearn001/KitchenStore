import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users:AngularFireList<IUser>;
  auth:any;
  constructor(private fireDataBase:AngularFireDatabase) {
    this.users = this.fireDataBase.list("users");
   }

   async isAuthenticated():Promise<boolean> {
    await this.fireDataBase.database.ref("authentication").child("isAuth").once("value", sanp => {
      console.log("us auth", sanp.val());
      this.auth = sanp.val();
    }); 
    console.log("user service",this.auth);
    return this.auth;
   }
   getUsers(){
    return this.users;
   }

   async checkUser(username:any,password:any){
    let check:boolean=false
    await this.users.query.once("value",snap => {
      snap.forEach(user => {
        if(user.child("username").val() == username && user.child("password").val() == password){
          check = true;
          this.fireDataBase.database.ref("authentication").update({"isAuth":true});
        }
      });
    });
    if(!check) this.fireDataBase.database.ref("authentication").update({"isAuth":false});
   }
   async logout(){
    await this.fireDataBase.database.ref("authentication").update({"isAuth":false});
   }
}
