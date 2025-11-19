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
        A.id, T.name, A.source
      ORDER BY
        A."publication_date" DESC
      LIMIT 100;
    `;
    
    // Ejecuta la consulta RAW (JOINS)
    return this.articlesRepository.query(query);
  }

  async findTopics(category?: string, priority?: string): Promise<any[]> {
    let query = `
      SELECT
        id,
        title,
        summary,
        main_image_url,
        priority,
        category,
        article_links,
        created_at
      FROM topics
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    
    if (priority) {
      params.push(parseInt(priority));
      query += ` AND priority = $${params.length}`;
    }
    
    query += ` ORDER BY priority ASC, created_at DESC LIMIT 100;`;
    
    return this.articlesRepository.query(query, params);
  }

  async findTopicsByPriority(priorities: number[], category?: string, last24Hours?: boolean): Promise<any[]> {
    let query = `
      SELECT
        id,
        title,
        summary,
        main_image_url,
        priority,
        category,
        article_links,
        created_at
      FROM topics
      WHERE priority = ANY($1)
    `;
    
    const params: any[] = [priorities];
    
    // Filtrar por últimas 24 horas si se especifica
    if (last24Hours) {
      query += ` AND created_at >= NOW() - INTERVAL '24 hours'`;
    }
    
    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    
    query += ` ORDER BY priority ASC, created_at DESC LIMIT 100;`;
    
    return this.articlesRepository.query(query, params);
  }
}