import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecentNotesComponent } from './show-recent-notes.component';

describe('ShowRecentNotesComponent', () => {
  let component: ShowRecentNotesComponent;
  let fixture: ComponentFixture<ShowRecentNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRecentNotesComponent]
    });
    fixture = TestBed.createComponent(ShowRecentNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
