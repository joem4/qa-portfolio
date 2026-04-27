import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/auth.api';
import { EnviosApi } from '../../api/envios.api';
import { EnvioBuilder } from '../../builders/envio.builder';
import {
  envioMonobultoService1TrelewData,
  envioMultibultoService2TrelewData,
} from '../../data/envios.data';

test.describe('Envios API - Creación de envíos', () => {

  test('debe crear un envío monobulto service 1 en estado Pendiente', async ({ request }) => {
    // Arrange
    const authApi = new AuthApi(request);
    const enviosApi = new EnviosApi(request);

    const token = await authApi.getAccessToken();
    const payload = EnvioBuilder.build(envioMonobultoService1TrelewData);

    const expectedTrackingId = payload.bulk[0].pickupId;
    const expectedShipper = payload.bulk[0].shipper;

    // Act
    const response = await enviosApi.crearEnvio(payload, token);

    // Assert (estructura)
    expect(response.success).toHaveLength(1);
    expect(response.errors).toHaveLength(0);
    expect(response.rejected).toHaveLength(0);

    const envio = response.success[0];

    // Assert (reglas de negocio)
    expect(envio.trackingId).toBeTruthy();
    expect(envio.trackingId).not.toBe('');

    expect(envio.pickupId).toBe(expectedTrackingId);
    expect(envio.trackingId).toBe(expectedTrackingId);

    expect(envio.status).toBe('Pendiente');
    expect(envio.service).toBe(1);
    expect(envio.shipper).toBe(expectedShipper);

    expect(envio.piecesQuantity).toBe(1);
    expect(envio.pieces).toHaveLength(1);

    expect(envio.warnings).toHaveLength(0);

    console.log('Envío monobulto creado:', envio.trackingId);
  });

  test('debe crear un envío multibulto service 2 en estado Pendiente', async ({ request }) => {
    // Arrange
    const authApi = new AuthApi(request);
    const enviosApi = new EnviosApi(request);

    const token = await authApi.getAccessToken();
    const payload = EnvioBuilder.build(envioMultibultoService2TrelewData);

    const expectedTrackingId = payload.bulk[0].pickupId;
    const expectedShipper = payload.bulk[0].shipper;

    // Act
    const response = await enviosApi.crearEnvio(payload, token);

    // Assert (estructura)
    expect(response.success).toHaveLength(1);
    expect(response.errors).toHaveLength(0);
    expect(response.rejected).toHaveLength(0);

    const envio = response.success[0];

    // Assert (reglas de negocio)
    expect(envio.trackingId).toBeTruthy();
    expect(envio.trackingId).not.toBe('');

    expect(envio.pickupId).toBe(expectedTrackingId);
    expect(envio.trackingId).toBe(expectedTrackingId);

    expect(envio.status).toBe('Pendiente');
    expect(envio.service).toBe(2);
    expect(envio.shipper).toBe(expectedShipper);

    expect(envio.piecesQuantity).toBe(2);
    expect(envio.pieces).toHaveLength(2);

    expect(envio.warnings).toHaveLength(0);

    console.log('Envío multibulto creado:', envio.trackingId);
  });

});