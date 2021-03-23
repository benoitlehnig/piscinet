import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerPortalPage } from './customer-portal.page';

describe('CustomerPortalPage', () => {
  let component: CustomerPortalPage;
  let fixture: ComponentFixture<CustomerPortalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPortalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerPortalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
