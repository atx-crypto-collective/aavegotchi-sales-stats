import { formatDistanceStrict } from 'date-fns';
import { queryAavegotchiSubgraph } from './api';
import {
  getRecentClosedPortalSalesQuery,
  GetRecentClosedPortalSalesQueryResponse,
} from './queries';

export const getRecentClosedPortalSalesStats = async () => {
  const {
    recentClosedPortalSales: recentSales,
  } = await queryAavegotchiSubgraph<GetRecentClosedPortalSalesQueryResponse>(
    getRecentClosedPortalSalesQuery
  );

  const numberOfSales = recentSales.length;
  const totalSalesAmount = recentSales.reduce(
    (total, sale) => total + parseInt(sale.priceInWei, 10) / 1e18,
    0
  );
  const averageSalePrice = (totalSalesAmount / numberOfSales).toFixed(2);
  const oldestSale = recentSales[recentSales.length - 1];
  const oldestSaleDate = new Date(parseInt(oldestSale.timePurchased, 10) * 1000);
  const timeframe = formatDistanceStrict(oldestSaleDate, new Date());

  return {
    numberOfSales,
    timeframe,
    averageSalePrice,
  };
};
