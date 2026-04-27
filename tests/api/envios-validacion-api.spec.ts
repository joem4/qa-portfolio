import { test, expect } from '../../fixtures/api.fixture';
import { EnviosApi } from '../../api/envios.api';
import { leerEnviosGenerados } from '../../utils/envios-storage.util';

test.describe('Envios API - Validación de envíos generados', () => {
  test('debe validar envío monobulto generado por trackingId', async ({ apiRequest, accessToken }) => {
    const envios = leerEnviosGenerados();

    const envioMonobulto = envios.monobulto[0];

    expect(envioMonobulto.trackingId).toBeTruthy();

    const enviosApi = new EnviosApi(apiRequest);

    const response = await enviosApi.buscarOrdenPorTrackingId(
      envioMonobulto.trackingId,
      accessToken
    );

    const orden = response.data[0];

    expect(orden.trackingId).toBe(envioMonobulto.trackingId);
    expect(orden.piecesQuantity).toBe(1);
    expect(orden.shipper.id).toBe(1084);
    expect(orden.stage.name).toBe('PI');
  });

  test('debe validar envío multibulto generado por trackingId', async ({ apiRequest, accessToken }) => {
    const envios = leerEnviosGenerados();

    const envioMultibulto = envios.multibulto[0];

    expect(envioMultibulto.trackingId).toBeTruthy();

    const enviosApi = new EnviosApi(apiRequest);

    const response = await enviosApi.buscarOrdenPorTrackingId(
      envioMultibulto.trackingId,
      accessToken
    );

    const orden = response.data[0];

    expect(orden.trackingId).toBe(envioMultibulto.trackingId);
    expect(orden.piecesQuantity).toBe(envioMultibulto.piezas);
    expect(orden.pieces.length).toBe(envioMultibulto.piezas);
    expect(orden.shipper.id).toBe(1084);
    expect(orden.stage.name).toBe('PI');
  });
});