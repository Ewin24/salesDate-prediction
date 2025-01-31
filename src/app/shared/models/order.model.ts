export interface Order {
  orderId: number;
  custId: number;
  empId: number;
  orderDate: string;
  requiredDate: string;
  shippedDate: string;
  shipperId: number;
  freight: number;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipRegion: string | null;
  shipPostalCode: string;
  shipCountry: string;
}
