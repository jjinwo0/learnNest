import { Prop, Schema, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true, //DB에서 Create될 때 timestamp 기록
};

@Schema()
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail() //Email Validator
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  imgUrl: string;
}
