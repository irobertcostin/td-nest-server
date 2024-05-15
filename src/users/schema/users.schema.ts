import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({
    timestamps: true
})



export class User extends Document {
    @Prop()
    full_name: string;


    @Prop({ unique: [true, 'This email is already registered'] })
    email: string

    @Prop()
    password: string

    @Prop()
    address: string

    @Prop()
    city: string

    @Prop()
    country: string

    @Prop()
    role: string


    @Prop({ default: null })
    confirmationToken: string;

    @Prop({ default: false })
    isActivated: boolean;

}


export const UserSchema = SchemaFactory.createForClass(User)