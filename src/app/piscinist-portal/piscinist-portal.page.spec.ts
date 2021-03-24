import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PiscinistPortalPage } from './piscinist-portal.page';

describe('PiscinitPortalPage', () => {
  let component: PiscinistPortalPage;
  let fixture: ComponentFixture<PiscinistPortalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiscinistPortalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PiscinistPortalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
