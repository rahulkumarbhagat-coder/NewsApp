import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capatalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {    //first to run, before render
    super(props);

    console.log("i am constructor in news.js");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title=`${this.capatalize(this.props.category)} - ZoroNews`
  }

  async componentDidMount() {      //runs after render
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles:parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updatePage();
  }

  async updatePage() {
    this.props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  handlePrev = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parsedData = await data.json();
    // console.log(parsedData);

    //   this.setState({
    //     page: this.state.page - 1,
    //     articles:parsedData.articles,
    //     loading:false

    //   })
    await this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
    this.updatePage();
  };

  handleNext = async () => {
    // if(this.state.page +1 > Math.ceil(this.state.totalResults/this.state.pageSize)){

    // }

    // else{
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //   this.setState({loading:true})
    //   let data = await fetch(url)
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //     this.setState({
    //       page: this.state.page + 1,
    //       articles:parsedData.articles,
    //       loading: false

    // })
    // }
    await this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    this.updatePage();
  };

  fetchMoreData = async()=>{
    await this.setState((prevState) => ({
      page: prevState.page + 1,
    }),
    async()=>{
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    await this.setState((prevState)=>({
      articles: prevState.articles.concat(parsedData.articles) ,
      totalResults: parsedData.totalResults
    }));
    }
  );
    
  }
  

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "30px" }}>
          ZoroNews - World's Top Headlines on {this.capatalize(this.props.category)}
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<Spinner/>}
        >
        {this.state.loading && <Spinner />}
        <div className="container">
        <div className="row">
          {/* {!this.state.loading &&  (loading will show until its loads)*/this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author ? element.author : "unknown"}
                    date={element.publishedAt}
                    source={element.source.name ? element.source.name : ""}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
