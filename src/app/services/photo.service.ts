import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  constructor(private storage: AngularFireStorage) { }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri, // file-based data; provides best performance
    source: CameraSource.Camera, // automatically take a new photo with the camera
    quality: 100 // highest quality (0 to 100)
  });


  const base64Data = await this.readAsBase64(capturedPhoto);




    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath


    }
    


    );
    this.photos.slice(-1)

    const filePath = "1";
    // Crea una referencia de acceso
    const fileRef = this.storage.ref(filePath);

    fileRef.putString(base64Data, 'data_url').then(function (snapshot) {
      console.log('Uploaded a data_url string!');
    })

    console.log(capturedPhoto.base64String)

    
  }














}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}


