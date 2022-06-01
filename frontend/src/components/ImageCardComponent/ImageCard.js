import { useEffect, useState } from 'react';

const ImageCard = ({ post }) => {
    const [selected, setSelected] = useState(0);
    const [imgLoaded, setImgLoaded] = useState(false)

    const onLoadImage = () => {
      console.log('image loaded');
      setImgLoaded(true)
    }
    
    const isMultiImage = () => {
        return post.images.length > 1
    }

    const handleAnterior = () => {
      if (selected === 0) {
        return;
      }
      setSelected(selected - 1);
    };

    const handleProximo = () => {
      if (selected === post.images.length - 1) {
        return;
      }
      setSelected(selected + 1);
    };

    if (post) {
      return (
        <div className={`overflow-hidden shadow-lg w-96 h-3/4 m-5 border-2 rounded-md ${imgLoaded ? "" : "hidden" }`}>

          <div className="flex border rounded-md bg-slate-100 items-center shadow-md">
            <a target="_blank" rel="noreferrer" href={post.images[selected].src}>
              <img src={post.images[selected].src} onLoad={onLoadImage} className="object-contain h-96 w-96"  title={post.images[selected].name} alt="{post.images[selected].name}" />
            </a>
          </div>
          
          <div className="px-6 py-4">
            <div className="font-bold text-md mb-2">
              <p className="truncate" title={`${post.title}  - by: ${post.author}`} >
                {post.title}
              </p>
            </div>
          </div>
          <div className="px-6 pt-4 pb-2 flex justify-around"  >
            <button 
              type="button"
              onClick={handleAnterior} 
              className="bg-green-700 hover:bg-green-600 border-green-700 hover:border-green-600 text-white font-bold py-2 px-2 rounded-md cursor-pointer"
              style={{ display: isMultiImage() ? "block" : "none" }}
              > 

              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>

            </button>

            <span title="photo" className="inline-block  rounded-md px-4 py-2 text-xs font-semibold text-gray-700 mr-2 ">
              { selected+1 }/{post.images.length }
            </span>

            <button 
              type="button"
              onClick={handleProximo} 
              className="bg-green-700 hover:bg-green-600 border-green-700 hover:border-green-600 text-white font-bold py-2 px-2 rounded-md cursor-pointer" 
              style={{ display: isMultiImage() ? "block" : "none" }}>

              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>

            </button>
          </div>

          {/* <div className="px-6 pt-4 pb-2 flex justify-left">
            <span title="author" className="inline-block bg-gray-200 rounded-md px-3 py-1 text-xs font-medium text-gray-700 mr-2 mb-2">{post.author}</span>
          </div> */}
        </div>
      );
    }

    return null;
  };

  export default ImageCard