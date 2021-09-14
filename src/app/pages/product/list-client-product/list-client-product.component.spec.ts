import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientProductComponent } from './list-client-product.component';

describe('ListClientProductComponent', () => {
  let component: ListClientProductComponent;
  let fixture: ComponentFixture<ListClientProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
