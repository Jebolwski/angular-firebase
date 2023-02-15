import { TestBed } from '@angular/core/testing';

import { NotloggedinService } from './notloggedin.service';

describe('NotloggedinService', () => {
  let service: NotloggedinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotloggedinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
