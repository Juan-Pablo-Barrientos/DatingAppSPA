import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Photo } from 'src/app/modules/shared/models/Photo';
import { AlertifyService } from 'src/app/modules/shared/services/alertify.service';
import { UserLikesListComponent } from 'src/app/modules/userFeatures/components/userLikesList/userLikesList.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photoEdit',
  templateUrl: './photoEdit.component.html',
  styleUrls: ['./photoEdit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input() photos: Photo[] | undefined;
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader!:FileUploader;
  hasBaseDropZoneOver!:boolean;
  baseUrl = environment.apiUrl;
  currentMain!: Photo;

  constructor (private authService: AuthService, private userService: UserService, private alertify:AlertifyService){

  }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }


  initializeUploader(){
    let userNameId=this.authService.jwtHelper.decodeToken(this.authService.savedToken).nameid
      this.uploader = new FileUploader({
        url: this.baseUrl + 'users/' + userNameId + '/photos',
        authToken: 'Bearer '+ localStorage.getItem('token'),
        isHTML5:true,
        removeAfterUpload:true,
        autoUpload:false,
        maxFileSize: 10 * 1024 * 1024,
        formatDataFunction: async (item:any) => {
          return new Promise( (resolve, reject) => {
            resolve({
              name: item._file.name,
              length: item._file.size,
              contentType: item._file.type,
              date: new Date()
            });
          });
        }
      });

      this.uploader.onAfterAddingFile = (file) =>{file.withCredentials = false}
      this.uploader.onSuccessItem = (item, response, status, headers) =>{
        if(response)
        {
          const res: Photo = JSON.parse(response);
          const photo = {
            id:res.id,
            url:res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            isMain: res.isMain
          };
          this.photos?.push(photo);
          if(photo.isMain){
            this.authService.changeMemberPhoto(photo.url);
            this.authService.currentUser!.photoUrl= photo.url;
            localStorage.setItem('user', JSON.stringify(this.authService.currentUser))
          }
        }
      }
  }

  setMainPhoto(photo: Photo){
    let userNameId=this.authService.jwtHelper.decodeToken(this.authService.savedToken).nameid
    this.userService.setMainPhoto(userNameId, photo.id).subscribe({
      next: ()=>{
        this.currentMain = this.photos?.filter(p=>p.isMain === true)[0]!;
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser!.photoUrl= photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser))
      },
      error: error =>{
        this.alertify.error(error);
      }
    });
  }

  deletePhoto(id : number){
    let userNameId=this.authService.jwtHelper.decodeToken(this.authService.savedToken).nameid
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(userNameId, id).subscribe({
        next: ()=>{
        this.photos?.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Photo has been deleted')
        },
        error: () =>{
          this.alertify.error('Failed to delete photo')
        }
      })
    })
  }


}
