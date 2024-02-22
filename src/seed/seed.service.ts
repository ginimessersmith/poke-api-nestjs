import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/poke-response.interface';


@Injectable()
export class SeedService {
  //? propiedad axios:
  private readonly axios: AxiosInstance = axios
  //? metodo execute:
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=35')
    //? crear el numero del pokemon y el name
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')//? en este punto el numero del pokemon se encuntra en la penultima posicion
      // console.log(segments)
      const no:number = +segments[segments.length -2]// accediendo al penultimo valor (numero poke), con conversion a numero
      console.log(no)
    })
    return data.results
  }
}
