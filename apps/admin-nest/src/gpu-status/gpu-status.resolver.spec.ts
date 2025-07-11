import { Test, TestingModule } from '@nestjs/testing';

import { GpuStatusResolver } from '@/gpu-status/gpu-status.resolver';
import { GpuStatusService } from '@/gpu-status/gpu-status.service';

describe('GpuStatusResolver', () => {
  let resolver: GpuStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpuStatusResolver, GpuStatusService],
    }).compile();

    resolver = module.get<GpuStatusResolver>(GpuStatusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
