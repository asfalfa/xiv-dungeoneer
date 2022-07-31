import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BluemageComponent } from './bluemage.component';

describe('BluemageComponent', () => {
  let component: BluemageComponent;
  let fixture: ComponentFixture<BluemageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BluemageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BluemageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
