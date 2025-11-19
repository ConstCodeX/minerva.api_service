import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  
  @Get()
  async getNews() {
    const data = await this.newsService.obtenerUltimasNoticias();
    
    return {
        status: "success",
        message: "Datos de noticias obtenidos con éxito",
        ...data // Incluye total_resultados y datos
    };
  }

  @Get('topics')
  async getTopics(
    @Query('category') category?: string,
    @Query('priority') priority?: string,
  ) {
    const data = await this.newsService.obtenerTopics(category, priority);
    
    return {
      status: "success",
      message: "Topics obtenidos con éxito",
      ...data // Incluye total_resultados y datos
    };
  }

  @Get('topics/today')
  async getTodayTopics(
    @Query('category') category?: string,
    @Query('recent') recent?: string,
  ) {
    // Topics prioritarios (prioridad 1 y 2) para "Hoy"
    // Si recent=true, filtrar últimas 24 horas
    const last24Hours = recent === 'true';
    const data = await this.newsService.obtenerTopicsPrioritarios(category, last24Hours);
    
    return {
      status: "success",
      message: "Topics prioritarios obtenidos con éxito",
      ...data
    };
  }

  @Get('topics/all')
  async getAllTopics(
    @Query('category') category?: string,
    @Query('recent') recent?: string,
  ) {
    // Todos los topics (prioridad 3 y 4) para el listado completo
    // Si recent=true, filtrar últimas 24 horas
    const last24Hours = recent === 'true';
    const data = await this.newsService.obtenerTopicsCompletos(category, last24Hours);
    
    return {
      status: "success",
      message: "Topics completos obtenidos con éxito",
      ...data
    };
  }
}