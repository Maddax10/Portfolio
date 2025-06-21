import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { readdirSync } from 'fs';

const pages = {
  'index.html': {
    title: 'Accueil',
    // description: 'Maintenance en cours'
  },
  'technologies.html': {
    title: 'Technologies',
    // description: 'Maintenance en cours'
  },
  'projects.html': {
    title: 'Projects',
    // description: 'Envoyez-nous un message.'
  },
  'about.html': {
    title: 'About me',
    // description: 'En savoir plus sur nous.'
  },
  'contact.html': {
    title: 'Contact',
    // description: 'Maintenance en cours'
  },
}

//boucle tous les fichier html du projet pour les mettre dans /dist
const htmlFiles = readdirSync(__dirname)
  .filter(file => file.endsWith('.html'))
  .reduce((entries, file) => {
    const name = file.replace(/\.html$/, '');
    entries[name] = resolve(__dirname, file);
    return entries;
  }, {});

export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        const pageName = pagePath.split('/').pop(); // récupère 'index.html'
        return pages[pageName] || {};
      }
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      input: htmlFiles //récupère tous les fichiers html
    }
  }
}