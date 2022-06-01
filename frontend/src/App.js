import { useEffect, useState } from "react";
import "./App.css";
import ScrapeForm from "./components/ScrapeFormComponent/ScrapeFormComponent";
import ImageCard from "./components/ImageCardComponent/ImageCard";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/posts/all")
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, []);

  return (
    <div className="w-full h-full bg-teal-900 ">
      <div className="container mx-auto rounded-md  shadow-lg border p-8 m-10 bg-white overflow-auto">
        <div className="flex justify-center items-center mb-20">
          <h2
            className="text-4xl font-semibold leading-normal mt-0 mb-5 text-gray-800"
            id="basic"
          >
            Reddit Scraper
          </h2>
        </div>

        <div className="flex flex-col  items-center justify-center">
          <p>
            You can simply click on the button below and it will get the 25 most
            recent posts on the subreddit, or you can type in the desired value.
          </p>
          <p className="mb-16">
            <a class="underline decoration-orange-500">
              The higher the value, the longer the process time.
            </a>
          </p>
          <ScrapeForm />
        </div>

        <hr className="my-12" />

        <div className="flex flex-wrap items-center justify-center">
          {data.map((post) => {
            return <ImageCard post={post} key={post.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
