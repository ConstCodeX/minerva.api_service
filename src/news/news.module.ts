import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { NewsRepository } from './repositories/news.repository';

@Module({
  imports: [
    // Define las entidades que maneja este módulo
    TypeOrmModule.forFeature([Article]), 
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
})
export class NewsModule {}