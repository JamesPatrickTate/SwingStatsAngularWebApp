import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvglistComponent } from './avglist.component';

describe('AvglistComponent', () => {
  let component: AvglistComponent;
  let fixture: ComponentFixture<AvglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
