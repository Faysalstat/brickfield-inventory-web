
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
  contactAmount: number =0;
  contactQuantity: number = 0;
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
  doNo!:string;
  totalQuantity!: number;
  advancePayment: number = 0;
  duePament: number = 0;
  deliveryStatus!: string;
  approvalStatus!: string;
  issuedBy!: string;
  customerId!: number;
  customer!:Customer;
  orders!: OrderModel[];
  scheduleOrders!: ScheduleDeliveryModel[];
  isEdit!:boolean;
}

export class InvoiceDomain{
  id!: number;
  doNo!:string;
  advancePayment!: number;
  approvalStatus!: string;
  approvedAt!: Date;
  approvedBy!: string;
  customer!: Customer;
  deliveryStatus!: string;
  duePayment!: number;
  rebate:number = 0;
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
  comment!:string;
}

export class SupplyInvoiceIssueModel {
    supplyerId!: number;
    driverId!:number;
    productName!:string;
    deliveryType!:number;

    // garichukti
    numberOfTrips:number = 0;
    vehicleCategoryName!:string;

    //CFT
    cftQuantity:number=0;
    actualCftQuantity:number=0;
    pricePerCFT:number = 0;
    totalCFTPrice:number =0;
    actualCFTPrice:number=0;

    // EXcCELETOR 
    totalHour!:number;
    costPerHour!:number;

    //TON
    totalTonQuantity: number = 0;
    costPerTon: number = 0;
    totalTonCost: number = 0;

    

    totalPrice!: number;
    totalQuantity!: number;
    // actualQuantity!: number;
    quantityType!:string;


    costAmountToPay: number = 0;
    totalAmountToPay: number = 0;
    advancePayment: number = 0;
    duePayment: number = 0;
    rebate: number = 0;
    
    
    pricePerTrip:number = 0;
    transportCost:number = 0;

    deliveryStatus!: string;
    approvalStatus!: string;
    comment!:string;
    issuedBy!: string;
  }


export class OrderModel {
  invoiceId!:number;
  quantity!: number;
  totalPrice!: number;
  brickId!: number;
  brick!: Brick;
  state:string = "PENDING";
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
  brick!: Brick;
  state!:string;
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
  deleteMessage!:string;
}
export enum Tasks{
  CREATE_INVOICE="CREATE_INVOICE",
  UPDATE_INVOICE= "UPDATE_INVOICE",
  CREATE_SUPPLY= "CREATE_SUPPLY",
  UPDATE_SUPPLY= "UPDATE_SUPPLY",
  CASH_HANDOVER = "CASH_HANDOVER"
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
  productionDate:Date = new Date();
  sordarName!:string;
  sordarId!:number;
  sordar!:Sordar;
}

export class PaginatorModel{
  length = 100;
  pageSize = 10;
}

export class InvoiceQueryBody{
  limit:number = 0;
  offset:number = 0;
  fromDate: string ='';
  toDate:string='';
  isDue:boolean = false;
  invoiceNo:string = "";
  deliveryStatus:string = "";
  customerId:number=0;
  supplyerId:number=0;
  contactNo:string = "";
  doNo:string = '';

}
export class Expense{
  categoryName!:string;
  expenseName!:string;
  expenseAmount!:number;
  refference!:string;
  payTo!:string;
  tnxDate:Date = new Date();
}
export class EscavatorExpenseModel{
  productName!:string;
  driver!:string;
  totalHour!:number;
  totalBill!:number;
  hourlyRate!:number;
  expenseName!:string;
  categoryName!:string;
  remark !:string;
  deliveryType!:number;
  advancePayment!:number;
  duePayment!:number;
}
// export class ExpenseCategory{
//   {label:'ভাড়া',value:"VARA"},
  
// }

export class SupplyQuery{
  limit:number = 0;
  offset:number = 0;
  productName: string = '';
  contactNo: string ='';
  fromDate: string ='';
  toDate:string='';
  isDue:boolean = false;
}

export class ScheduleQuery{
  limit:number = 0;
  offset:number = 0;
  doNo: string = '';
  deliveryStatus: string = 'PENDING';
  driverContactNo: string = '';
  contactNo: string ='';
  fromDate: string ='';
  toDate:string='';
}