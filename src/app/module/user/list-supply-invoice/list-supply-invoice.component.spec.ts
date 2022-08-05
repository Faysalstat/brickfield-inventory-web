import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplyInvoiceComponent } from './list-supply-invoice.component';

describe('ListSupplyInvoiceComponent', () => {
  let component: ListSupplyInvoiceComponent;
  let fixture: ComponentFixture<ListSupplyInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSupplyInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupplyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
