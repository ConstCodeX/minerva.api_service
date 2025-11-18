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
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

// Para desarrollo local y otros entornos
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  bootstrap();
}

// Para Vercel (serverless)
export default async (req, res) => {
  const app = await NestFactory.create(AppModule);
  
  const allowedOrigins = [
    'https://mef-front.vercel.app',
    'http://localhost:3000',
    'http://localhost:8080',
  ];

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
};
