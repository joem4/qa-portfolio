// ===== Request Types =====

export interface Piece {
  SKU: string;
  declaredValue: string;
  externalCodMulti: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  weight_urbano: number;
  height_urbano: number;
  length_urbano: number;
  width_urbano: number;
}

export interface Receiver {
  fullName: string;
  email: string;
  dni: number;
  phone: number;
}

export interface EnvioRequest {
  pickupId: string;
  originalTrackingId: string;
  shipper: number;
  product: string;
  service: number;
  shipperCombo: string;
  amount: number;
  pieces: Piece[];
  receivers: Receiver[];
  address: string;
  zipCode: string;
  province: string;
  city: string;
  state: string;
  fee: number;
  secretWordRequired: boolean;
  secretWord: string;
  notes: string;
}

export interface BulkRequest {
  bulk: EnvioRequest[];
}

// ===== Response Types =====

export interface PieceResponse {
  id: number;
  status: string;
  volumetricWeight: number;
}

export interface EnvioResponse {
  pickupId: string;
  trackingId: string;
  service: number;
  id: number;
  status: string;
  piecesQuantity: number;
  pieces: PieceResponse[];
  shipper: number;
  warnings: any[];
}

export interface BulkResponse {
  success: EnvioResponse[];
  errors: any[];
  rejected: any[];
}