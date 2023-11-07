import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageposts',
  templateUrl: './manageposts.component.html',
  styleUrls: ['./manageposts.component.css']
})
export class ManagepostsComponent {
title: String='';
description: String='';
departmentcode: String='';

constructor(private router:Router,private authService:AuthService){}
onCreateSubmit()
{
  const post = {
    title: this.title,
    description: this.description,
    departmentCode: this.departmentcode
  }
  
  this.authService.createPost(post).subscribe({
    error: (e) => alert('Post details invalid'),
    complete: () => {
      alert('Post created!');
  }
})
}
}
