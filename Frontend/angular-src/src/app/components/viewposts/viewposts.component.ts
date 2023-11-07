import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viewposts',
  templateUrl: './viewposts.component.html',
  styleUrls: ['./viewposts.component.css']
})
export class ViewpostsComponent {
  isTableVisible = false;
  postData:Array<any> = [];


  constructor(private authService:AuthService)
  {
    this.populateList();
  }

  deletePost(_id:String)
  {
    const userConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (userConfirmed)
    {
      this.authService.deleteByID(_id).subscribe(
        (response)=>{
          if (response)
          {
            this.postData = this.postData.filter(post => post._id !== _id);
          }
          else
          {
            alert('Failed to delete the post');
          }
        }
      )
      this.populateList();
    }
    else{
      alert('Post not deleted')
    }
        
  }

  showTable() 
  {
    this.authService.getAllPosts().subscribe(
      (response)=>{
        this.postData=response;
      }
    ) 
    this.isTableVisible = !this.isTableVisible;
  }

  populateList()
  {
    this.authService.getAllPosts().subscribe(
      (response)=>{
        this.postData=response;
      }
    )    
  }
}
