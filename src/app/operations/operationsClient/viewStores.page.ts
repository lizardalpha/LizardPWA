import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpsClientService } from '../../_services/opsClient.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StoreVisitModel } from '../../_models/StoreVisitModel';

@Component({
    selector: 'app-login',
  templateUrl: './viewStores.page.html',
  styleUrls: ['viewStores.page.scss'],
    
})
export class OpsHomeClientStoresComponent implements OnInit {
    
  public storeVisist: any[];
  public currentSpeedSlow: boolean = false;
  public storeVisistFiltered: any[];
  public viewCompletedVisits: boolean = false;
  public ViewVisitText: string = 'View Completed Store Visits';
  public Title: string = 'Pending Store Visits';
  public ViewStockText: string = 'View Stock for Stores';
  public allInstallations: any[];
  public groupedInstalls: any;
  public groupedMaintains: any;
  public groupedRemovals: any;
  public viewStock: boolean = false;
  searchTerm: string;
  recentSearches: any = [];
  public showStockDetails: boolean = false;
  public allInstallationsForView: any[];
  public mustSync: boolean = false;
  public storeVisistFromStorage: any[];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private opsClientService: OpsClientService, private storage: Storage, public navCtrl: NavController) {
    this.currentSpeedSlow = this.opsClientService.checkForSlowSpeed();
    console.log(this.currentSpeedSlow);
  }

  ngOnInit() {
    //we need to first check if any stores are out of sync before loading from the api.

    this.storage.get('StoreVisists').then(data => {
      this.storeVisistFromStorage = data;
      if (data.filter(x => x['storeVisitOutOfSync'] == true).length > 0) {
        this.mustSync = true;

      }

    });

    if (!this.mustSync && !this.currentSpeedSlow) {
      this.getStoreVisitsFromLive();
    }
    else {

      this.storeVisist = this.storeVisistFromStorage;
    }
    //this.loadToken('StoreVisists', (result?: any) => {
    //  // here your result
    //  if (this.storeVisist == null) {
    //  //ignore temp obviously
    //  }
     
    //  if (result.filter(x => x['storeVisitOutOfSync'] == true).length > 0) {
    //    this.mustSync = true;
        
    //  }
    //});

    
   }

  getStoreVisitsFromLive() {
   
      this.getStoreVisists('');
    
  }
  getStoreVisists(showMessage) {

    this.opsClientService.getStoreVisistsNew().subscribe(
      data => {

        this.storeVisist = data;
        if (this.storeVisist != null) {
          this.storage.set('StoreVisists', data);
          if (showMessage) {
            alert('it has refreshed your store list');
          }
        }
        else {
          this.loadToken('StoreVisists', (result?: any) => {
            // here your result
           
         
          });
        }

        //should store this as well
        //this.storeVisistFinal = this.storeVisist;
        //this.stores = this.storeVisist.map(({ store }) => store);
        //this.distinctStores = this.stores.filter((n, i) => this.stores.indexOf(n) === i);
        //this.storeVisistFiltered = this.storeVisist;
        //this.setStorePercentage();
        // this.setStores();
      },
      err => {
        //this.storeVisist = JSON.parse(localStorage.getItem('StoreVisists'));
        //this.storeVisistFiltered = this.storeVisist;
        // this.setStores();
      }
    );
  }
  viewCompletedVisitsMethod(viewVisits) {
    this.viewCompletedVisits = !this.viewCompletedVisits;
    if (this.viewCompletedVisits) {
      this.ViewVisitText = 'View Pending Store Visits';
      this.Title = 'Completed Store Visits';
    }
    else {
      this.ViewVisitText = 'View Completed Store Visits';
      this.Title = 'Pending Store Visits';
    }
   
  }

  refreshStoreList() {
    this.getStoreVisists('It has refreshed your store visists');
  }
  viewStockForStores() {

    var myvar = this.storeVisist.map(x => x.storeInstallations);
    var AllMediaStatus = new Array();




    var AllMediaToInstall = new Array();


    var AllInstallations = new Array();

    myvar.forEach(function (mediaType) {

      mediaType.forEach(function (themedia) {
        AllInstallations.push(themedia);
        var myMediaType = {

          mediaType: themedia.mediaType,
          status: themedia.status,
          chain: themedia.chain,
          amountToInstall: themedia.qtyToInstall,
        }
        //do the check here
        //if (AllMediaToInstall.filter(x => x.mediaType == themedia.mediaType && x.mediaChain == themedia.mediaChain && x.status == themedia.status).length > 0) {
        //  AllMediaToInstall.filter(x => x.mediaType == themedia.mediaType && x.mediaChain == themedia.mediaChain && x.status == themedia.status)[0].amountToInstall += myMediaType.amountToInstall;
        //  //now we can inrease count instead of adding
        //}
        //else {
        //  AllMediaToInstall.push(myMediaType);
        //}
      })
      //  //lets fine the rest
      //console.log(mediaType);
      mediaType.forEach(function (media) {



      })

      //get all media types for installs and removals here

    });
    this.allInstallations = new Array();

    this.allInstallations = AllInstallations;

    AllInstallations.forEach(function (themedia) {

      var myMediaType = {

        mediaType: themedia.mediaType,
        status: themedia.status,
        chain: themedia.chain,
        amountToInstall: themedia.qtyToInstall,
      }
      if (AllMediaToInstall.filter(x => x.mediaType == myMediaType.mediaType && x.chain == myMediaType.chain && x.status == myMediaType.status).length > 0) {
        AllMediaToInstall.filter(x => x.mediaType == themedia.mediaType && x.chain == myMediaType.chain && x.status == myMediaType.status)[0].amountToInstall += myMediaType.amountToInstall;
        //now we can inrease count instead of adding
      }
      else {
        AllMediaToInstall.push(myMediaType);
      }
    });


    //now we have all the stuff, we can work from here


    this.groupedInstalls = AllMediaToInstall.filter(x => x.status == 'Install').map(x => ({ mediatype: x.mediaType, chain: x.chain, amountToInstall: x.amountToInstall })).sort((a, b) => (a.mediatype > b.mediatype) ? 1 : -1);
    this.groupedMaintains = AllMediaToInstall.filter(x => x.status == 'Running').map(x => ({ mediatype: x.mediaType, chain: x.chain, amountToInstall: x.amountToInstall })).sort((a, b) => (a.mediatype > b.mediatype) ? 1 : -1);
    this.groupedRemovals = AllMediaToInstall.filter(x => x.status == 'Remove').map(x => ({ mediatype: x.mediaType, chain: x.chain, amountToInstall: x.amountToInstall })).sort((a, b) => (a.mediatype > b.mediatype) ? 1 : -1);



    


    this.viewStock = !this.viewStock;
    if (this.viewStock) {
      this.ViewStockText = 'View Store Visits';

    }
    else {
      this.ViewStockText = 'View Stock for Stores';
    }
  
  }
  getDetailsForStore(store) {
    store.StoreVsistStarted = false;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: store,
        refresh: true
      }
    };
    console.log(store);
   // this.navCtrl.navigateForward(['/Operations/Installations/'],navigationExtras);
    this.storage.set('StoreInstallations', store).then()
    {
      this.router.navigate(['/Operations/Installations/'], { state: { data: store } });
    }
  
  }
  // to get a key/value pair
  public loadToken(name, handler: (result?: any) => void): void {
    console.log(name);
    this.storage.get(name)
      .then(v => {
        this.setStoreVisists(v);
        console.log(v);
        handler(v);
      });
  }


  setStoreVisists(storeVisists) {
    this.storeVisist = storeVisists;
    this.storeVisistFiltered = this.storeVisist;

  }

  syncStore(store: StoreVisitModel) {
    //we need to sync the store now
    //console.log(store);

    this.opsClientService.updateStoreVisistByStore(store).subscribe(
      data => {
        //now refresh the store list.
        //we can fix it now.
        if (data == true) {

          this.storeVisistFiltered.map((todo, i) => {
            if (todo.storeId == store.storeId) {
              store.storeVisitOutOfSync = false;
              this.storeVisist[i] = store;

              //this.store.storeInstallations[i] = this.action;
            }
          });

          this.storage.remove('StoreVisists');
          this.storage.set('StoreVisists', this.storeVisist);
        
        }
        else {
          alert('Something went wrong, please contact the administrator');
        }
      },
      err => {
        console.log(err);

      }
    );
    //this.synchPhotosFull();
  }

  submit(term?: string) {

    if (term) {
      this.searchTerm = term;
    }
    console.log('searchTerm :>> ', this.searchTerm);
    if (this.searchTerm && this.searchTerm.trim()) {
      if (!this.recentSearches.includes(this.searchTerm)) {
        this.recentSearches.push(this.searchTerm);
        //this.store.set(this.storageKey, this.recentSearches)
      }
    }
    this.searchTerm = null;
  }

  clearSearches() {
    this.recentSearches = [];
    //this.store.remove(this.storageKey);
  }
  viewStockAgain() {
    this.showStockDetails = !this.showStockDetails;
  }
  showMediaInstallDetails(mediaType, amount, chain, status) {


    this.allInstallationsForView = this.allInstallations.filter(x => x.mediaType == mediaType && x.status == status && x.chain == chain);

    this.showStockDetails = !this.showStockDetails;
  }
}
