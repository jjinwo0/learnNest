import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true, //DB에서 Create될 때 timestamp 기록
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'abcd1234@naver.com',
    description: 'email',
    required: true,
  })
  @IsNotEmpty()
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail() //Email Validator
  email: string;

  @ApiProperty({
    example: 'jinwoo',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: './example.txt',
    description: 'url',
    required: true,
  })
  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.body.id,
    email: this.email,
    name: this.name,
  };
});
