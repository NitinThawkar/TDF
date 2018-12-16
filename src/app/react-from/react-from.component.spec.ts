import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactFromComponent } from './react-from.component';

describe('ReactFromComponent', () => {
  let component: ReactFromComponent;
  let fixture: ComponentFixture<ReactFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
