import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: "/unc66/" est nécessaire pour GitHub Pages (site de type projet,
// servi sous https://<user>.github.io/unc66/). Uniquement au build : en dev,
// on garde "/" sinon le serveur local applique aussi ce préfixe et casse tout.
// Si le dépôt GitHub porte un autre nom, adapter cette valeur en conséquence.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/unc66/' : '/',
  plugins: [react(), tailwindcss()],
}))
