import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlLinkComponent } from './url-link.component';

describe('UrlLinkComponent', () => {
  let component: UrlLinkComponent;
  let fixture: ComponentFixture<UrlLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
