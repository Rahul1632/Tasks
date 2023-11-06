import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { buttonsArray } from "./Data";

const ImageContainer = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [tagName, setTagName] = useState("");
  const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
  const baseUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22${
    input === "" ? tagName : input
  }%22&per_page=20&format=json&nojsoncallback=1`;

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setTagName("");
  };

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);
      const result = await response.json();
      setData(result.photos.photo);
    } catch (error) {
      alert("Error: ", error);
    }
  };

  const debouncedFetchData = useMemo(() => debounce(fetchData, 1000), [input]);

  useEffect(() => {
    if (tagName !== "") {
      fetchData();
    } else {
      debouncedFetchData();
    }
    return () => debouncedFetchData.cancel();
  }, [tagName, debouncedFetchData]);

  return (
    <>
      <div className="flex items-center bg-white flex-col pt-10 overflow-y-auto justify-center">
        <h1 className="text-3xl lg:text-5xl md:text-4xl text-[#000080] text-center italic mb-10 font-extrabold">
          Image Gallery
        </h1>
        <input
          type="search"
          name="search"
          placeholder="Search here"
          value={input}
          autoComplete="off"
          className="p-2 w-1/2 rounded shadow-lg border-2 border-[#000080] focus:outline-none"
          onChange={handleInputChange}
        />
        <div className="p-2 mt-5 flex items-center justify-center flex-wrap gap-3">
          {buttonsArray.map((item) => (
            <div key={item}>
              <button
                onClick={() => {
                  setTagName(item);
                  setInput("");
                }}
                style={{
                  backgroundColor: tagName === item ? "#60A5FA" : "#000080",
                }}
                className="rounded py-2 px-3 text-white font-bold bg-blue-400 cursor-pointer"
              >
                {item}
              </button>
            </div>
          ))}
        </div>
        <h1 className="text-4xl mt-4 font-extrabold capitalize text-[#000080]">
          {input === "" ? tagName : input}
        </h1>
        <div className="flex flex-wrap gap-5 h-full overflow-y-auto justify-center w-full m-0 py-10 px-5">
          {data.length > 0 ? (
            data.map((image) => (
              <div
                key={image.id}
                className="w-[430px] md:w-[380px] lg:w-[400px] h-auto relative text-center mb-5 hover:scale-105"
              >
                <img
                  className="w-full h-[700px] rounded shadow-2xl shadow-black"
                  src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
                  alt={image.title}
                  title={image.title}
                />
                <div className="w-full h-full opacity-0 hover:opacity-100 duration-100 absolute left-0 bottom-0 right-0 z-10 flex justify-center items-center text-xl text-white hover:bg-gray-500 hover:bg-opacity-70 font-semibold">
                  <p className="max-w-[300px]">{image.title}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-3xl text-[#000080] font-bold">
              Please wait images are loading...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageContainer;
