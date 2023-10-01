import { Component, OnInit } from '@angular/core';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
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
  imageVotes: { [key: string]: { like: boolean } } = {};
  selectedImage: string | null = null;
  public isBeautyValue : any;

  constructor(private auth : AutheticationService, private router : Router, public data : DataService, private route : ActivatedRoute) 
  { 
  }

  public OnLogoutClick()
  {
    this.auth.logOut().then(() => {
      this.router.navigate(['/login'])
    });
  }

  async ngOnInit() 
  {
    console.log('hola');
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.isBeautyValue = navigation.extras.state['isBeautyValue'];
      console.log(this.isBeautyValue);
    }
    this.getVotedImage();
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

  public async likeImage(image: any) 
  {
    // Verifica si ya existe una imagen seleccionada
    if (this.selectedImage) 
    {
      // Desactiva el "me gusta" de la imagen anterior
      this.imageVotes[this.selectedImage].like = false;
    }
    // Marca la imagen actual como votada
    this.selectedImage = image.ImageBase64;
    // Activa el "me gusta" de la imagen actual
    this.imageVotes[image.ImageBase64] = { like: true };  
    
    const UIDUser = await this.auth.getUserUid() || '';
    const ImageId = await this.data.getImageIdByImageBase64Value(image.ImageBase64) || '';

    await this.data.updateVotedBeautyImage(UIDUser, ImageId);
  }

  public async getVotedImage()
  {
    const UIDUser = await this.auth.getUserUid() || '';
    const ImageId = await this.data.getUserVotedBeautyImageByUID(UIDUser);
    const ImageBase64 = await this.data.getImageBase64ByImageId(ImageId);

    if (ImageBase64) 
    {
      this.selectedImage = ImageBase64;
      this.imageVotes[ImageBase64] = { like: true };
    }
  }

}
