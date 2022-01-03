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
export class OpsAdminService {

    responseError: any;
    InventoryItemModels : InventoryItemModel[];
    constructor(private http: HttpClient) { }

    getIRCodes(): Observable<any> {
        
      return this.http.get(Constants.API_ENDPOINT + 'OpsClient/GetIRCodes', httpOptions);
        
  }

  getStockTakes(): Observable<any> {

    return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetStockTake', httpOptions);

  }
  getIRCodesForStoreSkip(): Observable<any> {

    return this.http.get(Constants.API_ENDPOINT + 'OpsClient/GetIRCodes/?isStoreSkipVisit=' + true, httpOptions);

  }
    updateIRCodes(IRCode): Observable<any> {
        return this.http.post(Constants.API_ENDPOINT + 'OpsManagement/UpdateIRCode', JSON.stringify(IRCode), httpOptions);

    }
    createIRCode(IRCode): Observable<any> {
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddIRCode/', JSON.stringify(IRCode), httpOptions);
    }

  createStockTake(stockTake): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/CreateStockTake/', JSON.stringify(stockTake), httpOptions);
  }


  generateSchedule(ScheduleDate): Observable<any> {
        
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/GenerateSchedule/?ShceduleDate=' + ScheduleDate, httpOptions);
  }

  getScheduleDates(): Observable<any> {

    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetScheduleDates', httpOptions);
  }

    getCapexItems(): Observable<any> {
        return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetIRCodes', httpOptions);
    }

    getLocationCategories(): Observable<any> {
        return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetLocationCategories', httpOptions);
    }

    getLocationTypes(): Observable<any> {
        return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetLocationTypes', httpOptions);
    }
    createLocationType(LocationType): Observable<any> {
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddLocationType/', JSON.stringify(LocationType), httpOptions);
    }

    updateLocationTypes(LocationType): Observable<any> {
        return this.http.post(Constants.API_ENDPOINT + 'OpsManagement/UpdateLocationType', JSON.stringify(LocationType), httpOptions);

    }

    //master items code here

  getTeams(): Observable<any> {


    //return this.InventoryItemModels;
    return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetTeams', httpOptions);
  }

  getTeamsForStoremen(): Observable<any> {


    //return this.InventoryItemModels;
    return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetTeamsByStoreman', httpOptions);
  }
  getBarcodeByValue(barcode): Observable<any> {
    //return this.InventoryItemModels;
    return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetBarcodeByValue?barcode='+barcode, httpOptions);
  }


  getInstallationDays(): Observable<any> {


    //return this.InventoryItemModels;
    return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetInstallationDays', httpOptions);
  }

    getTeamsAndManagers(): Observable<any> {


        //return this.InventoryItemModels;
        return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetTeamsAndManagers', httpOptions);
    }

    getTeamManagers(): Observable<any> {


        //return this.InventoryItemModels;
        return this.http.get(Constants.API_AUTH_ENDPOINT + 'account/GetTeamManagers', httpOptions);
    }

    getTeamUsers(): Observable<any> {


        //return this.InventoryItemModels;
        return this.http.get(Constants.API_AUTH_ENDPOINT + 'account/GetTeamUsers', httpOptions);
    }

    getAllUsers(): Observable<any> {


        //return this.InventoryItemModels;
        return this.http.get(Constants.API_AUTH_ENDPOINT + 'account/GetAllUsers', httpOptions);
    }
    updateTeamManager(teamAndManager): Observable<any> {
    
        
        return this.http.post(Constants.API_ENDPOINT + 'OpsManagement/UpdateTeamMember', JSON.stringify(teamAndManager), httpOptions);

  }

    updateTeamUser(teamAndManager): Observable<any> {
    
      return this.http.post(Constants.API_ENDPOINT + 'OpsManagement/UpdateTeamUser', JSON.stringify(teamAndManager), httpOptions);

  }

  updateStore(Store): Observable<any> {
    return this.http.post(Constants.API_ENDPOINT + 'OpsManagement/UpdateStore', JSON.stringify(Store), httpOptions);

  }

    getMasterItemsFake() {

        var myStuff = new InventoryItemModel;
        myStuff.barcode = 'P00088';
        myStuff.description = 'Blue Inst Battery';
        myStuff.code = 'piaa';
        myStuff.qtyOnHand = 999;
        

        var itemTypeTest = new MasterItemType();
        itemTypeTest.masterItemTypeName = 'Capex';
        itemTypeTest.masterItemTypeId = 1;
        myStuff.itemType = itemTypeTest;
        this.InventoryItemModels = new Array();
        this.InventoryItemModels.push(myStuff);


        myStuff = new InventoryItemModel;
        myStuff.barcode = 'P00089';
        myStuff.description = 'UP LIGHTER';
        myStuff.code = 'bb';
        var itemTypeTest = new MasterItemType();
        itemTypeTest.masterItemTypeName = 'Capex';
        itemTypeTest.masterItemTypeId = 1;
        myStuff.itemType = itemTypeTest;
        myStuff.qtyOnHand = 1000;
        this.InventoryItemModels.push(myStuff);

        myStuff = new InventoryItemModel;
        myStuff.barcode = 'M000001';
        myStuff.description = 'Ailse Wing';
        myStuff.code = 'bb';
        var itemTypeTest = new MasterItemType();
        itemTypeTest.masterItemTypeName = 'Media';
        itemTypeTest.masterItemTypeId = 1;
        myStuff.itemType = itemTypeTest;
        myStuff.qtyOnHand = 1000;
        this.InventoryItemModels.push(myStuff);
        return this.InventoryItemModels;
        //return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetLocationTypes', httpOptions);
    }


    getMasterItemTypes(): Observable<any> {


        //return this.InventoryItemModels;
        return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetMasterItemTypes', httpOptions);
    }

    getMasterItems(): Observable<any> {


        //return this.InventoryItemModels;
        return this.http.get(Constants.API_ENDPOINT + 'OpsManagement/GetMasterItems', httpOptions);
    }
    createMasterItemType(MasterItemType): Observable<any> {
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddMasterItemType/', JSON.stringify(MasterItemType), httpOptions);
    }


  createMasterItem(MasterItem): Observable<any> {
  
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddMasterItem/', JSON.stringify(MasterItem), httpOptions);
    }

    updateMasterItem(MasterItem): Observable<any> {
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/UpdateMasterItem/', JSON.stringify(MasterItem), httpOptions);
    }

    getWarehouses(): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetWarehouses/', httpOptions);
    }

    createNewWarehouse(warehouse): Observable<any> {
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddWarehouse/', JSON.stringify(warehouse), httpOptions);
    }

    updateWarehouse(warehouse): Observable<any> {
      
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/UpdateWarehouse/', JSON.stringify(warehouse), httpOptions);
    }

    getStores(): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/getStores/', httpOptions);
  }

    getStoresByFilter(filterValues): Observable<any> {
      return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/getStoresByFilter/?teamName='+ filterValues, httpOptions);
    }

    createnewStore(store): Observable<any> {
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddStore/', JSON.stringify(store), httpOptions);
    }
    getLocationsForItems(locationType) {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetLocationsForItems?locationType=' + locationType, httpOptions);
    }

    createInventoryItems(items): Observable<any> {
      
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddInventoryItems/', JSON.stringify(items), httpOptions);
    }

    getInventoryItems() {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetInventoryItems', httpOptions);
    }

    getBarcodesAvailableToScan(MasterItemToWorkOn) {
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/GetBarcodesForMasterItem/', JSON.stringify(MasterItemToWorkOn), httpOptions);
  }

  getBarcodesAvailableToScanStringified(MasterItemToWorkOn) {
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/GetBarcodesForMasterItemNew/', MasterItemToWorkOn, httpOptions);
  }

    createItemMovement(items): Observable<any> {
       
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/MoveItemsToWarehouse/', JSON.stringify(items), httpOptions);
  }

  moveItemsFromVan(items): Observable<any> {

    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/MoveItemsFromVan/', JSON.stringify(items), httpOptions);
  }

    getMasterItemMovement(masterItemId): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetMasterItemMovement/' + masterItemId, httpOptions);
    }

    getMasterItemsToBeRecieved(userId): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetPendingMasteritemMovementByWarehouse/' + userId, httpOptions);
    }

    getMasterItemsToBeRecievedGrouped(userId): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetPendingMasteritemMovementByWarehouseGrouped/' + userId, httpOptions);
    }

    GetBarcodesForReceiving(search): Observable<any> {
       
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/GetBarcodesForReceiving/', JSON.stringify(search), httpOptions);
    }
    reveiveItemsAtWarehouse(items): Observable<any> {
       
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/ReveiveItemsAtWarehouse/', JSON.stringify(items), httpOptions);
    }

    getShelves(): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetShelves/', httpOptions);
    }

    getShelvesByWarehouse(warehouseId): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetShelves/' + warehouseId, httpOptions);
    }

    createShelf(shelf): Observable<any> {
        
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddShelves/', JSON.stringify(shelf), httpOptions);
    }

    updateShelf(shelf): Observable<any> {
       
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/UpdateShelf/', JSON.stringify(shelf), httpOptions);
    }

    getMedia(): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetMedia/', httpOptions);
    }


    getCapexOpexByMedia(mediaId): Observable<any> {
     return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetCapexOpexByMedia/' + mediaId, httpOptions);
    }

    addUpdateOpexCapexMediaAmount(items): Observable<any> {
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddUpdateOpexCapexMediaAmount/', JSON.stringify(items), httpOptions);
    }


    getMasterItemGroups(): Observable<any> {
        return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetMasterItemGroups/', httpOptions);
    }

    createMasterItemGroup(group): Observable<any> {
      
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/AddMasterItemGroup/', JSON.stringify(group), httpOptions);
    }

    updateMasterItemGroup(group): Observable<any> {
       
        return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/UpdateMasterItemGroups/', JSON.stringify(group), httpOptions);
  }

  getStockTakeDetailsReport(id): Observable<any> {

    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetStockTakeReport/?id=' + id,  httpOptions);
  }

  getStockTakeByLocation(location): Observable<any> {

    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetStockTakeByLocation/?location=' + location, httpOptions);
  }

  getStockTakeByArea(location): Observable<any> {

    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GenerateStockTakeReportByLocation/?location=' + location, httpOptions);
  }

  finishStockTake(location): Observable<any> {
    console.log(location);
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/FinishStockTake/', JSON.stringify(location), httpOptions);
  }

  getLatestBarcodesLoaded(search): Observable<any> {
    console.log(search);
    return this.http.get<any>(Constants.API_ENDPOINT + 'OpsManagement/GetLatestBarcodesLoaded/?barcode=' + search, httpOptions);
  }
  stockTakeDetailReportByArea(stockTakeDetail): Observable<any> {
    console.log(stockTakeDetail);
    return this.http.post<any>(Constants.API_ENDPOINT + 'OpsManagement/StockTakeDetailReportByArea/', JSON.stringify(stockTakeDetail), httpOptions);
  }
}
