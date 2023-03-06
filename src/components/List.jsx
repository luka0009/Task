import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";

export default function List() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    // owner=<your_address_here>
    axios.get("https://api.opensea.io/api/v1/assets?").then((response) => {
      setNfts(response.data.assets);
    });
  }, []);

  console.log(nfts);

  return (
    <div className="grid grid-cols-2 ml-[45%] mt-[70%] translate-x-[-50%] translate-y-[-50%] gap-x-[400px] gap-y-36">
      {nfts.map((nft, index) => {
        return nft.image_url ? (
          <div className="relative border-2 border-blue-500 w-[330px] p-5">
            <span 
            className="font-bold text-lg absolute top-[-40px] left-[50%] translate-x-[-50%]"
            > Awesome NFT 
            </span>
            <CardComponent
              key={nft.id}
              description={nft.description}
              link={nft.permalink}
              image_url={nft.image_url}
              index={index}
            />
          </div>
        ) : null;
      })}
    </div>
  );
}
