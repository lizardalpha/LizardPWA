import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Constants } from '../_config/constants';

import { InventoryItemModel, MasterItemType } from '../_models/inventoryItem';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class OpsUniversalService {

    responseError: any;
    InventoryItemModels : InventoryItemModel[];
    constructor(private http: HttpClient) { }

    getIRCodes(): Observable<any> {
        
      return this.http.get(Constants.API_ENDPOINT + 'OpsClient/GetIRCodes', httpOptions);
        
  }

  getMasterItemsToBeRecieved(userId): Observable<any> {
    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsUniversal/GetPendingMasteritemMovementByWarehouse/' + userId, httpOptions);
  }
  getMasterItemsToBeRecievedGrouped(userId): Observable<any> {
    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsUniversal/GetPendingMasteritemMovementByWarehouseGrouped/' + userId, httpOptions);
  }

  GetBarcodesForReceiving(search): Observable<any> {
    console.log(search);
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsUniversal/GetBarcodesForReceiving/', JSON.stringify(search), httpOptions);
  }

  ReceiveItems(items): Observable<any> {
    
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsUniversal/ReceiveItems/', JSON.stringify(items), httpOptions);
  }

  uploadBaseFile(baseFile): Observable<any> {

    return this.http.post(Constants.API_ENDPOINT + 'Helper/uploadBaseFile', JSON.stringify(baseFile), httpOptions);
   
  }

  checkPendingStockTake(): Observable<any> {
  
    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsUniversal/CheckForStockTake/', httpOptions);
  }

  
  getStockTakeRoles(): Observable<any> {

    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsUniversal/GetStockTakeRoles/', httpOptions);
  }

  createStockTakeDetail(inventoryStockTakeDetails): Observable<any> {
    
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsUniversal/CreateStockTakeDetail/', JSON.stringify(inventoryStockTakeDetails), httpOptions);
  }
  getStockTakeDetails(): Observable<any> {

    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsUniversal/GetStockTakeDetails/', httpOptions);
  }
  createBarcodeScannedForStockTake(inventoryStockTakeDetailsBarcodes): Observable<any> {
   
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsUniversal/CreateBarcodeScannedForStockTake/', JSON.stringify(inventoryStockTakeDetailsBarcodes), httpOptions);
  }
  getWarehouses(): Observable<any> {
    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsUniversal/GetWarehouses/', httpOptions);
  }

  getVans(): Observable<any> {
    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsUniversal/GetVans/', httpOptions);
  }
  getBarcodeByValue(barcode): Observable<any> {
    //return this.InventoryItemModels;
    return this.http.get(Constants.API_ENDPOINT + 'OpsUniversal/GetBarcodeByValue?barcode=' + barcode, httpOptions);
  }

  getMasterItems(): Observable<any> {


    //return this.InventoryItemModels;
    return this.http.get(Constants.API_ENDPOINT + 'OpsUniversal/GetMasterItems', httpOptions);
  }

  finishStockTake(stockTakeDetails): Observable<any> {

    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsUniversal/FinishStockTake/', JSON.stringify(stockTakeDetails), httpOptions);
  }
}
