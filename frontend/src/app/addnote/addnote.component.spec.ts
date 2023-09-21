import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnoteComponent } from './addnote.component';

describe('AddnoteComponent', () => {
  let component: AddnoteComponent;
  let fixture: ComponentFixture<AddnoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnoteComponent]
    });
    fixture = TestBed.createComponent(AddnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
