export const envioBaseData = {
  shipper: 1084,
  product: 'PQ',
  shipperCombo: 'BOT-1',
  amount: 1000,
  fee: 100,
  secretWordRequired: false,
  secretWord: 'TEST',
  notes: 'ENVIO DE PRUEBA QA',
};

export const piezaBaseData = {
  SKU: 'SKU-001',
  declaredValue: 'ARS 100.000',
  externalCodMulti: 'QA_COD_00011',
  weight: 20,
  height: 20,
  width: 20,
  length: 20,
  weight_urbano: 20,
  height_urbano: 20,
  length_urbano: 20,
  width_urbano: 20,
};

export const receptorBaseData = {
  fullName: 'QA_RECEPTOR',
  email: 'QA_RECEPTOR@URBANO.COM.AR',
  dni: 10101001,
  phone: 1100000000,
};

export const destinoTrelewData = {
  address: 'AMEGUINO 264',
  zipCode: '9100',
  province: 'CHUBUT',
  city: 'TRELEW',
  state: 'TRELEW',
};

export const envioMonobultoService1TrelewData = {
  ...envioBaseData,
  ...destinoTrelewData,
  service: 1,
  pieces: [
    {
      ...piezaBaseData,
    },
  ],
  receivers: [
    {
      ...receptorBaseData,
    },
  ],
};

export const envioMultibultoService2TrelewData = {
  ...envioBaseData,
  ...destinoTrelewData,
  service: 2,
  pieces: [
    {
      ...piezaBaseData,
      SKU: 'SKU-001',
      externalCodMulti: 'QA_COD_00011',
    },
    {
      ...piezaBaseData,
      SKU: 'SKU-002',
      externalCodMulti: 'QA_COD_00012',
    },
  ],
  receivers: [
    {
      ...receptorBaseData,
    },
  ],
};