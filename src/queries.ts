import { gql } from 'graphql-tag';

export const getRecentClosedPortalSalesQuery = gql`
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
