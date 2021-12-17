import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpsHomeClientStoresInstallationsActionComponent } from './installationAction.page';

describe('OpsHomeClientStoresInstallationsActionComponent', () => {
  let component: OpsHomeClientStoresInstallationsActionComponent;
  let fixture: ComponentFixture<OpsHomeClientStoresInstallationsActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpsHomeClientStoresInstallationsActionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpsHomeClientStoresInstallationsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
