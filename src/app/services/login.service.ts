import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {

   }
  // /method to generate token
   public generateToken(loginData:any)
   {
return this.http.post(`${baseUrl}/generate-token`,loginData);
   }
   //getting user details who is currently logged in
   public getCurrentUser()
   {
     return this.http.get(`${baseUrl}/current-user`);
   }
   //login user:set token in localStorage
   public loginUser(token)
   {
     //in key value form
     localStorage.setItem("token",token);
     return true;

   }
   //isLogin:user is logged in or not
   public isLoggedIn()
   {
     //key name
     let tokenString=localStorage.getItem("token");
     if(tokenString==undefined||tokenString==""||tokenString==null)
     {
       return false;
     }
     else{
       return true;
     }
   }
   //logout:remove token from local storage
   public logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;  
  }
  //get token
  public getToken()
  {
    return localStorage.getItem("token");
  }
  //set user details
  public setUser(user)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }
  //get user
  public getUser()
  {
    let userString=localStorage.getItem("user");
    if(userString!=null)
    {
      return JSON.parse(userString);
    }else{
      this.logout();
      return null;
    }
  }
  //get user role
  public getUserRole()
  {
    let user=this.getUser();
    return user.authorities[0].authority;
    
  }
  }

