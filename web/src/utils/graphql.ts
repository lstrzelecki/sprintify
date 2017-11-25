
export default function query(operation: string, variables: {} = {}) {

  return fetch('/api/graphql', {
    method: 'POST',
    headers: [
      ['Content-Type', 'application/json'],
      ['Accept', 'application/json']
    ],
    body: JSON.stringify({
      query: operation,
      variables
    })
  }).then(response => response.json())
    .then(({ data }) => data);

}