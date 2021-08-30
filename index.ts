import fetch from 'node-fetch';
import { gql } from 'graphql-tag';
import { formatDistanceStrict } from 'date-fns';

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

const getRecentClosedPortalSales = async () => {
  const query = gql`
    {
      recentClosedPortalSales: erc721Listings(
        first: 150
        where: { category: 0, timePurchased_gt: 0 }
        orderBy: timePurchased
        orderDirection: desc
      ) {
        id
        priceInWei
        timePurchased
      }
    }
  `;

  const res = await fetch(
    'https://aavegotchi.stakesquid-frens.gq/subgraphs/name/aavegotchi/aavegotchi-core-matic',
    {
      method: 'POST',
      body: JSON.stringify({ query: query.loc.source.body }),
    }
  );

  const { data } = (await res.json()) as RecentClosedPortalSalesResponse;

  return data.recentClosedPortalSales;
};

(async () => {
  const recentSales = await getRecentClosedPortalSales();
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
