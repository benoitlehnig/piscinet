import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CGUPage } from './cgu.page';

describe('CGUPage', () => {
  let component: CGUPage;
  let fixture: ComponentFixture<CGUPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CGUPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CGUPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
