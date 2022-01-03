import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Constants } from '../../_config/constants';
import { CampaignVisit, StoreVisitModel } from '../../_models/StoreVisitModel';
import { OpsAdminService } from '../../_services/opsAdmin.service';
import { IRCodeModel } from '../../_models/irCode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpsClientService } from '../../_services/opsClient.service';
import { Router } from '@angular/router';
//we need to pull from webstorage
@Component({
    selector: 'app-opsclient-irCodesStore',
    templateUrl: './irCodesStore.component.html',
    styleUrls: ['./irCodesStore.component.css']
})
export class OpsIRCodesStoreComponent implements OnInit {
    public progress: number;
    public message: string;
  selectedIRCode: IRCodeModel;
  irCodeForm: FormGroup;
  IRCodes: IRCodeModel[];
  irCodeComment: string;
   
  firstLoad: boolean = true;
    @Output() public onUploadFinished = new EventEmitter();
    @Output() actionEvent = new EventEmitter<CampaignVisit>();
  @Input() store: StoreVisitModel;
  errorMessage;
    
  constructor(private router: Router, private http: HttpClient, private opsAdminService: OpsAdminService, private opsClientService: OpsClientService, private formBuilder: FormBuilder) {
   
    
    this.buildForm();
  }

  ngOnInit() {
   
    if (!this.opsClientService.checkForSlowSpeed()) {
      this.opsAdminService.getIRCodesForStoreSkip().subscribe(
        data => {

          this.IRCodes = data;
          localStorage.setItem('IRCodesStoreSkip', JSON.stringify(this.IRCodes));


        },
        err => {
          this.IRCodes = JSON.parse(localStorage.getItem('IRCodesStoreSkip'))
          if (this.selectedIRCode != null) {

          }
        }
      );
    }
    else {
      this.IRCodes = JSON.parse(localStorage.getItem('IRCodesStoreSkip'))
    }
    
    }

    setIRCodeForAction(irCode) {
       
      this.selectedIRCode = irCode.value;
     
      this.store.storeInstallations.forEach((action) => {
        action.campaignIRCodeSelected = true;
        action.selectedIRCode = irCode.value;
        
        action.campaignFinished = true;

      });

      

  }
  clearIRCode() {
    if (this.irCodeComment == this.selectedIRCode.defaultComment) {
      this.irCodeComment = '';
      //this.irCodeComment.value = '';
    }

  }
  changeIRCode() {
    this.selectedIRCode = null;
  }
  saveIRCodes() {
   
    if (this.selectedIRCode.hasComment) {
      if (this.irCodeComment == this.selectedIRCode.defaultComment) {
        //it need chaning, else we can do it.
        return;
        //this.irCodeComment.value = '';
      }
      else {
       
        this.store.storeInstallations.forEach((action) => {
          if (this.irCodeComment) {
            action.IRCodeComment = this.irCodeComment;
          }



        });
        this.updateStoreVisitToApi(this.store);
      }
      //check that a comment value has been entered
    }
    else {
      this.updateStoreVisitToApi(this.store);
    }
  }
  setIRCodeForActionDefault(irCode) {
    //alert('yeah');
    this.firstLoad = false;
    this.selectedIRCode = irCode;
    //this.action.campaignIRCodeSelected = true;
    //this.action.selectedIRCode = irCode;
    //this.action.forceCapexScan = this.selectedIRCode.forceCapexScan;
    //if (this.selectedIRCode.hasComment == true) {
    //  this.action.needsIrCodeComment = true;
    //  this.action.IRCodeComment = this.selectedIRCode.defaultComment;
    //  this.action.ircodeDefaultComment = this.selectedIRCode.defaultComment;
    //}
    //else {
    //  this.action.needsIrCodeComment = false;
    //  this.action.IRCodeComment = '';
    //}


    ////this.action.SelectedIRCode = this.SelectedIRCode;
    //this.actionEvent.emit(this.action);
  }
  buildForm() {
    this.irCodeForm = this.formBuilder.group({
      IRCodeComment: ['', Validators.required],


    });
  }
  updateStoreVisitToApi(store) {

    
    this.opsClientService.updateStoreVisistFull(store).subscribe(
      data => {
        this.router.navigate(['/Operations/'], { state: { data: this.store } });
      },
      err => {
        this.errorMessage = err;
        alert(err);
        console.log(err);
      }
    );
  }

  


}
