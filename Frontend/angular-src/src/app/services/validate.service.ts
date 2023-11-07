import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: any)
  {
      if(user.username == ''  || user.password == '' || user.firstname == '' || user.lastname == '' || user.username.length<4 || user.password.length<4){
          return false
      }
      else{
        return true;
      }      
  }
}
