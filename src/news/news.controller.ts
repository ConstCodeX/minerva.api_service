import { Controller, Get } from '@nestjs/common';
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
}