import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwimmingPoolReadOnlyPage } from './swimming-pool-read-only.page';

describe('SwimmingPoolReadOnlyPage', () => {
  let component: SwimmingPoolReadOnlyPage;
  let fixture: ComponentFixture<SwimmingPoolReadOnlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimmingPoolReadOnlyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwimmingPoolReadOnlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
