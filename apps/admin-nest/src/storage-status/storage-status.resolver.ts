import { CreateStorageStatusInput } from '@/storage-status/dto/create-storage-status.input';
import { UpdateStorageStatusInput } from '@/storage-status/dto/update-storage-status.input';
import { StorageStatus } from '@/storage-status/entities/storage-status.entity';
import { StorageStatusService } from '@/storage-status/storage-status.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => StorageStatus)
export class StorageStatusResolver {
  constructor(private readonly storageStatusService: StorageStatusService) {}

  @Mutation(() => StorageStatus)
  createStorageStatus(
    @Args('createStorageStatusInput') createStorageStatusInput: CreateStorageStatusInput,
  ) {
    return this.storageStatusService.create(createStorageStatusInput);
  }

  @Query(() => [StorageStatus], {
    name: 'storageStatusList',
    description: '모든 Storage Status 목록 조회',
  })
  findAll() {
    return this.storageStatusService.findAll();
  }

  @Query(() => StorageStatus, {
    name: 'storageStatusDetail',
    description: '특정 ID의 Storage Status 정보 조회',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.storageStatusService.findOne(id);
  }

  @Query(() => [StorageStatus], { name: 'storageStatusByPcId', nullable: true })
  getStorageStatusByPcId(
    @Args('pcId', { type: () => Int, description: '조회할 PC의 ID' }) pcId: number,
  ): Promise<StorageStatus[]> {
    return this.storageStatusService.findByPcId(pcId);
  }

  @Mutation(() => StorageStatus)
  updateStorageStatus(
    @Args('updateStorageStatusInput') updateStorageStatusInput: UpdateStorageStatusInput,
  ) {
    return this.storageStatusService.update(updateStorageStatusInput.id, updateStorageStatusInput);
  }

  @Mutation(() => StorageStatus)
  removeStorageStatus(@Args('id', { type: () => Int }) id: number) {
    return this.storageStatusService.remove(id);
  }
}
