import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomechildpageComponent } from './homechildpage.component';

describe('HomechildpageComponent', () => {
  let component: HomechildpageComponent;
  let fixture: ComponentFixture<HomechildpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomechildpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomechildpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
