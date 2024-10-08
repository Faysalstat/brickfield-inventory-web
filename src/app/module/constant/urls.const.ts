const BASE_URL = "https://vatasolution.me/api";
// const BASE_URL = "http://localhost:3000/api";

export const Urls = {
    USER_SIGN_IN: BASE_URL + "/auth/signin",
    USER_SIGN_OUT: BASE_URL + "/auth/signout",
    DELETE_CUSTOMER : BASE_URL+ "/customer/deletecustomer",
    DELETE_DRIVER : BASE_URL+ "/user/deletedriver",
    DELETE_ORDER : BASE_URL+ "/order/delete",
    DECLINE_TASK :  BASE_URL + "/approval/decline",
    UPDATE_ORDER : BASE_URL + "/order/update",
    UPDATE_SCHEDULE : BASE_URL+ "/schedule/update",
    DELETE_SCHEDULE : BASE_URL+ "/schedule/delete",
    UPDATE_USER: BASE_URL+"/user/updateuser",
    UPDATE_SORDAR : BASE_URL + "/sordar/updatesordar", 
    // UPDATE_PASSWORD : BASE_URL +"/user/updateuser",
    UNLOAD_PRODUCTION: BASE_URL+"/stock/unloadproduction",
    LOAD_PRODUCTION: BASE_URL+"/stock/loadproduction",
    DELETE_LOAD_PRODUCTION: BASE_URL+"/stock/deleteloadproduction",
    UPDATE_INVOICE : BASE_URL + "/invoice/update",
    UPDATE_SUPPLY_INVOICE : BASE_URL + "/supply/update",
    APPROVE_INVOICE : BASE_URL + "/invoice/approve",
    UPDATE_BALANCE : BASE_URL + "/person/updatebalance",
    GET_USER_BY_ID: BASE_URL + "/updateUserStatus",

    // CREATE 
    CREATE_INVOICE : BASE_URL + "/invoice/create",
    CREATE_SUPPLY_INVOICE : BASE_URL + "/supply/create",
    CREATE_SCHEDULE_DELIVERY: BASE_URL + "/schedule/create",
    SET_DELIVERY: BASE_URL + "/schedule/setdelivery",
    CREATE_ORDER : BASE_URL + "/order/create",
    SEND_TO_APPROVAL : BASE_URL + "/approval/create",
    CREATE_CUSTOMER: BASE_URL + "/customer/addcustomer",
    CREATE_USER: BASE_URL + "/user/adduser",
    CREATE_DRIVER: BASE_URL + "/driver/create",
    CREATE_SUPPLYER: BASE_URL + "/supplyer/create",
    CREATE_SORDAR: BASE_URL + "/sordar/addsordar",
    CREATE_NEW_EXPENSE: BASE_URL + "/",
    CREATE_RAW_STOCK: BASE_URL + "/stock/create",
    DO_EXPENSE: BASE_URL + "/expense/doexpense",
    DO_DEPOSIT: BASE_URL + "/account/add-deposit",
    PAY_ESCAVATOR : BASE_URL + "/expense/payescavator",
    PAY_OWNER : BASE_URL + "/expense/payowner",
    PAY_SALARY : BASE_URL + "/expense/pay-salary",
    OFFICE_EXPENSE: BASE_URL + "/expense/office-expense",
    SORDAR_PAYMENT: BASE_URL + "/expense/sordar-payment",
    ADD_EXPENSE_CATEORY: BASE_URL + "/expense/add-category",
    ADD_SORDAR_RECORD : BASE_URL + "/sordar/add-record",
    CREATE_APP_CONFIG: BASE_URL + "/config/addconfig",
    // FETCH 
    FETCH_ALL_CUSTOMER: BASE_URL+ "/customer/getall",
    FETCH_ALL_SUPPLYER: BASE_URL+ "/supplyer/getall",
    FETCH_CUSTOMER_BY_CONTACTNO :BASE_URL+ "/customer/getbycontactno",
    FETCH_ACCOUNT_BY_ID :BASE_URL+ "/customer/getbyaccountid",
    FETCH_ALL_INVOICE: BASE_URL + "/invoice/getall",
    FETCH_ALL_SUPPLY_INVOICE: BASE_URL + "/supply/getallinvoice",
    FETCH_ALL_TASK: BASE_URL + "/approval/getall",
    FETCH_TASK_BY_ID: BASE_URL + "/approval/getbyid",
    FETCH_SCHEDULE_BY_ID: BASE_URL + "/schedule/getbyid", 
    FETCH_ALL_PENDING_INVOICE: BASE_URL + "/invoice/getallpending",
    FETCH_ALL_SCHEDULES_BY_STATUS: BASE_URL + "/schedule/getallbystatus",
    FETCH_ALL_SCHEDULES_BY_DATE: BASE_URL + "/schedule/getbydate",
    FETCH_ALL_ORDERS: BASE_URL + "/order/getall",
    FETCH_ALL_BRICK: BASE_URL + "/brick/getall",
    FETCH_BRICK_BY_ID: BASE_URL + "/brick/getbyid",
    FETCH_ALL_RAW_BRICK: BASE_URL + "/stock/getallrawbrick",
    FETCH_ALL_DRIVERS: BASE_URL + "/driver/getall",
    FETCH_ALL_SORDARS : BASE_URL + "/sordar/getall",
    FETCH_ALL_PRODUCTS : BASE_URL + "/product/getall",
    FETCH_ALL_TRANSPORT_CATEGORY : BASE_URL + "/schedule/getallvehicle",
    FETCH_INVOICE_BY_ID: BASE_URL+"/invoice/get",
    FETCH_SUPPLY_INVOICE_BY_ID: BASE_URL+"/supply/getbyid",
    FETCH_CUSTOMER_BY_ID: BASE_URL+"/customer/getbyid",
    FETCH_SUPPLYER_BY_ID: BASE_URL+"/supplyer/getbyid",
    FETCH_USER_BY_NAME : BASE_URL+ "/user/checkexistinguser",
    FETCH_USER_BY_ID: BASE_URL+ "/user/getbyid",
    FETCH_ALL_DUE_PAYMENT_ACCOUNTS: BASE_URL+ "/person/getallDue",
    FETCH_ALL_DUE_INVOICE: BASE_URL+ "/invoice/getallDue",
    FETCH_REGISTER_SUMMARY: BASE_URL+ "/transaction/getsummary",
    FETCH_EXPENSE_CATEGROY: BASE_URL+ "/expense/getallcategory",
    FETCH_EXPENSE_REASONS_BY_CATEGROY: BASE_URL+ "/transaction/getallreasonsbycategory",
    FETCH_ALL_RAW_PRODUCTION_REPORT: BASE_URL + "/stock/getrawproductionsummaryreport",
    FETCH_ALL_LOAD_UNLOAD_REPORT: BASE_URL + "/stock/getloadsumary",
    FETCH_ESCAVATOR_DUE_LIST: BASE_URL + "/transaction/getall-escavator-due-payment",
    FETCH_ALL_TRANSACTION: BASE_URL+ "/transaction/getalltransaction",
    FETCH_GL_ACCOUNT_BY_TYPE :BASE_URL+ "/expense/getbyglaccounttype",
    FETCH_LOAD_REPORT : BASE_URL+"/stock/getloadreport",
    FETCH_UNLOAD_REPORT : BASE_URL+"/stock/getunloadreport",
    FETCH_RAW_PRODUCTION_REPORT : BASE_URL+"/stock/getrawproductionreport",
    FETCH_SALE_REPORT : BASE_URL+"/stock/getsalereport",
    
    FETCH_DELIVERY_REPORT : BASE_URL+"/stock/getdeliveryreport",
    FETCH_INCOME_EXPENSE_REPOST : BASE_URL + "/transaction/get-income-expense-summary",
    FETCH_ALL_SORDARS_PRODUCTION_REPORT : BASE_URL + "/sordar/getproductionreport",
    FETCH_TOTAL_REBATE: BASE_URL+ "/invoice/gettotalrebate",
    FETCH_APP_CONFIG: BASE_URL + "/config/getconfigbyname",
    
    // CHHECKING 
    CHECK_IS_LOGGEDIN: BASE_URL + "/auth/islogedin",

    //REPORT QUERIES

    FETCH_ALL_RAW_STOCK: BASE_URL + "/auth/islogedin",
    FETCH_LOAD_UNLOAD_HISTORY: BASE_URL + "/stock/getloadunloadhistory"


}