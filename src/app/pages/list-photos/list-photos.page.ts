import { Component, OnInit} from '@angular/core';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType} from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { DataService } from 'src/app/services/data.service';
import { Query } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.page.html',
  styleUrls: ['./list-photos.page.scss'],
})
export class ListPhotosPage implements OnInit {
  [x: string]: any;

  public images : any;
  public imageBase64 : string = "";
  public userName : any;
  resolvedUserNames: { [key: string]: string } = {};
  imageVotes: { [key: string]: { like: boolean } } = {};
  selectedImage: string | null = null;
  public isBeautyValue : any;
  public nameUser : string = "";

  constructor(private auth : AutheticationService, private router : Router, public data : DataService, private route : ActivatedRoute) 
  { 
  }

  public OnLogoutClick()
  {
    this.auth.logOut().then(() => {
      this.router.navigate(['/login'])
    });
  }

  public OnChartClick()
  {
    this.router.navigate(['/charts']);
  }

  async ngOnInit() 
  {
    let userUID = await this.auth.getUserUid() || '';
    this.nameUser = await this.data.getUserNameByUID(userUID);
    this.getVotedImage();
    try {
      this.images = await this.data.getFilteredImage(true);
      console.log(this.images);
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
      source: CameraSource.Camera
    });

    this.imageBase64 = image.base64String || '';
    let userUid = await this.auth.getUserUid() || '';
    this.data.saveImage(true, this.imageBase64, userUid, new Date().toISOString().slice(0, 10));
    this.images = await this.data.getFilteredImage(true);
    this.resolveUserNames();
  }

  public async OnSelectImagesClick()
  {
    const photos = await Camera.pickImages({
      quality: 90,    
    });

    photos.photos.forEach(async photo => {
      let image = await this.blobToBase64(photo.webPath || '');
      let userUid = await this.auth.getUserUid() || '';
      this.data.saveImage(true, image, userUid, new Date().toISOString().slice(0, 10));
      this.images = await this.data.getFilteredImage(true);
      this.resolveUserNames();
    });
  }

  public async blobToBase64(blobUrl: string): Promise<string> {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const base64String = reader.result.split(',')[1]; // Obtener la parte base64 después de la coma
            resolve(base64String);
          } else {
            reject('Error al convertir el blob a base64.');
          }
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw error;
    }
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

  public async likeImage(image: any) 
  {
    // Verifica si ya existe una imagen seleccionada
    if (this.selectedImage) 
    {
      // Desactiva el "me gusta" de la imagen anterior
      this.imageVotes[this.selectedImage].like = false;
      const OldImageId = await this.data.getImageIdByImageBase64Value(this.selectedImage || '') || '';
      await this.data.updateVotesImges(OldImageId, -1);
    }
    // Marca la imagen actual como votada
    this.selectedImage = image.ImageBase64;
    // Activa el "me gusta" de la imagen actual
    this.imageVotes[image.ImageBase64] = { like: true };  
    
    const UIDUser = await this.auth.getUserUid() || '';
    const ImageId = await this.data.getImageIdByImageBase64Value(image.ImageBase64) || '';

    await this.data.updateVotesImges(ImageId, 1);
    await this.data.updateVotedBeautyImage(UIDUser, ImageId);
  }

  public async getVotedImage()
  {
    const UIDUser = await this.auth.getUserUid() || '';
    const ImageId = await this.data.getUserVotedBeautyImageByUID(UIDUser);
    if(ImageId)
    {
      const ImageBase64 = await this.data.getImageBase64ByImageId(ImageId);
  
      if (ImageBase64) 
      {
        this.selectedImage = ImageBase64;
        this.imageVotes[ImageBase64] = { like: true };
      }
    }
  }

}
