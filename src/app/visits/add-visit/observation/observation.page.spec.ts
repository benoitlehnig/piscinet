import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObservationPage } from './observation.page';

describe('ObservationPage', () => {
  let component: ObservationPage;
  let fixture: ComponentFixture<ObservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
