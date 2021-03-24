import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSwimmingPoolPage } from './add-swimming-pool.page';

describe('AddSwimmingPoolPage', () => {
  let component: AddSwimmingPoolPage;
  let fixture: ComponentFixture<AddSwimmingPoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSwimmingPoolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSwimmingPoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
