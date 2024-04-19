import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({
    timestamps: true
})



export class User extends Document {
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop({ unique: [true, 'This email is already registered'] })
    email: string

    @Prop()
    password: string

    @Prop()
    address: string

    @Prop()
    role: string

}


export const UserSchema = SchemaFactory.createForClass(User)