import {  Injectable } from '@nestjs/common';
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  //? propiedad axios:

  constructor(
    // private pokemonServices: PokemonService mal
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter,

  ) { }
  //? metodo execute primera version:
  // async executeSeed() {

  //   //? crear el numero del pokemon y el name
  //   const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=15')

  //   //*optimizacion:
  //   const insertPromisesArray = []

  //   data.results.forEach(async ({ name, url }) => {

  //     const segments = url.split('/')//? en este punto el numero del pokemon se encuntra en la penultima posicion
  //     // console.log(segments)

  //     const no: number = +segments[segments.length - 2]// accediendo al penultimo valor (numero poke), con conversion a numero
  //     //console.log(no)
  //     //? ejemplo 1 para la creacion, pesima optimizacion:
  //     // const pokemon = await this.pokemonModel.create({name,no})

  //     //* ejemplo 2 para la optimizacion:
  //     insertPromisesArray.push(
  //       this.pokemonModel.create({ name, no })
  //     )

  //   })

  //   //? insertando de manera paralela el contenido del insert promise array:
  //   const newPromise = await Promise.all(insertPromisesArray)
  //   return 'seed execute'

  // }
  async executeSeed() {
    //? eliminar lo que hay en la BD:
    await this.pokemonModel.deleteMany()
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    //? arreglo de pokemons:
    const pokemonsToInsert: { name: string, no: number }[] = []

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/')
      const no: number = +segments[segments.length - 2]
      pokemonsToInsert.push({ name, no })

    })
    //? insertando en la base de datos
    await this.pokemonModel.insertMany(pokemonsToInsert)
    return 'Seed Execute'
  }

}
