import { Component, OnInit } from '@angular/core';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  public nameUser : string = "";

  constructor(private auth : AutheticationService, private router : Router, private data : DataService) {
   }

  public OnLogoutClick()
  {
    this.auth.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  public OnChartClick()
  {
    this.router.navigate(['/charts'], { onSameUrlNavigation: 'reload' });
  }

  public OnViewBeautyPhotoClick()
  {
    let isBeautyValue = true;
    this.router.navigate(['/list-photos'], { onSameUrlNavigation: 'reload' })
  }

  public OnViewUglyPhotoClick()
  {
    let isBeautyValue = false;
    this.router.navigate(['/list-ugly-photos'], { onSameUrlNavigation: 'reload' })
  }
  async ngOnInit(){
    let userUID = await this.auth.getUserUid() || '';
    this.nameUser = await this.data.getUserNameByUID(userUID);
  }

}
