import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {version} from './package.json';
const buildId=new Date().toISOString().replace(/[-:]/g,'').replace('T','-').slice(0,15);
export default defineConfig({base:'./',plugins:[react(),tailwindcss()],define:{__APP_VERSION__:JSON.stringify(version),__APP_BUILD__:JSON.stringify(buildId)}});
