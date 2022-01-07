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
  hasPhotosToSynch: boolean = false;

  constructor(private storage: Storage) {
    this.list = new Array();
  }

  ngOnInit() {
    

    this.getAllFavorites().then(v => {
     
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
        if (key.indexOf('picture') !== -1) {
          var item =
          {
            key: key,
            value: value
          }
          this.list.push(item);
          this.hasPhotosToSynch = true;
        }
       
      }).then((d) => {
        resolve(this.list);
      });
    });
    return promise;
  }


  synchPhotosFull() {
   
    console.log(this.list);

    this.list.forEach(x => {
      if (x['key'].indexOf('picture') !== -1) {
        console.log(x['key']);

        //var myFullValue =
        //{
        //  actionID: this.action.installationScheduleCurrentID,
        //  //baseImage: 'data:image/jpeg;base64,' + btoa(photos["baseImage"]),
        //  baseImage: x['value'],
        //  id: 1,
        //  keyId: x['key']
        //}

        //this.opsUniversalService.uploadBaseFile(myFullValue).subscribe(
        //  data => {

        //    //var IdToDelete = this.photosToUpload[counter].id;
        //    //this.keyRange.push(IdToDelete);
        //    if (data != null && data != 0) {
        //      this.deleteImage(myFullValue.keyId);
        //    }
        //    else {
        //    }
        //    // this.getImagesToSync();
        //    //IDBKeyRange Key = { actionId: this.photosToUpload[counter].actionID}

        //  },
        //  err => {

        //  }
        //);

      }
    });

    //this.storage.get('imageToUpload').then(result => {
    //  if (result != null) {
    //    var myFullValue =
    //    {
    //      actionID: this.action.installationScheduleCurrentID,
    //      //baseImage: 'data:image/jpeg;base64,' + btoa(photos["baseImage"]),
    //      baseImage: result,
    //      id: 1
    //    }
     
    //    this.opsUniversalService.uploadBaseFile(myFullValue).subscribe(
    //      data => {

    //        //var IdToDelete = this.photosToUpload[counter].id;
    //        //this.keyRange.push(IdToDelete);
    //        if (data != null && data != 0) {
    //          //this.deleteImage(myFullValue.id);
    //        }
    //        else {
    //        }
    //        // this.getImagesToSync();
    //        //IDBKeyRange Key = { actionId: this.photosToUpload[counter].actionID}

    //      },
    //      err => {

    //      }
    //    );
    //  }
    //}).catch(e => {
    //  console.log('error: ' + e);
    //  // Handle errors here
    //});


  }
}
