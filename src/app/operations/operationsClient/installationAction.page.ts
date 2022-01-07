import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraDirection, CameraOptions, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Constants } from '../../_config/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpsClientService } from '../../_services/opsClient.service';
import { Storage } from '@ionic/storage-angular';
import { CampaignVisit, StoreVisitModel } from '../../_models/StoreVisitModel';
import { IonicSelectableComponent  } from 'ionic-selectable';
import { OpsAdminService } from '../../_services/opsAdmin.service';
import { ItemsearchPipe } from '../../directives/itemsearchpipe.component';
import { OpsUniversalService } from '../../_services/opsUniversal.service';
import { CompressImageService } from '../../_services/CompressImageService.component';
import { CompressNormalImagesService } from '../../_services/CompressNormalImagesService.component';
import { take } from 'rxjs/operators';
import { ExifService } from '../../_services/exif.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var jQuery: any;
@Component({
    selector: 'app-installationActions',
  templateUrl: './installationAction.page.html',
  styleUrls: ['installationAction.page.scss'],
    
})


export class OpsHomeClientStoresInstallationsActionComponent implements OnInit {

  public port: any;
  public ports: any[];
  public IRCodes: any[];
  public action: CampaignVisit;
  public currentStore: StoreVisitModel;
  public store: StoreVisitModel;
  public storeVisist: any[];
  public currentSpeedSlow: boolean = false;
  public storeVisistFiltered: any[];
  public viewCompletedVisits: boolean = false;
  public ViewVisitText: string = 'View Completed Store Visits';
  public Title: string = 'Pending Store Visits';
  public ViewStockText: string = 'View Stock for Stores';
  public myImage = null;
  public list: any[];
  public baseImage: any;
  public originalFile: any;
  public viewInstallationsFilterAction: any;
  public hasCapexItem: boolean = false;
  public scannedCapexItem: boolean = false;
  public amountOfInstallations: number[];
  public amountChosenToInstall: number = 1;
  barcodeValidity: boolean = true;
  tempBarcodeScanned: TempBarcode;
  public removingBarcodes: boolean = false;
  barcodesToRemove: barcodesWithId[];

  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private opsClientService: OpsClientService, private storage: Storage, private opsAdminService: OpsAdminService, private opsUniversalService: OpsUniversalService, private compressImage: CompressImageService, private compressImageNormal: CompressNormalImagesService,private exifService: ExifService) {
    this.list = new Array();
   
    try {
     

      if (this.router.getCurrentNavigation().extras.state != null) {

        this.action = this.router.getCurrentNavigation().extras.state.data;
        this.store = this.router.getCurrentNavigation().extras.state.allInstallation;
        this.getIRCodes();
       
        localStorage.setItem('InstallationAction', JSON.stringify(this.action));
        localStorage.setItem('StoreInstallations', JSON.stringify(this.store));

        if (this.action.selectedIRCode != null) {
          this.action.campaignIRCodeSelected = true;

        }
        else {

        }
        //this.getIRCodeBack();
      }
      else {
        this.action = JSON.parse(localStorage.getItem('InstallationAction'))
        this.store = JSON.parse(localStorage.getItem('StoreInstallations'))
        if (this.action.selectedIRCode != null) {
          this.action.campaignIRCodeSelected = true;

        }
        else {

        }

      }

    }
    catch
    {
      alert('an error occured');
    }
    finally {
    }
   
  }

  ngOnInit() {
    this.getIRCodes();
    if (this.action.masterItemWithBarcodes.length > 0 || this.action.masterItemGroupWithBarcodes.length > 0) {

      this.hasCapexItem = true;
      this.amountOfInstallations = Array.from(Array(this.action.qtyToInstall).keys());
      alert('it has capex');
    }
    else {
      this.scannedCapexItem = true;
    }
    console.log(this.action);
    
    }

  acceptSpecialInstructions() {
    this.action.campaignSpecialInstructionsRead = true;

    //always check currentSpeed
    this.updateStoreVisitToApi();


  }
  changeIRCode() {

    this.action.campaignIRCodeSelected = false;
    this.action.selectedIRCode = null;

    this.action.campaignFinished = false;
    this.updateStoreVisitToApi();
    //this.checkIfAllBarcodesScanned();
  }

  clearIRCode() {
    if (this.action.ircodeDefaultComment == this.action.IRCodeComment) {
      this.action.IRCodeComment = '';
    }

  }

  portChange(event) {

    console.log(event.value);
    this.action.selectedIRCode = event.value;
    this.action.campaignIRCodeSelected = true;
    this.action.needsIrCodeComment = this.action.selectedIRCode.hasComment;
    this.action.IRCodeComment = this.action.selectedIRCode.defaultComment;
    this.action.ircodeDefaultComment = this.action.selectedIRCode.defaultComment;
    console.log(this.action);
  }

  
  getIRCodes() {

    this.opsAdminService.getIRCodes().subscribe(
      data => {
        console.log(data);
        this.IRCodes = data;
        localStorage.setItem('IRCodes', JSON.stringify(this.IRCodes));

        if (this.action.selectedIRCode == null) {

        }
        else {

          if (this.action.previousIRCode && this.action.status != 'Remove') {
            //this.selectedIRCode = this.action.previousIRCode;
          }
          else {
            //this.selectedIRCode = this.IRCodes.filter(x => x.irCodeName.toLowerCase() == 'ad up')[0];
          }
          //this.firstLoad = false;
          //this.setIRCodeForActionDefault(this.selectedIRCode);

        }
      },
      err => {
        this.IRCodes = JSON.parse(localStorage.getItem('IRCodes'))
        
      }
    );
  }






  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: true,

    });
    this.action.campaignPictureTaken = true;
    this.myImage = image.webPath;
    const base64Data = await this.readAsBase64(this.myImage);
    this.setData('image', this.myImage);
    var countStart = 0;
    var countEnd = 500;
    while (countStart < countEnd) {

      this.setData('base64' + countStart, base64Data);
      countStart += 1;
    }


  }

  setData(name, value: any) {
    // Store the value under "my-key"
    //lets check that it doesn't exist, if existing, create new.
    this.storage.get(name).then(x => {
      if (x) {
       
        var rndNumber = Math.floor(Math.random() * 100);
        this.setData(name + rndNumber, value);
      }
      else {
       
        this.storage.set(name, value);
      }
    });
   

  }



  getAllFavorites() {
    var promise = new Promise((resolve, reject) => {
      this.storage.forEach((value, key, index) => {
        var item =
        {
          key: key,
          value : value
        }
        this.list.push(item);
      }).then((d) => {
        resolve(this.list);
      });
    });
    return promise;
  }
  synchPhotosFull() {
    alert('yeah again');
    console.log(this.list);
   
    this.list.forEach(x => {
      if (x['key'].indexOf('picture') !== -1) {
        console.log(x['key']);

        var myFullValue =
        {
          actionID: this.action.installationScheduleCurrentID,
          //baseImage: 'data:image/jpeg;base64,' + btoa(photos["baseImage"]),
          baseImage: x['value'],
          id: 1,
          keyId : x['key']
        }
       
        this.opsUniversalService.uploadBaseFile(myFullValue).subscribe(
          data => {

            //var IdToDelete = this.photosToUpload[counter].id;
            //this.keyRange.push(IdToDelete);
            if (data != null && data != 0) {
              this.deleteImage(myFullValue.keyId);
            }
            else {
            }
            // this.getImagesToSync();
            //IDBKeyRange Key = { actionId: this.photosToUpload[counter].actionID}

          },
          err => {

          }
        );

      }
    });

    this.storage.get('imageToUpload').then(result => {
      if (result != null) {
        var myFullValue =
        {
          actionID: this.action.installationScheduleCurrentID,
          //baseImage: 'data:image/jpeg;base64,' + btoa(photos["baseImage"]),
          baseImage: result,
          id: 1
        }
        console.log('Username: ' + result);
        this.opsUniversalService.uploadBaseFile(myFullValue).subscribe(
          data => {

            //var IdToDelete = this.photosToUpload[counter].id;
            //this.keyRange.push(IdToDelete);
            if (data != null && data != 0) {
              //this.deleteImage(myFullValue.id);
            }
            else {
            }
            // this.getImagesToSync();
            //IDBKeyRange Key = { actionId: this.photosToUpload[counter].actionID}

          },
          err => {

          }
        );
      }
    }).catch(e => {
      console.log('error: ' + e);
      // Handle errors here
    });
    

  }

  deleteImage(id) {
    this.storage.remove(id);
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality:100,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
      direction: CameraDirection.Front,
      correctOrientation: true,
      presentationStyle: "fullscreen",
      preserveAspectRatio: true,
    
      promptLabelHeader: "Take a photo"


    });
    var start = 0;
    var end = 100;
    while (start <= end) {
      start += 1;
      if (image) {
        this.action.campaignPictureTaken = true;
        this.myImage = image.webPath;
        this.saveImage(image)
       
      }
    }
    this.updateStoreVisitToApi();
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    

    this.setData('picture' + this.action.installationScheduleCurrentID, base64Data);

    const fileName = new Date().getTime() + '.jpeg';
    //const savedFile = await Filesystem.writeFile({
    //  path: `${IMAGE_DIR}/${fileName}`,
    //  data: base64Data,
    //  directory: Directory.Data
    //});

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    //this.loadFiles();
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    //if (this.plt.is('hybrid')) {
    //  const file = await Filesystem.readFile({
    //    path: photo.path
    //  });

    //  return file.data;
    //}
    //else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    //}
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  updateStoreVisitToApi() {

    this.updateLocalStorage();
    if (this.action.campaignFinished == true || this.action.campaignFinished == false) {

      if (!this.opsClientService.checkForSlowSpeed()) {
        console.log(this.action);
        this.opsClientService.updateStoreVisist(this.action).subscribe(
          data => {
            //  this.store.storeVisitOutOfSync = false;
            //  this.updateLocalStorage();
          },
          err => {
          
            alert('Something went wrong, please contact the administrator');
          }
        );
      }
    }
  }

  updateLocalStorage() {
    //first remove it and replace with the new details on the action itself.
    localStorage.removeItem('InstallationAction');
    localStorage.setItem('InstallationAction', JSON.stringify(this.action));

    //now do the store
    this.store.storeInstallations.map((todo, i) => {
      if (todo.installationScheduleCurrentID == this.action.installationScheduleCurrentID) {
        this.store.storeInstallations[i] = this.action;
        if (this.opsClientService.checkForSlowSpeed()) {
          this.store.storeVisitOutOfSync = true;
        }
        else {
          //this.store.storeVisitOutOfSync = false;
        }
      }
    });

    this.storeVisist = JSON.parse(localStorage.getItem('StoreVisists'));
    this.storeVisist.map((todo, i) => {
      if (todo.storeId == this.store.storeId) {

        this.storeVisist[i] = this.store;
        //this.store.storeInstallations[i] = this.action;
      }
    });

    this.currentStore = this.storeVisist.filter(x => x.storeId == this.store.storeId)[0];
    this.currentStore.storeInstallations.filter(x => x.installationScheduleCurrentID == this.action.installationScheduleCurrentID)[0] = this.action;
    //console.log(this.currentStore);
    this.storeVisist.filter(x => x.storeId == this.store.storeId)[0] = this.currentStore;
    //console.log(this.storeVisist.filter(x => x.storeId == this.store.storeId)[0]);
    localStorage.removeItem('StoreVisists');
    localStorage.setItem('StoreVisists', JSON.stringify(this.storeVisist));

    //this.redirectAterFinishingCampaign();

  }
  finishCampaign() {
    //ok, ensure the comment is not same as default.


    if ((this.action.ircodeDefaultComment == this.action.IRCodeComment) && (this.action.ircodeDefaultComment != null) && (this.action.selectedIRCode.hasComment)) {

      alert('Please specify a comment that differs from the default comment.');
      return;
    }
    if (this.action.IRCodeComment == '' && (this.action.selectedIRCode.hasComment)) {
      alert('Please specify a comment.');
      return;
    }

    this.action.campaignFinished = true;
    this.updateStoreVisitToApi();
    //here we have to check.

    //lets do a quick check


    //ok, the user is happy and finishing the campaign, let them finish it and go back to the previous screen
  }

  redirectAterFinishingCampaign() {
    if (this.action.campaignFinished == true) {
      var isStoreCompleted = true;
      this.store.storeInstallations.forEach(function (value) {
        if (value.campaignFinished == false) {
          isStoreCompleted = false;

        }
      });


      if (isStoreCompleted) {
        this.store.storeVisitCompleted = true;
        this.router.navigate(['/Operations/'], { state: { data: this.store } });
      }
      else {
        this.router.navigate(['/Operations/Installations/'], { state: { data: this.store, filterAction: this.viewInstallationsFilterAction } });
      }
    }
  }
  openCampaign() {

    this.action.campaignFinished = false;
    if (!this.opsClientService.checkForSlowSpeed()) {
      this.updateStoreVisitToApi();
    }
  }
  setAmountToInstall(value) {

    this.amountChosenToInstall = value;
  }

  updateBarcodeScanned(event, barcodes, masterItemId, type) {
    var hc = event.keyCode;
    this.barcodeValidity = true;
    if (hc == 13) {
      var scannedBarCode = barcodes.filter(x => x.barcode == event.target.value)[0];
      if (event.target.value == "") {
        alert('Barcode cannot be empty');
        event.target.focus();

        return;
      }
      //check that it exists in the barcodes
      if (scannedBarCode) {
        if (type == 'group') {

          this.action.masterItemGroupWithBarcodes.filter(x => x.masterItemGroupId == masterItemId)[0].scannedBarcodes.push(scannedBarCode);
          //remove from array
          this.action.masterItemGroupWithBarcodes.filter(x => x.masterItemGroupId == masterItemId)[0].barcodes.splice(scannedBarCode, 1);
          localStorage.setItem('InstallationAction', JSON.stringify(this.action));
          this.checkIfAllBarcodesScanned();
          //this.updateStoreVisitToApi();
        }
        else {

          this.action.masterItemWithBarcodes.filter(x => x.masterItemId == masterItemId)[0].scannedBarcodes.push(scannedBarCode);
          //remove from array
          this.action.masterItemWithBarcodes.filter(x => x.masterItemId == masterItemId)[0].barcodes.splice(scannedBarCode, 1);
          localStorage.setItem('InstallationAction', JSON.stringify(this.action));
          this.checkIfAllBarcodesScanned();
          //this.updateStoreVisitToApi();
        }

      }
      else {
        this.tempBarcodeScanned = new TempBarcode();
        this.tempBarcodeScanned.barcode = event.target.value;
        this.tempBarcodeScanned.type = type;
        this.tempBarcodeScanned.masterItemId = masterItemId;
        this.tempBarcodeScanned.masterItemGroupId = masterItemId;
        this.barcodeValidity = false;
        alert('Invalid barcode.')
       // jQuery('#errorModal').modal('show');
        event.target.focus();
        return;
      }
    }
    else {
      //console.log(event, barcodes, masterItemId, type);
      return;
    }

    //console.log(event);



    //check that the barcode exist.
    //this.qtyExpected = event.target.value;
    //check that it is in the barcodes

  }
  removeBarcodeShow() {

    this.removingBarcodes = !this.removingBarcodes;
  }

  scanBarcodeToRemove(event) {
    var hc = event.keyCode;
    this.barcodeValidity = true;

    if (hc == 13) {

      //check if it exists in the store at least.
      var barcodeFoundBool = false;
      var barcodeFound;
      this.action.masterItemWithBarcodes.forEach(function (barcodes) {

        if (barcodes.barcodes.filter(x => x.barcode == event.target.value).length > 0) {
          barcodeFoundBool = true;
          barcodeFound = barcodes.barcodes.filter(x => x.barcode == event.target.value);

        }
        //check if barcode is in there
      });
      //check the groups as well
      if (!barcodeFoundBool) {
        this.action.masterItemGroupWithBarcodes.forEach(function (barcodes) {

          if (barcodes.barcodes.filter(x => x.barcode == event.target.value).length > 0) {
            barcodeFoundBool = true;
            barcodeFound = barcodes.barcodes.filter(x => x.barcode == event.target.value);

          }
          //check if barcode is in there
        });
      }

      if (!barcodeFoundBool) {
        jQuery('#errorModalRemovingBarcodes').modal('show');

        this.tempBarcodeScanned = new TempBarcode();
        this.tempBarcodeScanned.barcode = event.target.value;

      }
      else {
        var barcodeToRemove = new barcodesWithId();


        barcodeToRemove.barcode = event.target.value;
        barcodeToRemove.id = this.barcodesToRemove.length + 1;

        this.barcodesToRemove.push(barcodeFound[0]);
        this.action.barcodesToRemove = this.barcodesToRemove;
        localStorage.setItem('InstallationAction', JSON.stringify(this.action));


      }


      return;
    }
  }

  removeBarcodeFromBarcodesToRemove(barcode) {

    var index = this.barcodesToRemove.filter(x => x.id == barcode.id)[0];
    this.barcodesToRemove.splice(this.barcodesToRemove.indexOf(index), 1);
    this.action.barcodesToRemove = this.barcodesToRemove;
    localStorage.setItem('InstallationAction', JSON.stringify(this.action));

    // this.barcodesToRemove.filter(x => x.id == barcode.id)[0].splice(barcode, 1);
  }


  forceBarcodeScan() {
    var tempBarcodeScanned = new barcodesWithId();
    tempBarcodeScanned.barcode = this.tempBarcodeScanned.barcode;
    tempBarcodeScanned.id = 0;
    tempBarcodeScanned.storeId = this.store.storeId;
    tempBarcodeScanned.installationActionId = this.action.installationScheduleCurrentID;
    if (this.tempBarcodeScanned.type == 'group') {

      this.action.masterItemGroupWithBarcodes.filter(x => x.masterItemGroupId == this.tempBarcodeScanned.masterItemGroupId)[0].scannedBarcodes.push(tempBarcodeScanned);
      //remove from array
      //this.action.masterItemGroupWithBarcodes.filter(x => x.masterItemGroupId == masterItemId)[0].barcodes.splice(scannedBarCode, 1);
      localStorage.setItem('InstallationAction', JSON.stringify(this.action));
      this.checkIfAllBarcodesScanned();
      //this.updateStoreVisitToApi();
    }
    else {

      this.action.masterItemWithBarcodes.filter(x => x.masterItemId == this.tempBarcodeScanned.masterItemId)[0].scannedBarcodes.push(tempBarcodeScanned);
      //remove from array
      localStorage.setItem('InstallationAction', JSON.stringify(this.action));
      this.checkIfAllBarcodesScanned();
      //this.updateStoreVisitToApi();
    }
  }

  forceBarcodeRemove() {
    var tempBarcodeScanned = new barcodesWithId();
    tempBarcodeScanned.barcode = this.tempBarcodeScanned.barcode;
    tempBarcodeScanned.id = 0;
    tempBarcodeScanned.storeId = this.store.storeId;
    tempBarcodeScanned.installationActionId = this.action.installationScheduleCurrentID;


    this.barcodesToRemove.push(tempBarcodeScanned);
    this.action.barcodesToRemove = this.barcodesToRemove;
    localStorage.setItem('InstallationAction', JSON.stringify(this.action));


  }
  checkIfAllBarcodesScanned() {

    var isAllScanned = true;
    var amountTOScan = this.amountChosenToInstall;
    this.action.masterItemWithBarcodes.forEach(function (value) {

      if ((value.amountRequired * amountTOScan) != value.scannedBarcodes.length) {
        isAllScanned = false;

      }
    });

    this.action.masterItemGroupWithBarcodes.forEach(function (value) {

      if ((value.amountRequired * amountTOScan) != value.scannedBarcodes.length) {
        isAllScanned = false;

      }
    });

    this.scannedCapexItem = isAllScanned;

    if (isAllScanned && this.action.masterItemWithBarcodes && this.action.masterItemWithBarcodes.length > 0) {

      this.updateStoreVisitToApi();
    }
  }

  removeBarcodeFromScanned(barcode, masterItemId, type) {
    if (type == 'group') {
      this.action.masterItemGroupWithBarcodes.filter(x => x.masterItemGroupId == masterItemId)[0].scannedBarcodes.splice(barcode, 1);
      this.action.masterItemGroupWithBarcodes.filter(x => x.masterItemGroupId == masterItemId)[0].barcodes.push(barcode);
    }
    else {
      this.action.masterItemWithBarcodes.filter(x => x.masterItemId == masterItemId)[0].scannedBarcodes.splice(barcode, 1);
      this.action.masterItemWithBarcodes.filter(x => x.masterItemId == masterItemId)[0].barcodes.push(barcode);
    }


    this.checkIfAllBarcodesScanned();
  }

   uploadFile = async (files) => {

    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }


    if (files.length === 0) {
      return;
    }


    let fileToUpload = <FileWithCampaign>files[0];
    const formData = new FormData();
    var fileNameFolder = this.action.jobNumber + ':' + this.action.installationScheduleCurrentID + '-' + fileToUpload.name;
    formData.append('file', fileToUpload, fileNameFolder);
    formData.append('campaignNumber', fileToUpload, this.action.jobNumber);

    var originalFile;
    var reader = new FileReader();


    reader.readAsDataURL(files[0]);
    reader.onload = function (event) {
      // blob stuff
      //var blob = new Blob([event.target.result]); // create blob... old version
      var blob = dataURItoBlob(reader.result); // create blob...new version
      window.URL = window.URL;
      var blobURL = window.URL.createObjectURL(blob); // and get it's URL

      // helper Image object
      var image = new Image();
      image.src = blobURL;

      image.onload = function () {


        originalFile = reader.result;

      };
    }



    //this.action.campaignPictureTaken = true;

    // this.actionEvent.emit(this.action);
    //this.emitTheAction();

    if (this.opsClientService.checkForSlowSpeed()) {
      //this.action.campaignPictureTaken = true;

      // alert('no here');
      this.compressImage.compress(fileToUpload)
        .pipe(take(1))
        .subscribe(compressedImage => {

          this.convert(compressedImage, originalFile);

        })
      //this.action.campaignPictureTaken = true;
      //this.actionEvent.emit(this.action);
      //const myBase64File = this.convert(fileToUpload);
    }
    else {


      this.compressImageNormal.compress(fileToUpload)
        .pipe(take(1))
        .subscribe(compressedImage => {
          console.log(compressedImage);
          //this.convertNormalImage(compressedImage, originalFile);
        })
      this.action.campaignPictureTaken = true;
      //this.actionEvent.emit(this.action);

    }


    //this.action.campaignPictureTaken = true;
    //this.actionEvent.emit(this.action);


   }


  private convert(myFile: File, originalFile): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {

      const fileReader = new FileReader();
      if (fileReader && myFile) {

        //fileReader.readAsDataURL(myFile);
        fileReader.readAsBinaryString(myFile);
        fileReader.onload = () => {
          resolve(fileReader.result);
          this.baseImage = fileReader.result;

          var myFullValue =
          {
            actionID: this.action.installationScheduleCurrentID,
            baseImage: 'data:image/jpeg;base64,' + btoa(this.baseImage),
            id: 0
          }

          var resized = this.exifService.restore(originalFile, myFullValue.baseImage);  //<= EXIF
          // this.action.campaignPictureTaken = true;
          // this.actionEvent.emit(this.action);

          var startCounter = 0;
          var endCounter = 50; this.viewCompletedVisits
          while (startCounter <= endCounter) {
            startCounter += 1;

            this.setData('picture' + this.action.installationScheduleCurrentID + startCounter.toString(), resized); 
            
          }

          //this.dbService.add('OfflineImages', { actionID: this.action.installationScheduleCurrentID, baseImage: resized }).subscribe(
          //  () => {
          //    // Do something after the value was added
          //    //this.action.campaignPictureTaken = true;
          //    //this.action.amountOfPhotosTaken = this.action.amountOfPhotosTaken + 1;

          //  },
          //  error => {

          //    alert('An error occured with uploading picture, plesase STOP and contact Administrator immediately' + error);

          //    // console.log(error);
          //    //this.action.campaignPictureTaken = false;
          //    //this.actionEvent.emit(this.action);
          //  }
          //);



          // this.chromSer.writeFile('/DCIM/camera', myFile);
        };

        fileReader.onloadend = () => {
          //this.emitTheAction();
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject('No file provided');
      }
    });
  }

  private convertNormalImage(myFile: File, originalFile): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const fileReader = new FileReader();

      if (fileReader && myFile) {


        fileReader.readAsBinaryString(myFile);
        fileReader.onload = () => {
          resolve(fileReader.result);
          this.baseImage = fileReader.result;

          var myFullValue =
          {
            actionID: this.action.installationScheduleCurrentID,
            baseImage: 'data:image/jpeg;base64,' + btoa(this.baseImage),
            id: 0
          }


          var resized = this.exifService.restore(originalFile, myFullValue.baseImage);  //<= EXIF


          var myNewFullValue =
          {
            actionID: this.action.installationScheduleCurrentID,
            baseImage: resized,
            id: 0
          }
          this.http.post(Constants.API_ENDPOINT + 'Helper/uploadBaseFile', JSON.stringify(myNewFullValue), httpOptions)
            .subscribe(event => {
              //this.action.campaignPictureTaken = true;
              //this.action.amountOfPhotosTaken = this.action.amountOfPhotosTaken + 1;
              //this.actionEvent.emit(this.action);


            });


          //this.chromSer.writeFile('DCIM/camera', myFile);
          //console.log(myFile.name);
          //var anotherfile = this.chromSer.readFile('DCIM/camera/' + myFile.name, 'image');
          //console.log(anotherfile);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject('No file provided');
      }
    });
  }

}
interface FileWithCampaign extends File {
  campaignNumber: string;
}
class TempBarcode {
  public barcode;
  public type;
  public masterItemId;
  public masterItemGroupId;
  public id;

}
class barcodesWithId {
  id: number;
  barcode: string;
  installationTeamId: number;
  storeId: number;
  installationActionId: string;
}
