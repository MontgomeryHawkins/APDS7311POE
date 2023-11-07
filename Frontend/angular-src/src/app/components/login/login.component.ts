import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
username: String='';
password: String='';

constructor(private authService: AuthService,private router:Router)
{

}
onLoginSubmit()
{
  const user = {
    username: this.username,
    password: this.password
  }
  this.authService.authenticateUser(user).subscribe(
    (data: any) => {
      this.authService.storeToken(data.token);
      alert('You are now logged in!');
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      alert('Error logging in ');
    }
  );
  
}
}
