// src/navigation/types.ts
export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    PullFromServer: undefined;
    Dashboard: undefined;
    Customers: undefined;
    ManageRoutes: undefined;
    RouteCustomerList: { day: string };
    AddCustomer: undefined;
    CustomerProfile: { customerId: string };
    SalesEntry: { newItem?: { name: string; price: number } };
    ItemList: undefined;
    BarcodeScanner: undefined;
    SalesReview: undefined;
    Sync: undefined;
    RequestItem: undefined;
    RequestItemList: undefined;
    CustomerList: undefined;
    
  };
  