import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignVisit, StoreVisitModel } from '../../_models/StoreVisitModel';

import { OpsUniversalService } from '../../_services/opsUniversal.service';
import { OpsClientService } from '../../_services/opsClient.service';


@Component({
  selector: 'ops-home-client-installations',
  templateUrl: './viewInstallationForStore.page.html',
  styleUrls: ['./viewInstallationForStore.page.scss']
})
export class OpsHomeClientStoresInstallationsComponent {
  segment: string;
  public endPoint = "http://192.168.0.56:7798/api/";
  public store: StoreVisitModel;
  public stores: string[];
  public distinctStores: string[];
  public Title = 'Store Visits';
  public ActionFilter: string[];
  public filterargs = { status: 'Remove' };
  public filterAction = '';
  public storeFiltered: any;
  public storeVisitStartedText = 'Store Visit Not Started';
  public needsSaving: boolean = false;
  public skipStoreVisitBit: boolean = false;
  public filterActionText: string = '';
  public storeInstallationsFiltered: CampaignVisit[];
  searchTerm: string;
  public IRCodes: any[];


  public storeInstallationsPending: CampaignVisit[];
  public storeInstallationsCompleted: CampaignVisit[];
  public storeInstallationsOutOfSynch: CampaignVisit[];


  imageActionIDs: any[];
  hasImagesToUpload: boolean = false;
  amountOfImagesToUpload: number = 0;
  constructor(private router: Router, private http: HttpClient,  private _Activatedroute: ActivatedRoute, private opsUniversalService: OpsUniversalService, private opsClientService: OpsClientService) {
    this.imageActionIDs = new Array();
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.filterAction = this.router.getCurrentNavigation().extras.state.filterAction;

      localStorage.removeItem('StoreInstallations');
      this.store = this.router.getCurrentNavigation().extras.state.data;

      localStorage.setItem('StoreInstallations', JSON.stringify(this.store));

    }
    else {
      this.store = JSON.parse(localStorage.getItem('StoreInstallations'))

      //set the filters here


    }
    localStorage.setItem('StoreInstallations', JSON.stringify(this.store));
    if (this.store) {
      this.ActionFilter = this.store.storeInstallations.map(item => item.status)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.storeFiltered = this.store;
      this.Title = this.store.chainName + ' - ' + this.store.storeName;
    }


    this.changeStoreVisitText(this.store.StoreVsistStarted);

  }
  ngOnInit() {
    this.segment = 'pending';
    this.storeInstallationsFiltered = this.store.storeInstallations;

    this.storeInstallationsPending = this.store.storeInstallations.filter(x => x.campaignFinished == false);
    this.storeInstallationsCompleted = this.store.storeInstallations.filter(x => x.campaignFinished == true);

    if (!this.opsClientService.checkForSlowSpeed()) {
      this.getImagesToSync();
      //this.syncPhotos();

    }
    //console.log(this.storeInstallationsFiltered);
  }
  getActionForCampaign(storeInstallation) {
    this.router.navigate(['/Operations/InstallationAction/'], { state: { data: storeInstallation, allInstallation: this.store, filterAction: this.filterAction } });
  }
  changeFilterOld(action) {

  }
  changeFilter(action) {
    if (this.filterAction) {
      if (this.filterAction == action) {
        this.filterAction = '';
        return;
      }

    }
    this.filterAction = action;
    // you can do whatever you want here, return the value or store it in a variable
    //this.store.storeInstallations = this._itemSearch.transform(this.store.storeInstallations, 'status', action);
  }
  startStoreVisit(start: boolean) {

    this.store.StoreVsistStarted = start;
    this.changeStoreVisitText(start);
    localStorage.setItem('StoreInstallations', JSON.stringify(this.store));
  }

  changeStoreVisitText(started: boolean) {
    this.needsSaving = true;
    if (started) {
      this.storeVisitStartedText = 'Store Visit In Progress';
    }
    else {
      this.storeVisitStartedText = 'Store Visit Not Started';
    }
  }
  checkForSaving(saving) {

  }

  skipStoreVisit() {
    this.skipStoreVisitBit = !this.skipStoreVisitBit;
  }

  filterActionsByText(event) {
    this.storeInstallationsFiltered = this.store.storeInstallations.filter(t => t.product.toLowerCase().includes(this.filterActionText.toLowerCase()));
    //this.storeVisistFiltered = this.storeVisist.filter(t => t.storeName.toLowerCase().includes(this.filterStoreText.toLowerCase()));
    //console.log(this.storeInstallationsFiltered);
  }



  getImagesToSync() {

    //alert('it is here now');

    //this.dbService.getAll('OfflineImages').subscribe(
    //  photos => {


    //    photos.map((todo, i) => {

    //      this.imageActionIDs.push(todo["id"]);



    //    });

    //    if (photos.length > 0) {
    //      this.syncPhotos();
    //      this.hasImagesToUpload = true;
    //      this.amountOfImagesToUpload = photos.length;
    //    }
    //    else {


    //    }





    //  }),
    //  error => {
    //    console.log(error);
    //  }

  }




  syncPhotos() {

    ////alert('yeah');
    //var counter = 0;
    //var amountToCount = 1;
    ////console.log(this.imageActionIDs.length);


    //while (counter < amountToCount) {
    //  // alert('yeah again');
    //  //get image, then upload it afterwards

    //  this.dbService.getByID('OfflineImages', this.imageActionIDs[0]).subscribe(
    //    photos => {

    //      var myFullValue =
    //      {
    //        actionID: photos["actionID"],
    //        //baseImage: 'data:image/jpeg;base64,' + btoa(photos["baseImage"]),
    //        baseImage: photos["baseImage"],
    //        id: photos["id"]
    //      }

    //      this.opsUniversalService.uploadBaseFile(myFullValue).subscribe(
    //        data => {
    //          //var IdToDelete = this.photosToUpload[counter].id;
    //          //this.keyRange.push(IdToDelete);
    //          this.deleteImage(myFullValue.id);
    //          // this.getImagesToSync();
    //          //IDBKeyRange Key = { actionId: this.photosToUpload[counter].actionID}

    //        },
    //        err => {

    //        }
    //      );

    //    },
    //    error => {
    //      console.log(error);
    //    }
    //  );


    //  counter += 1;
    //}



  }

  deleteImage(primaryKey) {
    //this.dbService.delete('OfflineImages', primaryKey
    //).subscribe(
    //  deleted => {
    //    //this.getImagesToSync();

    //  },
    //  error => {
    //    //this.getImagesToSync();

    //  }
    //);
  }

  synchStore(store) {
  }


  goBackToStoreVisists() {
    this.router.navigate(['/Operations/']);
  }
}
