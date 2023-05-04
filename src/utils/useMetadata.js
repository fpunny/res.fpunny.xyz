import { graphql, useStaticQuery } from 'gatsby';
import { useMemo } from 'react';

const query = graphql`
  {
    data: graphCms {
      metadatas(where:{ global: true }) {
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

export default function useMetadata(metadatas) {
  const { data } = useStaticQuery(query);
  return useMemo(
    () =>
      data.metadatas.concat(metadatas ?? []).reduce((acc, curr) => {
        acc[curr.field] =
          curr.stringValue ??
          curr.numberValue ??
          curr.booleanValue ??
          curr.datetimeValue ??
          curr.jsonValue ??
          curr.listValue;
        return acc;
      }, {}),
    [data, metadatas],
  );
}
