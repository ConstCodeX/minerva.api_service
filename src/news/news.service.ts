import { Injectable } from '@nestjs/common';
import { NewsRepository } from './repositories/news.repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async obtenerUltimasNoticias() {
    // 1. Obtener datos crudos de la base de datos (Adaptador de Salida)
    const rawData = await this.newsRepository.findLatestNews();

    // 2. Aplicar lógica de negocio: numeración y formateo (Puerto/Dominio)
    const formattedData = rawData.map((row, index) => ({
      numero: index + 1, // Requerimiento: Resultado numerado
      noticia: {
        titulo: row.title,
        descripcion: row.description,
        url: row.url,
        fecha_publicacion: row.publication_date,
        fuente: row.source, // Medio de comunicación
        autor_nombre: row.author_name,
        url_imagen: row.image_url || null,
      },
    }));
    
    return {
        total_resultados: formattedData.length,
        datos: formattedData
    };
  }
}