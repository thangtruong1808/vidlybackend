import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./searchBox";

class Movies extends Component {
	state = {
		//movies: getMovies(),
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		searchQuery: "",
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres: genres });
	}
	handlePageChange = (page) => {
		this.setState({ currentPage: page });
		//console.log("handlePageChange: ", page);
	};
	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
		console.log("Genre: ", genre);
	};
	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
		//console.log("handleSort: ", path);
	};
	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
		//console.log("Like, Clicked", movie);
	};

	handleDelete = (movie) => {
		const movies_filtered = this.state.movies.filter(
			(m) => m._id !== movie._id
		);
		this.setState({ movies: movies_filtered });
		//console.log("Total Object: ", this.state.movies.length);
	};
	getBadgeClasess() {
		let classes = "badge m-2 bg-";
		const { length: countMovies } = this.state.movies;
		classes += countMovies === 0 ? "success" : "info";
		return classes;
	}
	// const filtered =
	// 	selectedGenre && selectedGenre._id
	// 		? allMovies.filter((m) => m.genre._id === selectedGenre._id)
	// 		: allMovies;
	getPageData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			searchQuery,
			movies: allMovies,
		} = this.state;

		let filtered = allMovies;
		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);
		return { totalCount: filtered.length, data: movies };
	};
	render() {
		const { length: countMovies } = this.state.movies;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		if (countMovies === 0) {
			return (
				<p className={this.getBadgeClasess()}>
					There are no movies in the database.
				</p>
			);
		}

		const { totalCount, data: movies } = this.getPageData();
		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={this.state.genres}
						// Because we defined in the ListGroup:defaultProps
						// textProperty="name"
						// valueProperty="_id"

						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						{" "}
						New Movie{" "}
					</Link>
					<p>Showing {totalCount} movies in the databse</p>
					<SearchBox value={searchQuery} onChange={this.handleSearch} />
					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
