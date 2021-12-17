import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpsHomeClientStoresInstallationsComponent } from './viewInstallationForStore.page';

describe('OpsHomeClientStoresInstallationsComponent', () => {
  let component: OpsHomeClientStoresInstallationsComponent;
  let fixture: ComponentFixture<OpsHomeClientStoresInstallationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpsHomeClientStoresInstallationsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpsHomeClientStoresInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
