import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {LoginService} from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginData={
  "username":'',
  "password":''
}

  constructor(private snack:MatSnackBar,private login:LoginService) { }

  ngOnInit(): void {
  }
  formSubmit()
  {
    console.log("login data",this.loginData);
    if(this.loginData.username.trim()=='' || this.loginData.username.trim()==null)
    {
      this.snack.open("Username should not be empty.","",{
        duration:3000,
      })
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password.trim()==null)
    {
      this.snack.open("Password should not be empty.","",{
        duration:3000,
      })
      return;
    }
    //request the backend- server to generate the token
     this.login.generateToken(this.loginData).subscribe(
       (data:any)=>{
         console.log("success");
         console.log(data);
         //LOGIN
         this.login.loginUser(data.token);

//THIS url cannot be directly access due to jwt auth. 
//therefore we need to pass token along with it in the header in order to access this url
         this.login.getCurrentUser().subscribe(
           (user:any)=>{
this.login.setUser(user);
console.log("User logged in",user);
//redirect to.....ADMIN: admin-dashboard
//redirect to.....NORMAL: normal-dashboard

           }

         );
         
       },
       (error)=>{
         console.log("error",error);
         
       }
     )
  }

}
