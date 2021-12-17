import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpsHomeClientStoresComponent } from './viewStores.page';

describe('OpsHomeClientStoresComponent', () => {
  let component: OpsHomeClientStoresComponent;
  let fixture: ComponentFixture<OpsHomeClientStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpsHomeClientStoresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpsHomeClientStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
