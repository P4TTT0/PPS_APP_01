import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, collectionData, doc } from
'@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore : Firestore) { }

  public async getImages()
  {
    const imageCollection = collection(this.firestore, 'image');
    const querySnapshot = await getDocs(imageCollection);
    const images = querySnapshot.docs.map(doc => doc.data());
    return images;
  }

  public async saveImage(Beauty : boolean, ImageBase64 : string, UIDUser : string) {
    const imageCollection = collection(this.firestore, 'image');

    await addDoc(imageCollection, {
      Beauty,
      ImageBase64,
      UIDUser,
    });
  }

  public async getUsers()
  {
    const imageCollection = collection(this.firestore, 'user');
    const querySnapshot = await getDocs(imageCollection);
    const images = querySnapshot.docs.map(doc => doc.data());
    console.log(images);
  }

  public async getUserNameByUID(UIDUser: string)
  {
    const userCollection = collection(this.firestore, 'user');
    const userDoc = doc(userCollection, UIDUser);
    const userDocSnapshot = await getDoc(userDoc);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData['Nombre'];
    } 
    else 
    {
      console.log('User not found');
      return '';
    }
  }
}

