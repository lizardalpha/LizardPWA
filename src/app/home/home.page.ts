import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  myImage = null;
  position: Position = null;
  photosValues: any[];
  list: any[];

  constructor(private storage: Storage) {
    this.list = new Array();

    this.getAllFavorites().then(v => {
      console.log(v);
    });
   
    this.loadToken((result?: any) => {
      // here your result

      console.log(result);
    });
  }




  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true,
      
    });

    this.myImage = image.webPath;
    const base64Data = await this.readAsBase64(this.myImage);
    this.setData('image',this.myImage);
    var countStart = 0;
    var countEnd = 500;
    while (countStart < countEnd) {

      this.setData('base64'+ countStart, base64Data);
      countStart += 1;
    }
  

  }


  setData(name,value: any) {
    // Store the value under "my-key"

    this.storage.set(name, value);
  
  }

  // to get a key/value pair
  public loadToken(handler: (result?: any) => void): void {
    this.storage.get("my-key")
      .then(v => {
        this.setPhotosValues(v);
        handler(v);
      });
  }


  setPhotosValues(photos) {
    this.photosValues = photos;

  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    this.position = coordinates;
  }

  async share() {
    await Share.share({
      title: 'Come and find me',
      text: `Here's my current location: 
        ${this.position.coords.latitude}, 
        ${this.position.coords.longitude}`,
      url: 'http://ionicacademy.com/'
    });
  }



  private async readAsBase64(photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }


  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  getAllFavorites() {
    var promise = new Promise((resolve, reject) => {
      this.storage.forEach((value, key, index) => {
        this.list.push(value);
      }).then((d) => {
        resolve(this.list);
      });
    });
    return promise;
  }
}
