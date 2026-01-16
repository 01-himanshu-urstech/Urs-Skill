import path from 'path';
import fs from 'fs';
import { pathToFileURL, fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadRoutes = async (app) => {
  try {
    const modulesPath = path.join(__dirname, '..', 'modules');

    console.log('📦 Loading routes from:', modulesPath);

    if (!fs.existsSync(modulesPath)) {
      console.warn('⚠️ No modules directory found at:', modulesPath);
      return;
    }

    const moduleFolders = fs.readdirSync(modulesPath);

    for (const moduleName of moduleFolders) {
      const modulePath = path.join(modulesPath, moduleName);

      // skip if not a directory
      if (!fs.statSync(modulePath).isDirectory()) continue;

      const files = fs.readdirSync(modulePath);

      // find *.routes.js inside module
      const routeFiles = files.filter(
        (file) => file.endsWith('.routes.js')
      );

      if (routeFiles.length === 0) {
        console.log(`ℹ️ No route file for module: ${moduleName}`);
        continue;
      }

      for (const file of routeFiles) {
        const routePath = path.join(modulePath, file);
        const routeUrl = pathToFileURL(routePath);

        try {
          const routeModule = await import(routeUrl.href);

          if (typeof routeModule.default === 'function') {
            routeModule.default(app);
            console.log(`✅ Loaded route: ${moduleName}/${file}`);
          } else {
            console.warn(
              `⚠️ Route file has no default export: ${moduleName}/${file}`
            );
          }
        } catch (error) {
          console.error(
            `❌ Failed to load route: ${moduleName}/${file}`,
            error.message
          );
        }
      }
    }

    console.log('🚀 All routes loaded successfully');
  } catch (error) {
    console.error('🔥 Route loader crashed:', error.message);
    throw error;
  }
};
