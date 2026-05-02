import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services/index.html'),
        carWash: resolve(__dirname, 'services/car-wash/index.html'),
        carDetailing: resolve(__dirname, 'services/car-detailing/index.html'),
        ppf: resolve(__dirname, 'services/ppf/index.html'),
        ceramicCoating: resolve(__dirname, 'services/ceramic-coating/index.html'),
        grapheneCoating: resolve(__dirname, 'services/graphene-coating/index.html'),
        mechanicalServices: resolve(__dirname, 'services/mechanical-services/index.html'),
        underbodyCoating: resolve(__dirname, 'services/underbody-coating/index.html'),
      }
    }
  }
});
