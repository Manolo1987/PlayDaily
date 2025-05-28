import { defineConfig, loadEnv } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      nodePolyfills(), // this is necessary to avoid "process is not defined issue"
      react(),
    ],
    server: {
      host: '0.0.0.0', // Lausche auf allen Interfaces
      port: 3000,      // Stelle sicher, dass dieser Port mit dem in docker-compose.yaml übereinstimmt
      strictPort: true, // Optional: Verhindert, dass Vite einen anderen Port wählt, falls 3000 belegt ist
      hmr: {
        clientPort: 3000, // Wichtig für Hot Module Replacement über Docker
      }
    }
  };
});
