import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imgUrl,newsUrl,author,date,source} = this.props
    return (
      <div className='my-3'>
            <div className="card">
              <div><span className="badge rounded-pill bg-success" style={{
                display:'flex',
                justifyContent:'flex-end',
                position: 'absolute',
                right:'0'
              }} >{source}</span></div>
            
              <img src={imgUrl?imgUrl:"https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1341266246/image_1341266246.jpg?io=getty-c-w750"} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toString()} </small></p>
                <a href={newsUrl} className="btn btn-sm btn-dark">Read more</a>
              </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
