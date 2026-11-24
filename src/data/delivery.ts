// Shared by the checkout page and the order server, so the fee is calculated identically on both.
export type FulfilmentMethod = 'delivery' | 'pickup';

export const deliveryFees: Record<string, number> = {
  Ikeja: 1500,
  'Victoria Island': 3500,
  Lekki: 4000,
  Yaba: 2500,
  Epe: 6000,
  Surulere: 2800,
  Oshodi: 3200,
  Egbeda: 4200,
  Ikorodu: 5000,
};

export const deliveryAreas = Object.keys(deliveryFees);

export const FREE_DELIVERY_ABOVE = 150000;

export const PICKUP_ADDRESS = '23b, Asawni street, Ebute estate, Tahi Fresh store, Lagos';

export function calcDeliveryFee(method: FulfilmentMethod, area: string, subtotal: number) {
  if (method === 'pickup') return 0;
  if (subtotal >= FREE_DELIVERY_ABOVE) return 0;
  return deliveryFees[area] ?? 0;
}
