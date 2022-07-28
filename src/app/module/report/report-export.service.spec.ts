import { TestBed } from '@angular/core/testing';

import { ReportExportService } from './report-export.service';

describe('ReportExportService', () => {
  let service: ReportExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
