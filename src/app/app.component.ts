import { Component,OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './Interface/user';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-http-api';
  private user:any={
    'id':2,
    'name': 'SM_2 Farhad Hossain',
    'username': 'farhad',
    'email': 'farhad@april.biz'
  };

  fileStatus={status:'',percentage:0};

  constructor(private userService: UserService) {}

  ngOnInit():void{
    //this.onUpdateUser();
    this.onGetUsers();
    //this.onPatchUser();
    //this.onGetUser();
    //this.onCreateUser();
    //this.onDelete();
    
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe(
      (response)=>console.table(response),
      (error: any)=>console.log(error),
      ()=>console.log('Done onGetUsers users')
    )
  }
  onGetUser(): void {
    this.userService.getUser().subscribe(
      (response)=>console.log(response),
      (error: any)=>console.log(error),
      ()=>console.log('Done onGetUser users')
    )
  }
  onCreateUser(): void {
    this.userService.createUser(this.user).subscribe(
      (response)=>console.log(response),
      (error: any)=>console.log(error),
      ()=>console.log('Done onCreateUser users')
    )
  }
  onUpdateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (response)=>console.log(response),
      (error: any)=>console.log(error),
      ()=>console.log('Done onUpdateUser users')
    )
  }
  onPatchUser(): void {
    this.userService.patchUser(this.user).subscribe(
      (response)=>console.log(response),
      (error: any)=>console.log(error),
      ()=>console.log('Done onPatchUser users')
    )
  }
  onDelete():void{
    this.userService.deleteUser(1).subscribe(
      (response)=>console.log('Response from delete:',response),
      (error: any)=>console.log(error),
      ()=>console.log('Done onPatchUser users')
    )
  }
  onUploadFiles(files:any):void {
    console.log('Test 1');
    console.log(files.target.files);
    console.log('Test 2');
    let allFiles = files.target.files;
    console.log(allFiles);
    const formData = new FormData();
    for (const file of allFiles) {
      console.log(file);
      
      formData.append('files',file,file.name);
    }
    this.fileStatus.percentage=100;
    this.userService.uploadFiles(formData).subscribe(
      (event)=>{
       
        
        switch(event.type){
          case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
            console.log(event);
            this.fileStatus.percentage = Math.round(100*event.loaded/event.type);
            console.log(this.fileStatus);
            break;
          case HttpEventType.Response:
            this.fileStatus.percentage = 100;
            this.fileStatus.status = 'done';
            console.log(this.fileStatus);
            break;
        }
      },
      (error: any)=>console.log(error),
      ()=>console.log('Done onPatchUser users')
    )
  }
}
