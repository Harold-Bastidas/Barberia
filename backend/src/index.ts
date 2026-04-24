import Fastify from 'fastify';

const app = Fastify({
  logger: {
    level: process.env['LOG_LEVEL'] ?? 'info',
    ...(process.env['NODE_ENV'] === 'development' && {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    }),
  },
});

app.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}));

const start = async (): Promise<void> => {
  try {
    const port = Number(process.env['PORT'] ?? 3001);
    await app.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

void start();
