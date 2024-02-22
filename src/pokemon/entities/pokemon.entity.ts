import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, } from "mongoose"

// especificar que esta clase es un esquema
@Schema()
export class Pokemon extends Document {
    // id:string mongo me lo da
    // el nombre debe ser unico, index para la busqueda
    @Prop({
        unique: true,
        index: true, //donde esta lo que estoy buscando?
    })
    name: string
    //---
    @Prop({
        unique: true,
        index: true, //donde esta lo que estoy buscando?
    })
    no: number
}

//exportar la definicion del esquema
export const PokemonSchema = SchemaFactory.createForClass(Pokemon)