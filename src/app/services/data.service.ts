import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, collectionData, doc, query, where, orderBy } from
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

  public async getFilteredImage(beauty : boolean) {
    const imageCollection = collection(this.firestore, 'image');
    const q = query(imageCollection, where('Beauty', '==', beauty), orderBy('UploadDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const images = querySnapshot.docs.map((doc) => doc.data());
    return images;
  }

  public async saveImage(Beauty : boolean, ImageBase64 : string, UIDUser : string, UploadDate : string) {
    const imageCollection = collection(this.firestore, 'image');

    await addDoc(imageCollection, {
      Beauty,
      ImageBase64,
      UIDUser,
      UploadDate,
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

  public async getUserVotedBeautyImageByUID(UIDUser: string)
  {
    const userCollection = collection(this.firestore, 'user');
    const userDoc = doc(userCollection, UIDUser);
    const userDocSnapshot = await getDoc(userDoc);
    if (userDocSnapshot.exists()) 
    {
      const userData = userDocSnapshot.data();
      return userData['VotedBeautyImage'];
    } 
    else 
    {
      return '';
    }
  }

  public async getUserUglyBeautyImageByUID(UIDUser: string)
  {
    const userCollection = collection(this.firestore, 'user');
    const userDoc = doc(userCollection, UIDUser);
    const userDocSnapshot = await getDoc(userDoc);
    if (userDocSnapshot.exists()) 
    {
      const userData = userDocSnapshot.data();
      return userData['VotedUglyImage'];
    } 
    else 
    {
      return '';
    }
  }

  // Supongamos que tienes un método para buscar el documento por campo
  public async getImageIdByImageBase64Value(Imagebase64Value: string) 
  {
    const userCollection = collection(this.firestore, 'image');
    const querySnapshot = await getDocs(userCollection);
  
    let foundId = ''; 
  
    querySnapshot.forEach((doc) => 
    {
      const userData = doc.data();
  
      if (userData['ImageBase64'] == Imagebase64Value) {
        foundId = doc.id; 
      }

    });
  
    return foundId; 
  }

  public async getImageBase64ByImageId(ImageId: string) 
  {
    const imageCollection = collection(this.firestore, 'image');
    const imageDoc = doc(imageCollection, ImageId);
  
    try
     {
      const imageSnapshot = await getDoc(imageDoc);

      if (imageSnapshot.exists()) 
      {
        const imageData = imageSnapshot.data();

        if (imageData && imageData['ImageBase64']) 
        {
          return imageData['ImageBase64'];
        }
      }
    } 
    catch (error) 
    {
      return '';
    }
  }

  public async updateVotedBeautyImage(UIDUser : string, ImageId : string)
  {
    const userCollection = collection(this.firestore, 'user');
    const userDoc = doc(userCollection, UIDUser);
    const userDocSnapshot = await getDoc(userDoc);
    try 
    {
      updateDoc(userDoc, 
      {
        VotedBeautyImage: ImageId,
      });
      return true;
    } 
    catch (error) 
    {
      return false; 
    }

  }

  public async updateVotedUglyImage(UIDUser : string, ImageId : string)
  {
    const userCollection = collection(this.firestore, 'user');
    const userDoc = doc(userCollection, UIDUser);
    const userDocSnapshot = await getDoc(userDoc);
    try 
    {
      updateDoc(userDoc, 
      {
        VotedUglyImage: ImageId,
      });
      return true;
    } 
    catch (error) 
    {
      return false; 
    }

  }
}

