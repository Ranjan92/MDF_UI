import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageflowDiagramComponent } from './pageflow-diagram.component';

describe('PageflowDiagramComponent', () => {
  let component: PageflowDiagramComponent;
  let fixture: ComponentFixture<PageflowDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageflowDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageflowDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
