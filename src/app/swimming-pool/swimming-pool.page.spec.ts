import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwimmingPoolPage } from './swimming-pool.page';

describe('SwimmingPoolPage', () => {
  let component: SwimmingPoolPage;
  let fixture: ComponentFixture<SwimmingPoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimmingPoolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwimmingPoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
