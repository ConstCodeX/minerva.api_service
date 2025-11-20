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

  async obtenerTopics(category?: string, priority?: string) {
    const rawData = await this.newsRepository.findTopics(category, priority);
    
    const formattedData = rawData.map((row, index) => ({
      numero: index + 1,
      topic: {
        id: row.id,
        titulo: row.title,
        resumen: row.summary,
        imagen_principal: row.main_image_url,
        prioridad: row.priority,
        categoria: row.category,
        subcategoria: row.subcategory,
        tema: row.topic_theme,
        pais: row.country,
        tags: row.tags,
        fecha_evento: row.event_date,
        articulos: row.article_links || [],
        fecha_creacion: row.created_at,
      },
    }));
    
    return {
      total_resultados: formattedData.length,
      datos: formattedData,
    };
  }

  async obtenerTopicsPrioritarios(category?: string, last24Hours: boolean = false) {
    // Prioridad 1 y 2 para la sección "Hoy"
    const rawData = await this.newsRepository.findTopicsByPriority([1, 2], category, last24Hours);
    
    const formattedData = rawData.map((row, index) => ({
      numero: index + 1,
      topic: {
        id: row.id,
        titulo: row.title,
        resumen: row.summary,
        imagen_principal: row.main_image_url,
        prioridad: row.priority,
        categoria: row.category,
        subcategoria: row.subcategory,
        tema: row.topic_theme,
        pais: row.country,
        tags: row.tags,
        fecha_evento: row.event_date,
        articulos: row.article_links || [],
        fecha_creacion: row.created_at,
      },
    }));
    
    return {
      total_resultados: formattedData.length,
      datos: formattedData,
    };
  }

  async obtenerTopicsCompletos(category?: string, last24Hours: boolean = false) {
    // Prioridad 3 y 4 para el listado completo
    const rawData = await this.newsRepository.findTopicsByPriority([3, 4], category, last24Hours);
    
    const formattedData = rawData.map((row, index) => ({
      numero: index + 1,
      topic: {
        id: row.id,
        titulo: row.title,
        resumen: row.summary,
        imagen_principal: row.main_image_url,
        prioridad: row.priority,
        categoria: row.category,
        subcategoria: row.subcategory,
        tema: row.topic_theme,
        pais: row.country,
        tags: row.tags,
        fecha_evento: row.event_date,
        articulos: row.article_links || [],
        fecha_creacion: row.created_at,
      },
    }));
    
    return {
      total_resultados: formattedData.length,
      datos: formattedData,
    };
  }

  async obtenerTopicPorId(topicId: number) {
    const rawData = await this.newsRepository.findTopicById(topicId);
    
    if (!rawData) {
      return null;
    }
    
    return {
      id: rawData.id,
      titulo: rawData.title,
      resumen: rawData.summary,
      imagen_principal: rawData.main_image_url,
      prioridad: rawData.priority,
      categoria: rawData.category,
      subcategoria: rawData.subcategory,
      tema: rawData.topic_theme,
      pais: rawData.country,
      tags: rawData.tags,
      fecha_evento: rawData.event_date,
      articulos: rawData.article_links || [],
      fecha_creacion: rawData.created_at,
    };
  }
}