// Angular Modules
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
@Injectable()
export class Constants {
    public static API_MOCK_ENDPOINT: 'mock-domain/api';
    public static siteTitle: "This is Phoenix";


    //public static API_AUTH_ENDPOINT = "http://192.168.0.56:7798/";
    //public static API_ENDPOINT = "http://192.168.0.56:7798/api/";

    //public static API_AUTH_ENDPOINT = "http://192.168.0.56:1554/";
    //public static API_ENDPOINT = "http://192.168.0.56:1554/api/";

   public static API_AUTH_ENDPOINT = "https://pcaimages.primeinstore.co.za/";
   public static API_ENDPOINT = "https://pcaimages.primeinstore.co.za/api/";

    //public static API_AUTH_ENDPOINT = "https://localhost:44334/";
    //public static API_ENDPOINT = "https://localhost:44334/api/";

    //public static API_AUTH_ENDPOINT = "http://localhost/";
    //public static API_ENDPOINT = "http://localhost/api/";

    public  userRoles: string[];
    constructor(private tokenStorageService: TokenStorageService) {
      this.getUserRoles();


  }

  showTab(tabRole) {
    //here we can add logic to see if a tab should be shown.
    if (this.userRoles.includes(tabRole)) {
      return true;
    }
    else {
      return false;
    }
  }



    getUserRoles() {
      const user = this.tokenStorageService.getUser();


      if (user) {
        this.userRoles = user.userRoles;
       
      }
  }
   
}
