import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface ApiResponse {
  message: string;
  status: string;
  timestamp: string;
}

interface HealthResponse {
  status: string;
  service: string;
  uptime: number;
  timestamp: string;
}

// Route racine - req non utilisé mais préfixé avec _
app.get('/', (_req: Request, res: Response) => {
  const response: ApiResponse = {
    message: 'Bienvenue sur mon API Express avec TypeScript !',
    status: 'success',
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

// Route health - req non utilisé mais préfixé avec _
app.get('/health', (_req: Request, res: Response) => {
  const response: HealthResponse = {
    status: 'OK',
    service: 'API Express TypeScript',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

// Gestion des routes non trouvées - req non utilisé mais préfixé avec _
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route non trouvée',
    status: 404
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur TypeScript démarré sur http://localhost:${port}`);
  console.log(`Route racine : http://localhost:${port}/`);
  console.log(`Health check : http://localhost:${port}/health`);
});