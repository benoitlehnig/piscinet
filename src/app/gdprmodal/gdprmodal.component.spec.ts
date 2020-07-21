import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GdprmodalComponent } from './gdprmodal.component';

describe('GdprmodalComponent', () => {
  let component: GdprmodalComponent;
  let fixture: ComponentFixture<GdprmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdprmodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GdprmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
