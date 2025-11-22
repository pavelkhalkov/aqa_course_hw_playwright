  /*

  ***HW-26**

  Task 1

  Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
  1. Orders This Year
  2. New Customers
  3. Canceled Orders

  Для реализации подмокивайте респонс эндпоинта metrics

    - Orders This Year: Metrics.orders.totalOrders
    - New Customers: Metrics.customers.totalNewCustomers
    - Canceled Orders: Metrics.orders.totalCanceledOrders

  Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных

  */


import { test, expect } from "fixtures/business.fixture";
import { MetricsResponse } from "data/types/home.types";

const metricsCases = [
  {
    title: "Orders This Year",
    value: 123,
    setMockValue: (mockData: MetricsResponse, value: number) => {
      mockData.Metrics.orders.totalOrders = value;
    },
    readFromUi: async (homePage: any) => {
      const metrics = await homePage.getMetricsOrders();
      return metrics.totalOrders;
    },
  },
  {
    title: "New Customers",
    value: 4567,
    setMockValue: (mockData: MetricsResponse, value: number) => {
      mockData.Metrics.customers.totalNewCustomers = value;
    },
    readFromUi: async (homePage: any) => {
      const text = await homePage.totalNewCustomers.innerText();
      const numberValue = text.replace(/\D+/g, ""); 
     return Number(numberValue);
    },
  },
  {
    title: "Canceled Orders",
    value: 9,
    setMockValue: (mockData: MetricsResponse, value: number) => {
      mockData.Metrics.orders.totalCanceledOrders = value;
    },
    readFromUi: async (homePage: any) => {
      const metrics = await homePage.getMetricsOrders();
      return metrics.totalCanceledOrders;
    },
  },
];

test.describe("[Integration] [Sales Portal] [Home Metrics]", () => {
  for (const { title, value, setMockValue, readFromUi } of metricsCases) {
    test(`Should display valid metric: ${title}`, async ({ loginAsAdmin, homePage, mock }) => {
      
      //Общий мок
      const mockData: MetricsResponse = {
        IsSuccess: true,
        ErrorMessage: null,
        Metrics: {
          orders: {
            totalRevenue: 5600,
            totalOrders: 111,
            averageOrderValue: 800,
            totalCanceledOrders: 7,
            recentOrders: [],
            ordersCountPerDay: [],
          },
          customers: {
            totalNewCustomers: 2898,
            topCustomers: [],
            customerGrowth: [],
          },
          products: {
            topProducts: [],
          },
        },
      };

      setMockValue(mockData, value);

      await mock.homeMetricOrder(mockData);
      await loginAsAdmin();
      await homePage.waitForOpened();

      const uiValue = await readFromUi(homePage);

      await test.step(`Verify ${title} matches mocked value`, async () => {
      
      expect(uiValue).toBe(value);
      });
    });
  }
});
