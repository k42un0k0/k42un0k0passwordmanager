import { APIService } from '../../API.service';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'zen-observable-ts';

import { OuterAccountRepository } from './outer-account.repository';

describe('OuterAccountRepository', () => {
  let service: OuterAccountRepository;

  beforeEach(() => {
    const mockApiServie: any = {};
    mockApiServie.ListUserAccounts = jest.fn().mockReturnValue(new Promise((resolve) => resolve({ items: [] })));
    mockApiServie.OnCreateUserAccountListener = Observable.of();
    TestBed.configureTestingModule({
      providers: [{ provide: APIService, useValue: mockApiServie }],
    });
    service = TestBed.inject(OuterAccountRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
