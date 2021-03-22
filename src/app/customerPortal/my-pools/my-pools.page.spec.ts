import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPoolsPage } from './my-pools.page';

describe('MyPoolsPage', () => {
  let component: MyPoolsPage;
  let fixture: ComponentFixture<MyPoolsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPoolsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPoolsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
