import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the Mongoose document type for User
export type UserDocument = User & Document;

@Schema() // Mark this class as a Mongoose schema
export class User {
  @Prop({ required: true, unique: true }) // Email must be unique and is required
  email: string;

  @Prop({ required: true }) // Name is required
  name: string;

  @Prop({ required: true }) // Password is required
  password: string;
}

// Generate the Mongoose schema for the User class
export const UserSchema = SchemaFactory.createForClass(User);
