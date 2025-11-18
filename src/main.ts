import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  // --- CONFIGURACIÓN DE CORS ---
  const allowedOrigins = [
    'https://mef-front.vercel.app', // 1. Origen de Producción (Vercel)
    'http://localhost:3000',        // 2. Origen de Desarrollo Común
    'http://localhost:8080',        // 3. Otros posibles puertos de desarrollo (opcional)
  ];

  app.enableCors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (como Postman o solicitudes file:///)
      if (!origin) return callback(null, true); 
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        // El origen está en la lista de permitidos
        callback(null, true);
      } else {
        // Bloquear cualquier otro origen
        // console.log(`CORS block: ${origin}`); 
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // -----------------------------
  await app.listen(3000);
}
bootstrap();
