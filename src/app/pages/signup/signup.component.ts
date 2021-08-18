import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlSerializer } from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 public user={
   username:'',
   password:'',
   firstName:'',
   lastName:'',
   email:'',
   phone:'',
   about:''
    
 }
  constructor(private userService:UserService,private _snackBar: MatSnackBar) { }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  phonePattern="^[6-9]\\d{9}$";
  passwordPattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
  ngOnInit(): void {
  }
  formSubmit()
  {
    // alert("djhfheu");
    console.log("form data",this.user);
    if(this.user.username==''||this.user.username==null)
    {
      // alert("user is required");
      this._snackBar.open("Username is required!!","",{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center'
      })
      return;
    }
    //calling the add user api function from the user.service
    this.userService.addUser(this.user).subscribe(
      //success
      (data:any)=>{
        console.log("data ",data);
        // alert("success");
        Swal.fire('User is Successfully Registered !!',"User Id is "+data.id,"success")
        
      },
      //error
      (error)=>{
console.log(error);
// alert("something went wrong");
this._snackBar.open("Something went wrong!!","",{
  duration:3000,
  verticalPosition:'bottom',
  horizontalPosition:'center'
})

      }
    );
    
  }
}
