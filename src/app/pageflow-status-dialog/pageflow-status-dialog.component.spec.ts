import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageflowStatusDialogComponent } from './pageflow-status-dialog.component';

describe('PageflowStatusDialogComponent', () => {
  let component: PageflowStatusDialogComponent;
  let fixture: ComponentFixture<PageflowStatusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageflowStatusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageflowStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
