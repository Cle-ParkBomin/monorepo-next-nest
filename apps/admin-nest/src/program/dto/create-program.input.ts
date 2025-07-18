import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProgramInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
