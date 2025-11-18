import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';

@Injectable()
export class NewsRepository {
  constructor(
    // Inyecta el repositorio de la entidad principal
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async findLatestNews(): Promise<any[]> {
    const query = `
      SELECT
        A.title,
        A.description,
        A.url,
        A.source,
        A."publication_date",
        T.name AS author_name,
        MAX(I.url) AS image_url -- Tomamos una URL de imagen arbitraria
      FROM
        articles AS A
      LEFT JOIN
        authors AS T ON A.author_id = T.id
      LEFT JOIN
        images AS I ON A.id = I.article_id
      GROUP BY
        A.id, T.name
      ORDER BY
        A."publication_date" DESC
      LIMIT 100;
    `;
    
    // Ejecuta la consulta RAW (JOINS)
    return this.articlesRepository.query(query);
  }
}