import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql', // Your GraphQL API endpoint
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default client
