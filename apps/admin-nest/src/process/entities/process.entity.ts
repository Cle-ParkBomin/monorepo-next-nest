import { Pc } from '@/pc/entities/pc.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Process {
  @Field(() => Int, { description: '고유번호 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, {
    description: 'Process 코드: GLASS INSPECT, SEALER INSPECT, PRIMER INSPECT, WHEEL INSPECT',
  })
  @Column({ unique: true })
  code: string;

  @Field(() => String, {
    description: 'Process 이름: GLASS INSPECT, SEALER INSPECT, PRIMER INSPECT, WHEEL INSPECT',
  })
  @Column()
  name: string;

  @Field({ description: '생성 일시' })
  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Field({ description: '업데이트 일시' })
  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  // Pc 엔티티와의 1:N 관계 설정: 데이터 모델링
  @OneToMany(() => Pc, (pc) => pc.process)
  pcs: Pc[];
}
