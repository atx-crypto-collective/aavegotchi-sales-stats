import nodeFetch from 'node-fetch';
import { formatDistanceStrict } from 'date-fns';

interface Sale {
  category: string;
  gotchi: null;
  id: string;
  priceInWei: string;
  seller: string;
  timePurchased: string;
  tokenId: string;
}

interface RecentClosedGotchiPortalSalesResponse {
  data: {
    erc721Listings: Sale[];
  };
}

const getRecentClosedGotchiPortalSales = async (numberOfSales: number) => {
  const res = await nodeFetch(
    'https://aavegotchi.stakesquid-frens.gq/subgraphs/name/aavegotchi/aavegotchi-core-matic',
    {
      method: 'POST',
      body: `{"query":"\\n  {erc721Listings(first:${numberOfSales}, where:{category:0,timePurchased_gt:0}, orderBy:timePurchased, orderDirection:desc) {\\n\\n    id\\n    tokenId\\n    category\\n    priceInWei\\n    seller\\n    timePurchased\\n    gotchi {\\n  id\\n  name\\n  collateral\\n  modifiedNumericTraits\\n  stakedAmount\\n  hauntId\\n  kinship\\n  modifiedRarityScore\\n  baseRarityScore\\n  level\\n  experience\\n  owner {\\n    id\\n  }\\n    }\\n}}\\n"}`,
    }
  );

  const { data } = (await res.json()) as RecentClosedGotchiPortalSalesResponse;

  return data;
};

(async () => {
  const { erc721Listings: recentSales } = await getRecentClosedGotchiPortalSales(150);
  const numberOfSales = recentSales.length;
  const totalSalesAmount = recentSales.reduce(
    (total: number, sale) => total + parseInt(sale.priceInWei, 10) / 1e18,
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
