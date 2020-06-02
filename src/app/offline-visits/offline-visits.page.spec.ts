import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfflineVisitsPage } from './offline-visits.page';

describe('OfflineVisitsPage', () => {
  let component: OfflineVisitsPage;
  let fixture: ComponentFixture<OfflineVisitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineVisitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfflineVisitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
