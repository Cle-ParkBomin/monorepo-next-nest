import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateNetworkStatusInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
