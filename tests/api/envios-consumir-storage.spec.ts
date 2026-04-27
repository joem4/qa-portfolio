import { test, expect } from '@playwright/test';
import { leerEnviosGenerados } from '../../utils/envios-storage.util';

test.describe('Storage - Consumo de envíos generados', () => {
  test('debe leer envíos monobulto y multibulto desde storage', async () => {
    const envios = leerEnviosGenerados();

    expect(envios.monobulto.length).toBeGreaterThan(0);
    expect(envios.multibulto.length).toBeGreaterThan(0);

    const envioMonobulto = envios.monobulto[0];
    const envioMultibulto = envios.multibulto[0];

    expect(envioMonobulto.trackingId).toBeTruthy();
    expect(envioMonobulto.tipo).toBe('monobulto');
    expect(envioMonobulto.piezas).toBe(1);

    expect(envioMultibulto.trackingId).toBeTruthy();
    expect(envioMultibulto.tipo).toBe('multibulto');
    expect(envioMultibulto.piezas).toBeGreaterThan(1);

    console.log('MONOBULTO:', envioMonobulto.trackingId);
    console.log('MULTIBULTO:', envioMultibulto.trackingId);
  });
});