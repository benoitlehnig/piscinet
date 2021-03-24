import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PiscinitPortalPage } from './piscinit-portal.page';

describe('PiscinitPortalPage', () => {
  let component: PiscinitPortalPage;
  let fixture: ComponentFixture<PiscinitPortalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiscinitPortalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PiscinitPortalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
