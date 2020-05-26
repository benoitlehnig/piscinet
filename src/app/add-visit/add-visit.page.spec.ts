import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddVisitPage } from './add-visit.page';

describe('AddVisitPage', () => {
  let component: AddVisitPage;
  let fixture: ComponentFixture<AddVisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVisitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
