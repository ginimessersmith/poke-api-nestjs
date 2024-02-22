import { Injectable, Controller, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { promiseHooks } from 'v8';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class PokemonService {

  // inyeccion de dependencias (Model de mongoose y pokemon de la entity):
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }
  //*  --- METODO PARA MANEJAR LOS ERRORES
  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in DB ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`cant create pokemon,check server logs`)
  }

  //------------------------- METODOS CRUD:
  async create(createPokemonDto: CreatePokemonDto) {
    // return 'This action adds a new pokemon';
    createPokemonDto.name = createPokemonDto.name.toLowerCase()
    // insercion en la bd
    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon

    } catch (error) {
      this.handleException(error)
      throw error
    }

  }

  async findAll(queryParameters: PaginationDto) {
    const { limit = 10, offset = 0 } = queryParameters
    return await this.pokemonModel.find()
      .lean()
      .limit(limit)// de 5 en 5
      .skip(offset)// traer desde el numero 5
      .sort({
        no: 1// ordenar no de manera ascendente
      })
      .select('-__v')//quitar el __v
  }

  async findOne(termSearch: string) {
    let pokemon: Pokemon
    // si es un numero buscar por no
    if (!isNaN(+termSearch)) {
      pokemon = await this.pokemonModel.findOne({ no: termSearch })
    }

    // busqueda por  mongoID
    if (!pokemon && isValidObjectId(termSearch)) {
      pokemon = await this.pokemonModel.findById(termSearch)
    }
    // busqueda por name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: termSearch.toLowerCase().trim() })
    }
    // si no existe:
    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no: ${termSearch}, not found`)
    return pokemon
  }

  async update(termSearch: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(termSearch)
    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim()
    try {
      await pokemon.updateOne(updatePokemonDto)// new:true es para que se retorne el pokemon actualizador y poder retornarlo 
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {
      this.handleException(error)
    }

  }

  async remove(id: string) {
    //? solucion 1:
    const result = await this.pokemonModel.findByIdAndDelete(id)
    if (!result) throw new BadRequestException(`no existe pokemon con el id: ${id}`)
    //? solucion 2:
    // const {deletedCount} = await this.pokemonModel.deleteOne({_id:id})
    // if(deletedCount ==0) throw new BadRequestException(`no existe pokemon con el id: ${id}`)
    return { message: `eliminado con exito` }
  }
}
