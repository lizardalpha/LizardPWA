import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpsClientService } from '../../_services/opsClient.service';
import { Storage } from '@ionic/storage-angular';
import { CampaignVisit, StoreVisitModel } from '../../_models/StoreVisitModel';
import { IonicSelectableComponent  } from 'ionic-selectable';
import { OpsAdminService } from '../../_services/opsAdmin.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private opsClientService: OpsClientService, private storage: Storage, private opsAdminService: OpsAdminService) {

   
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
    
    }

  acceptSpecialInstructions() {
    this.action.campaignSpecialInstructionsRead = true;

    //always check currentSpeed
    //this.updateStoreVisitToApi();


  }
  changeIRCode() {

    this.action.campaignIRCodeSelected = false;
    this.action.selectedIRCode = null;

    this.action.campaignFinished = false;
    //this.updateStoreVisitToApi();
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
}
