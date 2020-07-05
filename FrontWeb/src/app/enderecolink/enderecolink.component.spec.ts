import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecolinkComponent } from './enderecolink.component';

describe('EnderecolinkComponent', () => {
  let component: EnderecolinkComponent;
  let fixture: ComponentFixture<EnderecolinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecolinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecolinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
