import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence
} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})

export class AutheticationService 
{
  constructor(public ngFireAuth : AngularFireAuth) {}

  public async logIn(email : string, password : string)
  {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  public async logOut()
  {
    return await this.ngFireAuth.signOut();
  }

  public async getUserUid()
  {
    return new Promise<string | null>((resolve, reject) => 
    {
      this.ngFireAuth.authState.subscribe(user => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null); 
        }
      });
    });
  }
}
