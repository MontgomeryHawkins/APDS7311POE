import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: String='';
  password: String='';
  firstname: String='';
  lastname: String='';

  constructor(private validateService: ValidateService,private authService: AuthService,private router: Router) {}

  onRegisterSubmit()
  {
    const user = {
      username: this.username,
      password: this.password,
      firstname:this.firstname,
      lastname:this.lastname
    }

    if (!this.validateService.validateRegister(user)){
        alert('Please fill in all fields and make sure username and password are 3 characters or longer')
        return false;
    }
    
    this.authService.registerUser(user).subscribe({
      error: (e) => alert('Error while registering'),
      complete: () => {
        alert('You are now registered');
        this.router.navigate(['/login']);
    }
  })

    return true;
  }
  
  
}
