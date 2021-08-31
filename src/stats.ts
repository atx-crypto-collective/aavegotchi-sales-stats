import { queryAavegotchiSubgraph } from './api';
import {
  getRecentClosedPortalSalesQuery,
  GetRecentClosedPortalSalesQueryResponse,
} from './queries';
import { median } from './utils';

export const getRecentClosedPortalSalesStats = async () => {
  const {
    recentClosedPortalSales: recentSales,
  } = await queryAavegotchiSubgraph<GetRecentClosedPortalSalesQueryResponse>(
    getRecentClosedPortalSalesQuery
  );

  const numberOfSales = recentSales.length;
  const salePrices = recentSales.map((sale) => parseInt(sale.priceInWei, 10) / 1e18);
  const totalSalesAmount = salePrices.reduce((total, price) => total + price, 0);
  const lowestSalePrice = Math.min(...salePrices);
  const highestSalePrice = Math.max(...salePrices);
  const medianSalePrice = median(salePrices);
  const averageSalePrice = Math.round(totalSalesAmount / numberOfSales);

  return {
    numberOfSales,
    lowestSalePrice,
    highestSalePrice,
    medianSalePrice,
    averageSalePrice,
  };
};
