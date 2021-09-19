import { getRecentClosedPortalSalesStats } from './stats';

const {
  numberOfSales,
  lowestSalePrice,
  highestSalePrice,
  medianSalePrice,
  averageSalePrice,
} = await getRecentClosedPortalSalesStats();

console.log(`${numberOfSales} closed gotchi portals sold in the last 24 hours\n`);

if (numberOfSales > 0) {
  console.log(`average price | ${averageSalePrice.toLocaleString('en-US')} $GHST`);
  console.log(`median price  | ${medianSalePrice.toLocaleString('en-US')} $GHST`);
  console.log(`lowest price  | ${lowestSalePrice.toLocaleString('en-US')} $GHST`);
  console.log(`highest price | ${highestSalePrice.toLocaleString('en-US')} $GHST`);
}
