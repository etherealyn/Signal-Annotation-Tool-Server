import { Test, TestingModule } from '@nestjs/testing';
import { LabelsGateway } from './labels.gateway';

describe('LabelsGateway', () => {
  let gateway: LabelsGateway;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabelsGateway],
    }).compile();
    gateway = module.get<LabelsGateway>(LabelsGateway);
  });
  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
