import fetch from 'node-fetch';
import { formatDistanceStrict } from 'date-fns';
import { DocumentNode } from 'graphql';
import { getRecentClosedPortalSalesQuery } from './queries';

interface RecentClosedPortalSalesResponse {
  data: {
    recentClosedPortalSales: Sale[];
  };
}

interface Sale {
  id: string;
  priceInWei: string;
  timePurchased: string;
}

const queryAavegotchiSubgraph = async <Data>(query: DocumentNode) => {
  const res = await fetch(
    'https://aavegotchi.stakesquid-frens.gq/subgraphs/name/aavegotchi/aavegotchi-core-matic',
    {
      method: 'POST',
      body: JSON.stringify({ query: query.loc.source.body }),
    }
  );

  const { data } = (await res.json()) as Data;

  return data.recentClosedPortalSales;
};

(async () => {
  const recentSales = await queryAavegotchiSubgraph<RecentClosedPortalSalesResponse>(
    getRecentClosedPortalSalesQuery
  );
  const numberOfSales = recentSales.length;
  const totalSalesAmount = recentSales.reduce(
    (total, sale) => total + parseInt(sale.priceInWei, 10) / 1e18,
    0
  );
  const averageSalePrice = (totalSalesAmount / numberOfSales).toFixed(2);
  const oldestSaleDate = new Date(
    parseInt(recentSales[recentSales.length - 1].timePurchased, 10) * 1000
  );
  const timeframe = formatDistanceStrict(oldestSaleDate, new Date());

  console.log(
    `${numberOfSales} closed gotchi portals sold in the last ${timeframe} at an average price of ${averageSalePrice} $GHST`
  );
})();
