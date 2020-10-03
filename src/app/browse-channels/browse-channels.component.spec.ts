import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseChannelsComponent } from './browse-channels.component';

describe('BrowseChannelsComponent', () => {
  let component: BrowseChannelsComponent;
  let fixture: ComponentFixture<BrowseChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
