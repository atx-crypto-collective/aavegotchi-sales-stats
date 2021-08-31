import { gql } from 'graphql-tag';
import { getUnixTime, sub } from 'date-fns';
import { Sale } from './types';

export interface GetRecentClosedPortalSalesQueryResponse {
  recentClosedPortalSales: Sale[];
}

const lastDay = getUnixTime(sub(new Date(), { days: 1 }));

export const getRecentClosedPortalSalesQuery = gql`
  {
    recentClosedPortalSales: erc721Listings(
      first: 1000
      where: { category: 0, timePurchased_gt: ${lastDay} }
      orderBy: timePurchased
      orderDirection: desc
    ) {
      id
      priceInWei
      timePurchased
    }
  }
`;
