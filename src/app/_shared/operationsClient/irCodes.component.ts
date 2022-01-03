import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Constants } from '../../_config/constants';
import { CampaignVisit } from '../../_models/StoreVisitModel';
import { OpsAdminService } from '../../_services/opsAdmin.service';
import { IRCodeModel } from '../../_models/irCode';
import { FormGroup } from '@angular/forms';
import { OpsClientService } from '../../_services/opsClient.service';
//we need to pull from webstorage
@Component({
    selector: 'app-opsclient-irCodes',
    templateUrl: './irCodes.component.html',
    styleUrls: ['./irCodes.component.css']
})
export class OpsIRCodeComponent implements OnInit {
    public progress: number;
    public message: string;
  selectedIRCode: IRCodeModel;
  IRCodes: IRCodeModel[];
  firstLoad: boolean = true;
    @Output() public onUploadFinished = new EventEmitter();
    @Output() actionEvent = new EventEmitter<CampaignVisit>();
    @Input() action: CampaignVisit;
    
  public currentSpeedSlow: boolean = false;
  constructor(private http: HttpClient, private opsAdminService: OpsAdminService, private opsClientService: OpsClientService) {
   
   

  }

  ngOnInit() {
  
   
   
    if (this.opsClientService.checkForSlowSpeed()) {
      //don't load if we can find it
      this.IRCodes = JSON.parse(localStorage.getItem('IRCodes'))

      if (this.IRCodes.length <= 8) {
        this.getIRCodes();
      }
   
      if (this.action.selectedIRCode == null) {
       
        if (this.action.previousIRCode) {
          this.selectedIRCode = this.action.previousIRCode;
        }
      }
      else {
        if (this.action.previousIRCode && this.action.status != 'Remove') {
          this.selectedIRCode = this.action.previousIRCode;
        }
        else {
          this.selectedIRCode = this.IRCodes.filter(x => x.irCodeName.toLowerCase() == 'ad up')[0];
        }
        
        this.firstLoad = false;
        this.setIRCodeForActionDefault(this.selectedIRCode);

      }
      if (this.IRCodes == null) {
        this.getIRCodes();
      }

    }
    else {
      this.getIRCodes();
    }
   
      
    }

  getIRCodes() {
  
    this.opsAdminService.getIRCodes().subscribe(
      data => {
        this.IRCodes = data;
        localStorage.setItem('IRCodes', JSON.stringify(this.IRCodes));

        if (this.action.selectedIRCode == null) {

        }
        else {

          if (this.action.previousIRCode && this.action.status != 'Remove') {
            this.selectedIRCode = this.action.previousIRCode;
          }
          else {
            this.selectedIRCode = this.IRCodes.filter(x => x.irCodeName.toLowerCase() == 'ad up')[0];
          }
          this.firstLoad = false;
          this.setIRCodeForActionDefault(this.selectedIRCode);

        }
      },
      err => {
        this.IRCodes = JSON.parse(localStorage.getItem('IRCodes'))
        if (this.selectedIRCode != null) {

        }
      }
    );
  }

    setIRCodeForAction(irCode) {
       
      this.selectedIRCode = irCode.value;
      this.action.campaignIRCodeSelected = true;
      this.action.selectedIRCode = irCode.value;
      this.action.forceCapexScan = this.selectedIRCode.forceCapexScan;
      if (this.selectedIRCode.hasComment == true) {
            this.action.needsIrCodeComment = true;
        this.action.IRCodeComment = this.selectedIRCode.defaultComment;
        this.action.ircodeDefaultComment = this.selectedIRCode.defaultComment;
        }
        else {
          this.action.needsIrCodeComment = false;
          this.action.IRCodeComment = '';
        }
       
        
        //this.action.SelectedIRCode = this.SelectedIRCode;
        this.actionEvent.emit(this.action);
    }

  setIRCodeForActionDefault(irCode) {
    //alert('yeah');
    this.firstLoad = false;
    this.selectedIRCode = irCode;
    this.action.campaignIRCodeSelected = true;
    this.action.selectedIRCode = irCode;
    this.action.forceCapexScan = this.selectedIRCode.forceCapexScan;
    
    if (this.selectedIRCode.hasComment == true) {
      this.action.needsIrCodeComment = true;
      this.action.IRCodeComment = this.selectedIRCode.defaultComment;
      this.action.ircodeDefaultComment = this.selectedIRCode.defaultComment;
    }
    else {
      this.action.needsIrCodeComment = false;
      this.action.IRCodeComment = '';
    }


    //this.action.SelectedIRCode = this.SelectedIRCode;
    this.actionEvent.emit(this.action);
  }
}
