import fetch from 'node-fetch';
import { DocumentNode } from 'graphql';

export const queryAavegotchiSubgraph = async <Response>(query: DocumentNode): Promise<Response> => {
  const res = await fetch(
    'https://aavegotchi.stakesquid-frens.gq/subgraphs/name/aavegotchi/aavegotchi-core-matic',
    {
      method: 'POST',
      body: JSON.stringify({ query: query.loc.source.body }),
    }
  );

  const { data } = await res.json();

  return data;
};
