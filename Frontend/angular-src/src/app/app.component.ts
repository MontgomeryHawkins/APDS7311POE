import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-src';
  constructor(private authService:AuthService){}
  
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    // Remove the user's token when the tab is closed
    this.authService.logout();
  }
}
