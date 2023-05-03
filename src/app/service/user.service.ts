import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs'
import { User } from '../Interface/user';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(): Observable <HttpEvent<User[]>> {
    let myHeaders = new HttpHeaders({'myheader':'headerValue','myheader2':'headerValue3'});
    //myHeaders = myHeaders.set('id','123454');
    //myHeaders = myHeaders.append('id','354656');
    // paramas 1
    // let myparams = new HttpParams().set('page','5').set('sort','true'); 
    // let myparams = new HttpParams({ fromObject: { page: '6', sort: 'true' } });
    let myparams = new HttpParams({fromString: 'name=Junior&id=58'});
    return this.http.get <User[]>(`${this.apiUrl}/users`,{headers:myHeaders,params:myparams,observe:'events',reportProgress:true});

  }
  getUser(): Observable <User> {
    return this.http.get <User>(`${this.apiUrl}/users/1`);
  }
  createUser(user:User): Observable <User> {
    return this.http.post <User>(`${this.apiUrl}/users`,user);
  }
  updateUser(user:User): Observable <User> {
    return this.http.put <User>(`${this.apiUrl}/users/${user.id}`,user);
  }
  patchUser(user:User): Observable <User> {
    return this.http.patch <User>(`${this.apiUrl}/users/${user.id}`,user);
  }
  deleteUser(id:number): Observable <unknown> {
    return this.http.delete<unknown>(`${this.apiUrl}/users/${id}`);
  }
  uploadFiles(formData: FormData): Observable<HttpEvent<string[]>> {
    let headers = new HttpHeaders();
    //headers.append('Access-Control-Allow-Origin', *);
    ////headers.append('Access-Control-Allow-Credentials', 'true');
    //headers.append('Access-Control-Allow-Methods', 'POST');
    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', 'application/json');
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    //headers.append('Origin','http://localhost:4200');
    return this.http.post<string[]>(`http://localhost:8000/test-upload`,
          formData,{headers:headers,observe:'events',reportProgress:true}
    );
  }
}

