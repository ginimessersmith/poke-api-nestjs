import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validations';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],// datos env a cargar desde una funcion
      validationSchema:JoiValidationSchema
    }),
    //? servir la carpeta public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MongooseModule.forRoot(process.env.MONGO_DB,{
      dbName:'pokemonsDB'//? darle un nombre a la base de datos para que no se cree la db en test (railway)
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

  constructor() {
    // console.log(process.env)
  }
}
