import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateLineInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
