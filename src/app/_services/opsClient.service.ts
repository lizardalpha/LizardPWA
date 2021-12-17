import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Constants } from '../_config/constants';

import { ConnectionService } from 'ng-connection-service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class OpsClientService {
  public currentSpeedSlow: boolean = false;
  status = 'ONLINE';
  isConnected = true;
  public isOffline: boolean = false;
    responseError: any;

  constructor(private http: HttpClient, private connectionService: ConnectionService) {

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        this.isOffline = false;
       
       
      }
      else {
        this.status = "OFFLINE";
        this.isOffline = true;
      
        this.currentSpeedSlow = true;
      
      }
    })

  }

    

    updateStoreVisist(StoreVisit): Observable<any> {
     
        return this.http.post(Constants.API_ENDPOINT + 'OpsClient/UpdateStoreVisit', JSON.stringify(StoreVisit), httpOptions);

  }


  updateStoreVisistByStore(store): Observable<any> {

    return  this.http.post(Constants.API_ENDPOINT + 'OpsClient/UpdateStoreVisitByStore', JSON.stringify(store), httpOptions);

  }

    getStoreVisistsNew(): Observable<any> {
      return this.http.get<any>(Constants.API_ENDPOINT + 'OpsClient/GetStoreVisistsNew/', httpOptions);
  }
  checkForOnline(): Observable<any> {
    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsClient/CheckForOnline/', httpOptions);
  }
  updateStoreVisistFull(Store): Observable<any> {
   
    return this.http.post(Constants.API_ENDPOINT + 'OpsClient/UpdateStoreVisitFull', JSON.stringify(Store), httpOptions);

  }





  checkForSlowSpeed() {
   
    
    //lets check to see if i can call an api here to determine offline.
    this.currentSpeedSlow = false;
    this.isOffline = false;
    if (!navigator.onLine) {
      
      this.isOffline = true;
      this.currentSpeedSlow = true;
      return this.currentSpeedSlow;

    }
    this.connectionService.monitor().subscribe(isConnected => {
      
      //if you start in offline mode, it won't go in here,let's see what happens
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        this.isOffline = false;


      }
      else {

        this.status = "OFFLINE";
        this.isOffline = true;

        this.currentSpeedSlow = true;
        return true;
      }
    });
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.saveData) {
        // do something
      }
      const connectionlist = ["slow-2g", "2g", "3g", "4g"];
      const effectiveType = conn.effectiveType;

      if (effectiveType == "2g") {
        this.currentSpeedSlow = true;
      
      }
      if (effectiveType == "slow-2g") {
        this.currentSpeedSlow = true;

      }
      if (effectiveType == "3g") {
        this.currentSpeedSlow = false;
      
      }
      if (effectiveType == "4g") {
        this.currentSpeedSlow = false;
      }

    }
    else {

      this.currentSpeedSlow = true;
    }
    if (this.isOffline) {
      this.currentSpeedSlow = true;
      alert('this is why');
    }

    return (this.currentSpeedSlow);

    
  }


  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
