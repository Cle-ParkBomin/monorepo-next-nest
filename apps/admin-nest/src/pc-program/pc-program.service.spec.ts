import { Test, TestingModule } from '@nestjs/testing';

import { PcProgramService } from '@/pc-program/pc-program.service';

describe('PcProgramService', () => {
  let service: PcProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PcProgramService],
    }).compile();

    service = module.get<PcProgramService>(PcProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
