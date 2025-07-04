import { Test, TestingModule } from '@nestjs/testing';

import { RamStatusResolver } from '@/ram-status/ram-status.resolver';
import { RamStatusService } from '@/ram-status/ram-status.service';

describe('RamStatusResolver', () => {
  let resolver: RamStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamStatusResolver, RamStatusService],
    }).compile();

    resolver = module.get<RamStatusResolver>(RamStatusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
