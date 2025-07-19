import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyStationsComponent } from './nearby-stations.component';

describe('NearbyStationsComponent', () => {
  let component: NearbyStationsComponent;
  let fixture: ComponentFixture<NearbyStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearbyStationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearbyStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
