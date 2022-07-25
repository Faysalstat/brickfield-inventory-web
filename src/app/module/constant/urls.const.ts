const BASE_URL = "http://localhost:3000";
// const BASE_URL = "http://192.168.0.106:3000";
// const BASE_URL = "http://192.168.0.2:3000";

export const Urls = {
    USER_SIGN_IN: BASE_URL + "/auth/signin",
    USER_SIGN_OUT: BASE_URL + "/auth/signout",
    DELETE_CUSTOMER : BASE_URL+ "/customer/deletecustomer",
    DELETE_DRIVER : BASE_URL+ "/user/deletedriver",
    DELETE_ORDER : BASE_URL+ "/order/delete",
    UPDATE_ORDER : BASE_URL + "/order/update",
    UPDATE_SCHEDULE : BASE_URL+ "/schedule/update",
    DELETE_SCHEDULE : BASE_URL+ "/schedule/delete",
    UPDATE_USER: BASE_URL+"/user/updateuser",
    UPDATE_INVOICE : BASE_URL + "/invoice/update",
    APPROVE_INVOICE : BASE_URL + "/invoice/approve",
    UPDATE_BALANCE : BASE_URL + "/person/updatebalance",
    GET_USER_BY_ID: BASE_URL + "/updateUserStatus",

    // CREATE 
    CREATE_INVOICE : BASE_URL + "/invoice/create",
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


    // FETCH 
    FETCH_ALL_CUSTOMER: BASE_URL+ "/customer/getall",
    FETCH_ALL_SUPPLYER: BASE_URL+ "/supplyer/getall",
    FETCH_CUSTOMER_BY_CONTACTNO :BASE_URL+ "/customer/getbycontactno",
    FETCH_ACCOUNT_BY_ID :BASE_URL+ "/customer/getbyaccountid",
    FETCH_ALL_INVOICE: BASE_URL + "/invoice/getall",
    FETCH_ALL_TASK: BASE_URL + "/approval/getall",
    FETCH_TASK_BY_ID: BASE_URL + "/approval/getbyid",
    FETCH_SCHEDULE_BY_ID: BASE_URL + "/schedule/getbyid", 
    FETCH_ALL_PENDING_INVOICE: BASE_URL + "/invoice/getallpending",
    FETCH_ALL_SCHEDULES_BY_STATUS: BASE_URL + "/schedule/getallbystatus",
    FETCH_ALL_SCHEDULES_BY_DATE: BASE_URL + "/schedule/getbydate",
    FETCH_ALL_BRICK: BASE_URL + "/brick/getall",
    FETCH_ALL_RAW_BRICK: BASE_URL + "/stock/getallrawbrick",
    FETCH_ALL_DRIVERS: BASE_URL + "/driver/getall",
    FETCH_ALL_SORDARS : BASE_URL + "/sordar/getall",
    FETCH_ALL_PRODUCTS : BASE_URL + "/product/getall",
    FETCH_ALL_TRANSPORT_CATEGORY : BASE_URL + "/schedule/getallvehicle",
    FETCH_INVOICE_BY_ID: BASE_URL+"/invoice/get",
    FETCH_CUSTOMER_BY_ID: BASE_URL+"/customer/getbyid",
    FETCH_USER_BY_NAME : BASE_URL+ "/user/checkexistinguser",
    FETCH_ALL_DUE_PAYMENT_ACCOUNTS: BASE_URL+ "/person/getallDue",
    FETCH_ALL_DUE_INVOICE: BASE_URL+ "/invoice/getallDue",
    FETCH_REGISTER_SUMMARY: BASE_URL+ "/transaction/getsummary",
    FETCH_EXPENSE_CATEGROY: BASE_URL+ "/expense/getallcategory",
    FETCH_ALL_RAW_PRODUCTION_REPORT: BASE_URL + "/stock/getrawproductionreport",
    
    // CHHECKING 
    CHECK_IS_LOGGEDIN: BASE_URL + "/auth/islogedin",

    //REPORT QUERIES

    FETCH_ALL_RAW_STOCK: BASE_URL + "/auth/islogedin"


}