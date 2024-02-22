import { Prop } from "@nestjs/mongoose"
import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {

    // debe ser string, minimo
    @IsString()
    @MinLength(1)
     name: string
    // debe ser entero, positivio y minimo 1
    @IsInt()
    @IsPositive()
    @Min(1)
     no: number
}
