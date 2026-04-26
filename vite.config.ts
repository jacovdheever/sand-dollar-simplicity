import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync } from "fs";

// Plugin to copy index.html to 404.html after build (for GitHub Pages SPA routing)
const copy404Plugin = () => {
  return {
    name: 'copy-404',
    writeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      copyFileSync(
        path.join(distDir, 'index.html'),
        path.join(distDir, '404.html')
      );
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => ({
  base: '/',  // Use root path for custom domain (sanddollardesign.co.za)
  server: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    react(),
    copy404Plugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    minify: mode === 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast']
        }
      }
    }
  }
}));
