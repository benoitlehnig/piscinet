import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechniquePage } from './technique.page';

describe('TechniquePage', () => {
  let component: TechniquePage;
  let fixture: ComponentFixture<TechniquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechniquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
