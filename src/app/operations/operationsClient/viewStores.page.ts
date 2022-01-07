import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpsClientService } from '../../_services/opsClient.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

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

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private opsClientService: OpsClientService, private storage: Storage, public navCtrl: NavController) {
    this.currentSpeedSlow = this.opsClientService.checkForSlowSpeed();
    console.log(this.currentSpeedSlow);
  }

  ngOnInit() {

    if (!this.currentSpeedSlow) {
      this.getStoreVisists('');
    }
    else {
      this.loadToken('StoreVisists',(result?: any) => {
      // here your result
         if (this.storeVisist == null) {
           this.getStoreVisists('');
         }
      console.log(result);
    });
    }
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
           
            console.log(result);
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
  }
  getDetailsForStore(store) {
    store.StoreVsistStarted = false;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        currency: JSON.stringify(store),
        refresh: true
      }
    };
    //this.navCtrl.navigateForward(['/Operations/Installations/'],navigationExtras);
    this.router.navigate(['/Operations/Installations/'], { state: { data: store } });
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

  syncStore(store) {
  }
}
