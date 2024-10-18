import React, { Component } from 'react'
// import myImage from './news-2444778_960_720.webp'

export class NewsItem extends Component {
  render() {
	let {title,description,imageUrl,newsUrl,author,date,source}=this.props;

	return (
	  <div className='my-3'>
	   <div className="card" style={{width: "18rem"}}>
				<div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:'-33px'}}>
				<span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{marginTop: "7px"}}>{source}</span>
				</div>
			<img  src={imageUrl} className="card-img-top" alt={imageUrl} style={{height:'286px',width:'286px'}}/>
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{description}...</p>
				<p className="card-text"><small class="text-body-secondary">By {!author?"Unknown":author} On {new Date(date).toGMTString()}</small></p>
				<a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
			</div>
			</div>
	  </div>
	)
  }
}

export default NewsItem
