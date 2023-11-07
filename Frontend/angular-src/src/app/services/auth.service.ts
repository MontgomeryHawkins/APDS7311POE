import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
interface Post 
  {
    _id:String;
    title:String;
    description:String;
    departmentCode:String;
  }
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  registerUser(user: any) 
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('https://localhost:3000/api/users/signup', user, { headers });
  }

  createPost(post: any)
  {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken).set('Content-Type', 'application/json');
    return this.http.post('https://localhost:3000/api/posts/new', post, {headers})
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  loggedIn()
  {
    if (this.isTokenExpired(this.authToken)) {
      return false;
    } else {
      return true;
    }
  }

  authenticateUser(user:any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('https://localhost:3000/api/auth/login', user, { headers });
  }

  storeToken(token:any)
  {
      localStorage.setItem('id_token',token);
      this.authToken=token;
  }

  loadToken()
  {
    const token  = localStorage.getItem('id_token');
    this.authToken=token;
  }

  logout()
  {
    this.authToken=null;
    localStorage.clear();
  }

  deleteByID(_id:String)
  {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken).set('Content-Type', 'application/json');
    return this.http.delete('https://localhost:3000/api/posts/' + _id, {headers})
  }

  getAllPosts()
  {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken).set('Content-Type', 'application/json');
    return this.http.get<Post[]>('https://localhost:3000/api/posts/all', {headers})
  }
}
