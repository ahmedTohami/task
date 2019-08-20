import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoDetialComponent } from './repo-detial.component';

describe('RepoDetialComponent', () => {
  let component: RepoDetialComponent;
  let fixture: ComponentFixture<RepoDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoDetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
