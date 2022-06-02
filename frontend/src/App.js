import { useEffect, useState } from "react";
import "./App.css";
import ScrapeForm from "./components/ScrapeFormComponent/ScrapeFormComponent";
import ImageCard from "./components/ImageCardComponent/ImageCard";
import ScrollToTop from "./components/ScrollToTopComponent/ScrollToTopComponent";
import axios from "axios";


const App = () => {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('chegou aqui')

    if(posts.length > 0){
      setData(posts)
    }

    axios
      .get("http://localhost:8000/api/v1/posts/all")
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [posts]);

  return (
    <div className="w-full h-full ">
      <div className="container mx-auto rounded-md  shadow-lg border p-8 m-10 bg-white overflow-auto">
        <div className="flex justify-center items-center mb-16">
          <h2
            className="text-6xl font-semibold leading-normal mt-0 mb-5 text-gray-800"
            id="basic"
          >
            Reddit Scraper
          </h2>
        </div>

        <div className="flex flex-col  items-center justify-center">
          <p>
            Click on the button below and it will get the 25 most
            recent posts on the subreddit. <span className="underline decoration-orange-500">The scrape process may take a few seconds</span>
          </p>
          
          <ScrapeForm posts={setPosts} setScraping/>

          
          
        </div>

        <hr className="my-12" />

        <div className={`flex justify-center items-center mb-10  ${data && data.length > 0 ? "hidden" : "visible"}`}>
          <h2 className="text-4xl font-semibold leading-normal mt-5 mb-5 text-gray-800" id="basic">
              No content to show here. Click on the start scrape button.
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-center">
          {data.map((post) => {
            return <ImageCard post={post} key={post.id} />;
          })}
        </div>
        <ScrollToTop />
      </div>
    </div>
  );
};

export default App;
