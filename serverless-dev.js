import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServerlessDevServer() {
  const server = await createServer({
    configFile: false,
    root: path.resolve(__dirname, 'client'),
    define: {
      'import.meta.env.VITE_DATABASE_URL': JSON.stringify(process.env.DATABASE_URL)
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    plugins: [
      (await import('@vitejs/plugin-react')).default(),
    ],
    server: {
      host: '0.0.0.0',
      port: 5000,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  });

  await server.listen();
  console.log('Serverless development server running on http://0.0.0.0:5000');
}

createServerlessDevServer().catch(console.error);