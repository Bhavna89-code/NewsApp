import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

import Loader from './Loader';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
	static defaultProps = {
		country: 'us',
		pageSize: 5,
		category: 'general'
	}
	static propsType = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
	}
	capitalize = (s) => {
		return s.toLowerCase().replace(/\b./g, function (a) { return a.toUpperCase(); });
	};

	constructor(props) {
		super(props);
		console.log("This is new componet constuctore");
		this.state = {
			articles: [],
			loading: true,
			page: 1,
			totalResults: 0
		}
		document.title = `${this.capitalize(this.props.category)} -NEWS`;

	}
	async updateNews() {
		this.props.setProgress(30);
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;

		let data = await fetch(url);
		let parseData = await data.json()
		this.props.setProgress(70);

		this.setState({ loading: true });
		this.setState({
			articles: parseData.articles,
			totalResult: parseData.totalResults,
			loading: false

		})
		this.props.setProgress(100);

	}
	async componentDidMount() {
		this.updateNews()
	}
	// handlePreClick = async () => {

	// 	this.setState({page:this.state.page - 1})
	// 	this.updateNews()
	// }

	// handleNextClick = async () => {


	// 	this.setState({page:this.state.page +1})
	// 	this.updateNews()
	// }

	fetchMoreData = async () => {
		this.setState({ page: this.state.page + 1 });
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
	
		
		let data = await fetch(url);
		let parseData = await data.json();
		
		this.setState({
			articles: this.state.articles.concat(parseData.articles),  // Fix here
			totalResult: parseData.totalResults,
		
		});
	};
	


	render() {
		return (
			<>
			
				
					<h1 className='text-center'>Top Headline From {this.capitalize(this.props.category)} </h1>
				
						{/* {this.state.loading && <Loader />} */}
			
					<InfiniteScroll
						dataLength={this.state.articles.length !== this.state.totalResult}
						next={this.fetchMoreData}
						hasMore={true}
						loader={<h4><Loader /></h4>}
					>
					<div className="container">
						<div className="row mt-3">
							{!this.state.loading && this.state.articles.map((element) => {
								return <div className="col-md-3" key={element.url}>
									<NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

								</div>
							})}
						</div>
					</div>
					</InfiniteScroll>
				
				{/* <div className="container d-flex justify-content-between">
					<button disabled={this.state.page <= 1} className="btn btn-dark mx-2" onClick={this.handlePreClick}>&larr; Previous </button>
					<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} className="btn btn-dark mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
				</div> */}

			</>

		)
	}
}

export default News
