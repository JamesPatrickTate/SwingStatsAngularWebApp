import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgshotComponent } from './avgshot.component';

describe('AvgshotComponent', () => {
  let component: AvgshotComponent;
  let fixture: ComponentFixture<AvgshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvgshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
