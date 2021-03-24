import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAdminPage } from './add-admin.page';

describe('AddAdminPage', () => {
  let component: AddAdminPage;
  let fixture: ComponentFixture<AddAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
