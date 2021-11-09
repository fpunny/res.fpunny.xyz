import { graphql, useStaticQuery } from 'gatsby';
import { useMemo } from 'react';
import { useResume } from '../components/Base';

const query = graphql`
  {
    data: allGraphCmsMetadata(filter: { global: { eq: true } }) {
      nodes {
        field
        listValue
        jsonValue
        stringValue
        numberValue
        booleanValue
        datetimeValue
      }
    }
  }
`;

export default function useMetadata(metadatas = useResume().metadatas) {
  const { data } = useStaticQuery(query);
  return useMemo(() => data.nodes.concat(metadatas).reduce(
    (acc, curr) => {
      acc[curr.field] =
        curr.stringValue ??
        curr.numberValue ??
        curr.booleanValue ??
        curr.datetimeValue ??
        curr.jsonValue ??
        curr.listValue;
      return acc;
    },
    {},
  ), [ data ]);
}