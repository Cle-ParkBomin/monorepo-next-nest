import { CreateGpuStatusInput } from '@/gpu-status/dto/create-gpu-status.input';
import { UpdateGpuStatusInput } from '@/gpu-status/dto/update-gpu-status.input';
import { GpuStatus } from '@/gpu-status/entities/gpu-status.entity';
import { GpuStatusService } from '@/gpu-status/gpu-status.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => GpuStatus)
export class GpuStatusResolver {
  constructor(private readonly gpuStatusService: GpuStatusService) {}

  @Mutation(() => GpuStatus)
  createGpuStatus(@Args('createGpuStatusInput') createGpuStatusInput: CreateGpuStatusInput) {
    return this.gpuStatusService.create(createGpuStatusInput);
  }

  @Query(() => [GpuStatus], { name: 'gpuStatusList', description: '모든 GPU Status 목록 조회' })
  findAll() {
    return this.gpuStatusService.findAll();
  }

  @Query(() => GpuStatus, {
    name: 'gpuStatusDetail',
    description: '특정 ID의 GPU Status 정보 조회',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gpuStatusService.findOne(id);
  }

  @Mutation(() => GpuStatus)
  updateGpuStatus(@Args('updateGpuStatusInput') updateGpuStatusInput: UpdateGpuStatusInput) {
    return this.gpuStatusService.update(updateGpuStatusInput.id, updateGpuStatusInput);
  }

  @Mutation(() => GpuStatus)
  removeGpuStatus(@Args('id', { type: () => Int }) id: number) {
    return this.gpuStatusService.remove(id);
  }
}
