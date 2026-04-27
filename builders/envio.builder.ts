import { BulkRequest, EnvioRequest } from '../types/envio.types';
import { generateTrackingId } from '../utils/tracking.util';

export class EnvioBuilder {

  static build(envioConfig: Omit<EnvioRequest, 'pickupId' | 'originalTrackingId'>): BulkRequest {
    const trackingId = generateTrackingId();

    const envio: EnvioRequest = {
      pickupId: trackingId,
      originalTrackingId: trackingId,
      ...envioConfig,
    };

    return {
      bulk: [envio],
    };
  }

  static buildMultiple(baseData: any, quantity: number) {
  const bulk = [];

  for (let i = 0; i < quantity; i++) {
    const envio = this.build(baseData); // usa tu builder actual
    bulk.push(envio.bulk[0]); // agregamos solo el envio interno
  }

  return { bulk };
  }

}