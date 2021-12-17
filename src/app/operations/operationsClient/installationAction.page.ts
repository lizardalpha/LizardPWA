import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpsClientService } from '../../_services/opsClient.service';
import { Storage } from '@ionic/storage-angular';
import { CampaignVisit, StoreVisitModel } from '../../_models/StoreVisitModel';

@Component({
    selector: 'app-installationActions',
  templateUrl: './installationAction.page.html',
  styleUrls: ['installationAction.page.scss'],
    
})
export class OpsHomeClientStoresInstallationsActionComponent implements OnInit {
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

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private opsClientService: OpsClientService, private storage: Storage) {
    try {
      if (this.router.getCurrentNavigation().extras.state != null) {

        this.action = this.router.getCurrentNavigation().extras.state.data;
        this.store = this.router.getCurrentNavigation().extras.state.allInstallation;

        console.log(this.action);
        console.log(this.store);
      }
    }
    catch
    {
    }
   
  }

  ngOnInit() {
   
    
    }




}
