import { getRecentClosedPortalSalesStats } from './stats';

const {
  numberOfSales,
  lowestSalePrice,
  highestSalePrice,
  medianSalePrice,
  averageSalePrice,
  timeframe,
} = await getRecentClosedPortalSalesStats();

console.log(`${numberOfSales} closed gotchi portals sold in the last ${timeframe}\n`);
console.log(`average price | ${averageSalePrice.toLocaleString('en-US')} $GHST`);
console.log(`median price  | ${medianSalePrice.toLocaleString('en-US')} $GHST`);
console.log(`lowest price  | ${lowestSalePrice.toLocaleString('en-US')} $GHST`);
console.log(`highest price | ${highestSalePrice.toLocaleString('en-US')} $GHST`);
