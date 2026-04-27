import { test } from '@playwright/test';
import { AuthApi } from '../../api/auth.api';
import { EnviosApi } from '../../api/envios.api';
import { EnvioBuilder } from '../../builders/envio.builder';
import {
  guardarEnviosGenerados,
  limpiarEnviosGenerados,
} from '../../utils/envios-storage.util';
import {
  envioMonobultoService1TrelewData,
  envioMultibultoService2TrelewData,
} from '../../data/envios.data';

test.describe('SETUP - Generación de envíos', () => {
  test('generar envíos para pruebas', async ({ request }) => {
    limpiarEnviosGenerados();

    const authApi = new AuthApi(request);
    const enviosApi = new EnviosApi(request);

    const token = await authApi.getAccessToken();

    const cantidadMono = 5;

    const monoPayload = EnvioBuilder.buildMultiple(
      envioMonobultoService1TrelewData,
      cantidadMono
    );

    await enviosApi.crearEnvio(monoPayload, token);

    const monoGenerados = monoPayload.bulk.map((item) => ({
      trackingId: item.pickupId,
      tipo: 'monobulto' as const,
      estadoInicial: 'Pendiente',
      piezas: 1,
    }));

    guardarEnviosGenerados('monobulto', monoGenerados);

    const cantidadMulti = 2;

    const multiPayload = EnvioBuilder.buildMultiple(
      envioMultibultoService2TrelewData,
      cantidadMulti
    );

    await enviosApi.crearEnvio(multiPayload, token);

    const multiGenerados = multiPayload.bulk.map((item) => ({
      trackingId: item.pickupId,
      tipo: 'multibulto' as const,
      estadoInicial: 'Pendiente',
      piezas: item.pieces?.length ?? 1,
    }));

    guardarEnviosGenerados('multibulto', multiGenerados);
  });
});