import fs from 'fs';
import path from 'path';

export type TipoEnvioGenerado = 'monobulto' | 'multibulto';

export type EnvioGenerado = {
  trackingId: string;
  tipo: TipoEnvioGenerado;
  estadoInicial?: string;
  piezas?: number;
};

export type EnviosGeneradosStorage = {
  monobulto: EnvioGenerado[];
  multibulto: EnvioGenerado[];
};

const storagePath = path.resolve(
  process.cwd(),
  'storage',
  'envios-generados.json'
);

const storageDefault: EnviosGeneradosStorage = {
  monobulto: [],
  multibulto: [],
};

function asegurarStorage(): void {
  const storageDir = path.dirname(storagePath);

  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  if (!fs.existsSync(storagePath)) {
    fs.writeFileSync(
      storagePath,
      JSON.stringify(storageDefault, null, 2),
      'utf-8'
    );
  }
}

export function leerEnviosGenerados(): EnviosGeneradosStorage {
  asegurarStorage();

  const fileContent = fs.readFileSync(storagePath, 'utf-8');

  if (!fileContent.trim()) {
    return storageDefault;
  }

  return JSON.parse(fileContent) as EnviosGeneradosStorage;
}

export function guardarEnviosGenerados(
  tipo: TipoEnvioGenerado,
  envios: EnvioGenerado[]
): void {
  asegurarStorage();

  const storageActual = leerEnviosGenerados();

  const nuevoStorage: EnviosGeneradosStorage = {
    ...storageActual,
    [tipo]: [...storageActual[tipo], ...envios],
  };

  fs.writeFileSync(
    storagePath,
    JSON.stringify(nuevoStorage, null, 2),
    'utf-8'
  );
}

export function limpiarEnviosGenerados(): void {
  asegurarStorage();

  fs.writeFileSync(
    storagePath,
    JSON.stringify(storageDefault, null, 2),
    'utf-8'
  );
}