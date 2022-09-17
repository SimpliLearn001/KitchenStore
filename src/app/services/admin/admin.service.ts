import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  admins:AngularFireList<IUser>;
  auth:any;
  constructor(private fireDataBase:AngularFireDatabase) {
    this.admins = this.fireDataBase.list("admins");
   }

   getAdmins(){
    return this.admins;
   }

   async isAuthenticated():Promise<boolean> {
    await this.fireDataBase.database.ref("adminAuthentication").child("isAuth").once("value", sanp => {
      console.log("as auth", sanp.val());
      this.auth = sanp.val();
    }); 
    console.log("admin service",this.auth);
    return this.auth;
   }

   async checkAdmin(adminname:any,password:any){
    let check:boolean=false
    await this.admins.query.once("value",snap => {
      snap.forEach(admin => {
        if(admin.child("username").val() == adminname && admin.child("password").val() == password){
          check = true;
          this.fireDataBase.database.ref("adminAuthentication").update({"isAuth":true});
        }
      });
    });
    if(!check) this.fireDataBase.database.ref("adminAuthentication").update({"isAuth":false});
   }
   
   async adminLogout(){
    await this.fireDataBase.database.ref("adminAuthentication").update({"isAuth":false});
   }

}
