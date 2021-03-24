import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommonPagesPage } from './common-pages.page';

describe('CommonPagesPage', () => {
  let component: CommonPagesPage;
  let fixture: ComponentFixture<CommonPagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonPagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
