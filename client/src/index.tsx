import ReactDOM from 'react-dom/client'
import {App} from './Components/App'
import './index.sass'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split} from "@apollo/client";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";

const API_URI: string = 'http://localhost:3000/graphql'
const SUBSCRIPTION_URL : string =  'ws://localhost:3000/subscriptions'

const httpLink = createHttpLink({
	uri: API_URI,
	credentials: 'include'
})


const wsLink = new GraphQLWsLink(createClient({
	url: SUBSCRIPTION_URL
}))

const splitLink = split(
	({query}) =>{

		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
)



const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
})





const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>
)
