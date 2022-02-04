import React, { Component } from "react";
import http from "../services/httpService";
import config from "../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.css";

class FetchingData extends Component {
	state = { posts: [] };

	async componentDidMount() {
		//Get data from JasonPlaceHolder
		//We need to add async in front of the function when using await.
		const { data: posts } = await http.get(config.apiEndpoint);
		this.setState({ posts });
	}
	handleAdd = async () => {
		const obj = { title: "a", body: "b" };
		const { data: post } = await http.post(config.apiEndpoint, obj);
		const posts = [post, ...this.state.posts];
		this.setState({ posts });
		console.log(post);
	};

	handleUpdate = async (post) => {
		post.title = "UPDATED";
		await http.put(config.apiEndpoint + "/" + post.id, post);
		const posts = [...this.state.posts];
		const index = posts.indexOf([post]);
		posts[index] = { ...posts };
		this.setState({ posts });
		console.log("Updated-Successful");
	};

	handleDelete = async (post) => {
		const originalPosts = this.state.posts;

		const posts = this.state.posts.filter((p) => p.id !== post.id);
		this.setState({ posts });

		try {
			await http.delete("ss@@@@s" + config.apiEndpoint + "/" + post.id);
			//throw new Error("");
		} catch (ex) {
			//Expected error (404: not found, 400 bad request) -- Client Error
			// Display a specific error message

			console.log("Handle Delete Catch Block");
			if (ex.response && ex.response.status === 404)
				toast("This post has already been deleted");

			//Unexpected error (network down, server down, database down, bugs)
			// See the log files
			// Display a generic and friendly error message
			//	alert("Delete failed");
			this.setState({ posts: originalPosts });
		}

		//console.log("Deleted-Successful");
	};
	render() {
		return (
			<React.Fragment>
				<ToastContainer />
				<button className="btn btn-primary" onClick={this.handleAdd}>
					Add
				</button>
				<table className="table">
					<thead>
						<tr>
							<th>UserId</th>
							<th>ID</th>
							<th>Title</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.state.posts.map((post) => (
							<tr key={post.id}>
								<td>{post.userId}</td>
								<td>{post.id}</td>
								<td>{post.title}</td>
								<td>
									<button
										className="btn btn-info btn-sm"
										onClick={() => this.handleUpdate(post)}
									>
										Update
									</button>
								</td>
								<td>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => this.handleDelete(post)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

export default FetchingData;
