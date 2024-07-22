import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // suas configurações aqui
    baseUrl: 'http://localhost:5173',
    supportFile: false
  }
});
