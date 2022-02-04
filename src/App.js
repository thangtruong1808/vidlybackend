import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./component/movies";
import MovieForm from "./component/movieForm";
import Customers from "./component/customers";
import NotFound from "./component/notFound";
import Rentals from "./component/rentals";
import NavBar from "./component/common/navbar";
import LoginForm from "./component/loginForm";
import RegisterForm from "./component/registerForm";
import FetchingData from "./component/fetchingData";
import "./App.css";

function App() {
	return (
		<React.Fragment>
			<NavBar />
			<main className="container">
				<Switch>
					<Route path="/login" component={LoginForm} />
					<Route path="/register" component={RegisterForm} />
					<Route path="/fetching" component={FetchingData} />
					<Route path="/movies/:id" component={MovieForm} />
					<Route path="/movies" component={Movies}></Route>
					<Route path="/customers" component={Customers}></Route>
					<Route path="/not-found" component={NotFound}></Route>
					<Route path="/rentals" component={Rentals}></Route>
					<Redirect from="/" exact to="/movies" />
					<Redirect to="/not-found" />
				</Switch>
			</main>
		</React.Fragment>
	);
}
export default App;
