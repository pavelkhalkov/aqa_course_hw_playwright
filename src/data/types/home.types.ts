export type ModuleName = "Customers" | "Products" | "Orders";

export interface OrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
}

export interface MetricsResponse {
  IsSuccess: boolean;
  ErrorMessage: string | null;
  Metrics: {
    orders: {
      totalCanceledOrders: number;
      totalRevenue: number;
      totalOrders: number;
      averageOrderValue: number;
      ordersCountPerDay: Array<{}>;
      recentOrders: Array<{}>;
    };
    customers: {
      topCustomers: Array<{}>;
      totalNewCustomers: number;
      customerGrowth: Array<{}>;
    };
    products: {
      topProducts: Array<{}>;
    };
  };
}