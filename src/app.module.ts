import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    // Carga las variables de entorno
    ConfigModule.forRoot({ isGlobal: true }), 
    
    // Configuración de TypeORM para Neon.tech
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false, // ¡No usar true en producción!
      ssl: true, // Habilitar SSL para Neon.tech
      extra: {
        ssl: {
          rejectUnauthorized: false // Requerido por Neon.tech
        }
      },
      // Especifica dónde están tus entidades (Models/Entities)
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
