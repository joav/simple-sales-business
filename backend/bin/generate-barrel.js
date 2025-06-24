#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dirPath = process.argv[2];

if (!dirPath) {
  console.error('❌ Debes proporcionar la ruta de un directorio.');
  process.exit(1);
}

const fullPath = path.resolve(dirPath);

if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
  console.error('❌ La ruta proporcionada no es un directorio válido.');
  process.exit(1);
}

function isValidTSFile(file) {
  return file.endsWith('.ts') && file !== 'index.ts' && !file.endsWith('.d.ts');
}

function getExportsFromDir(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  const exports = [];

  for (const item of items) {
    const itemPath = path.join(dir, item.name);
    const relativePath = './' + path.relative(fullPath, itemPath).replace(/\\/g, '/');

    if (item.isFile() && isValidTSFile(item.name)) {
      const name = path.basename(item.name, '.ts');
      exports.push(`export * from '${relativePath.replace(/\.ts$/, '')}';`);
    }

    if (item.isDirectory()) {
      const subdir = item.name;
      const subdirPath = path.join(dir, subdir);
      const subdirIndex = path.join(subdirPath, 'index.ts');
      const subItems = fs.readdirSync(subdirPath);

      if (fs.existsSync(subdirIndex)) {
        // Si tiene index.ts, solo exportamos el subdirectorio como módulo
        exports.push(`export * from './${subdir}';`);
      } else {
        // Si no tiene, exportamos sus archivos .ts
        for (const subItem of subItems) {
          if (isValidTSFile(subItem)) {
            const name = path.basename(subItem, '.ts');
            exports.push(`export * from './${subdir}/${name}';`);
          }
        }
      }
    }
  }

  return exports;
}

// Generar y escribir el archivo index.ts
const exportStatements = getExportsFromDir(fullPath);
const indexPath = path.join(fullPath, 'index.ts');

fs.writeFileSync(indexPath, exportStatements.join('\n') + '\n', 'utf8');
console.log(`✅ Barrel generado en: ${indexPath}`);