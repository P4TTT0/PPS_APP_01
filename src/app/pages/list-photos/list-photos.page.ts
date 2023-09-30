import { Component, OnInit } from '@angular/core';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Route, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { DataService } from 'src/app/services/data.service';
import { Query } from '@angular/fire/firestore';

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.page.html',
  styleUrls: ['./list-photos.page.scss'],
})
export class ListPhotosPage implements OnInit {

  public images : any;
  public imageBase64 : string = "";
  public userName : any;
  resolvedUserNames: { [key: string]: string } = {};
  imageVotes: { [key: string]: { like: boolean; dislike: boolean } } = {};

  constructor(private auth : AutheticationService, private router : Router, public data : DataService) 
  { 
  }

  public OnLogoutClick()
  {
    this.auth.logOut().then(() => {
      this.router.navigate(['/login'])
    });
  }

  async ngOnInit() {
    try {
      this.images = await this.data.getImages();
    } catch (error) {
      console.error(error);
    }
    this.resolveUserNames();
  }

  async OnTakePictureClick() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt
    });

    this.imageBase64 = image.base64String || '';
    let userUid = await this.auth.getUserUid() || '';
    this.data.saveImage(true, this.imageBase64, userUid);
    this.images = await this.data.getImages();
    this.resolveUserNames();
  }

  public async resolveUserNames() 
  {
    for (const image of this.images) 
    {
      try 
      {
        const userName = await this.data.getUserNameByUID(image['UIDUser']);
        this.resolvedUserNames[image['UIDUser']] = userName || 'User not found';
      } 
      catch (error) 
      {
        console.error('Error al obtener el nombre del usuario:', error);
        this.resolvedUserNames[image['UIDUser']] = 'User not found';
      }
    }
  }

  // Función para registrar la selección de "me gusta"
  likeImage(image: any) {
    if (!this.imageVotes[image['ImageBase64']]) {
      this.imageVotes[image['ImageBase64']] = { like: true, dislike: false };
    } else {
      this.imageVotes[image['ImageBase64']].like = !this.imageVotes[image['ImageBase64']].like;
      this.imageVotes[image['ImageBase64']].dislike = false;
    }
  }

  // Función para registrar la selección de "No me gusta" para una imagen específica
  dislikeImage(image: any) {
    if (!this.imageVotes[image['ImageBase64']]) {
      this.imageVotes[image['ImageBase64']] = { like: false, dislike: true };
    } else {
      this.imageVotes[image['ImageBase64']].like = false;
      this.imageVotes[image['ImageBase64']].dislike = !this.imageVotes[image['ImageBase64']].dislike;
    }
  }

}
