import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql', // Your GraphQL API endpoint
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default client
