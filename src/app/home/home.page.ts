import { Component } from '@angular/core';
import { AutheticationService } from 'src/app/services/authetication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(private auth : AutheticationService, private router : Router) {}

  public OnLogoutClick()
  {
    this.auth.logOut().then(() => {
      this.router.navigate(['/login'])
    });
  }

  public OnViewBeautyPhotoClick()
  {
    let isBeautyValue = true;
    this.router.navigate(['/list-photos'], { state: { isBeautyValue } })
  }

  public OnViewUglyPhotoClick()
  {
    let isBeautyValue = false;
    this.router.navigate(['/list-ugly-photos'], { state: { isBeautyValue } })
  }

}
