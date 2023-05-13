import ReactDOM from 'react-dom/client'
import {App} from './Components/App'
import './index.sass'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const API_URI: string = 'http://localhost:3000/graphql'


const client = new ApolloClient({
	uri: API_URI,
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
