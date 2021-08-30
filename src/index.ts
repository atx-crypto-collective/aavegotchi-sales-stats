import { getRecentClosedPortalSalesStats } from './stats';

(async () => {
  const { numberOfSales, averageSalePrice, timeframe } = await getRecentClosedPortalSalesStats();

  console.log(
    `${numberOfSales} closed gotchi portals sold in the last ${timeframe} at an average price of ${averageSalePrice} $GHST`
  );
})();
