import { Component } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: 'navbar.page.html',
  styleUrls: ['navbar.page.scss'],
})
export class NavBarComponent {
  isAdministrator = false;
  isNovaOps = false;
  isSales = false;
  isOps = false;
  isMyMobility = false;
  isFinance = false;
  username = '';
  user: any;
  

  constructor() {
  }



}
