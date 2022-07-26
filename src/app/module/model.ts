
export class Person {
  id!: number;
  personName!: string;
  contactNo!: string;
  personAddress!: string;
}

export class User {
  id!: number;
  person!: Person;
  username!: string;
  password!: string;
  userRole!: string;
}
export class Account {
  id!: number;
  balance!: number;
  due!: number;
  amountToPay!: number;
}
export class Customer {
  id!: number;
  account!: Account;
  person!: Person;
}
export class Supplyer {
  id!: number;
  account!: Account;
  person!: Person;
  product!: Product;
}
export class Driver {
  id!: number;
  account!: Account;
  person!: Person;
}

export class Sordar {
  id!: number;
  account!: Account;
  person!: Person;
  category!:string;
}
export class Brick {
  id!: number;
  category!: string;
  pricePerPiece: number = 0;
  quantity: number = 0;
  unloadQuantity: number = 0;
  updatedTotalQuantity:number = 0;
  type!:string;
}

export class CustomerDomain {
  personName!: string;
  contactNo!: string;
  personAddress!: string;
  balance!: number;
  due!: number;
  amountToPay!: number;
}

export class SupplyerDomain {
  personName!: string;
  contactNo!: string;
  personAddress!: string;
  productCategory!:string;
  balance!: number;
  due!: number;
  amountToPay!: number;
}

export class Product{
    id!:number;
    productName!:string;
}
export class InvoiceIssueModel {
  totalPrice!: number;
  totalQuantity!: number;
  advancePayment: number = 0;
  duePament: number = 0;
  deliveryStatus!: string;
  approvalStatus!: string;
  issuedBy!: string;
  customerId!: number;
  orders!: OrderModel[];
  scheduleOrders!: ScheduleDeliveryModel[];
}

export class InvoiceDomain{
  id!: number;
  advancePayment!: number;
  approvalStatus!: string;
  approvedAt!: Date;
  approvedBy!: string;
  customer!: Customer;
  deliveryStatus!: string;
  duePayment!: number;
  transportCost!:number;
  issuedAt!: Date;
  issuedBy!: string;
  orders!: OrderModel[];
  paymentDate!: Date;
  purchaseDate!: Date;
  scheduleOrders!: ScheduleDeliveryModel[];
  scheduledQuantity!: number;
  totalPrice!: number;
  totalBill!:number;
  totalQuantity!: number;
}

export class SupplyInvoiceIssueModel {
    supplyerId!: number;
    productName!:string;

    // garichukti
    numberOfTrips!:number;
    billPerTrip!:number;
    vehicleCategoryName!:string;

    totalPrice!: number;
    totalQuantity!: number;
    actualQuantity!: number;
    quantityType!:string;

    advancePayment: number = 0;
    duePament: number = 0;
    
    
    pricePerTrip!:number;

    deliveryStatus!: string;
    approvalStatus!: string;
    issuedBy!: string;
  }


export class OrderModel {
  invoiceId!:number;
  quantity!: number;
  totalPrice!: number;
  brickId!: number;
  brick!: Brick;
}

export interface PeriodicInvoiceElement {
  name: string;
  sn: number;
  invoiceNo: number;
  customerName: string;
  totalQuantity: number;
  advancePayment: number;
  due: number;
  deliveryStatus: string;
  // action: string;
}
export class ScheduleDeliveryModel {
  id!: number;
  order!:OrderModel;
  invoiceId!: number;
  invoice!: Invoice;
  driver!: Driver;
  driverId!: number;
  deliverableQuantity!: number;
  scheduledDate!: string;
  tripNeeded!: number;
  transportCost!: number;
  vehicleCategory!:VehicleCategory;
  vehicleCategoryId!: number;
  deliveryStatus!:string;
  transportCostCustomerPayable!:number;
  brickId!:number;
}

export class Invoice {
  id!: number;
  purchaseDate!: Date;
  paymentDate!: Date;
  totalPrice!: number;
  totalQuantity!: number;
  scheduledQuantity!: number;
  advancePayment!: number;
  duePament!: number;
  deliveryStatus!: string;
  approvalStatus!: string;
  issuedBy!: string;
  approvedBy!: string;
  issuedAt!: Date;
  approvedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  customerId!: Date;
  orders!: OrderModel[];
  customer!: Customer;
  scheduleOrders!: ScheduleDeliveryModel[];
}
export class VehicleCategory{
  id!: number;
  categoryName!: string;
}
export class ApprovalModel {
  id!: number;
  payload!: string;
  createdBy!: string;
  taskType!: string;
  invoiceId!:string;
}
export enum Tasks{
  CREATE_INVOICE="CREATE_INVOICE",
  UPDATE_INVOICE= "UPDATE_INVOICE",
  CREATE_SUPPLY= "CREATE_SUPPLY",
  UPDATE_SUPPLY= "UPDATE_SUPPLY"
}
export class TransactionSummary{
  totalSale:number = 0;
  totalExpense:number = 0;
  totalIncome:number = 0;
  balance:number = 0;
}

export class RawBrickProduction{
  categoryName!:number;
  quantity!:number;
  productionDate!:Date;
  sordarName!:string;
}

export class PaginatorModel{
  length = 100;
  pageSize = 10;
}

export class InvoiceQueryBody{
  offset:number = 0;
  createdFrom!:Date;
  createdTo!:Date;
  invoiceId:number = 0;
  deliveryStatus:string = "";
  customerId:number=0;

}