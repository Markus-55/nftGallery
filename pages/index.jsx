import NFTCard from "../components/nftCard.jsx";
import { useState } from 'react';     

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);



  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    let requestOptions = {
      method: 'GET'
    };
    
    // If collection field empty,
    // provides nfts of address
    if(!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    // If collection address is provided
    } else {
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }
    // If nfts exist, set owned nfts
    if(nfts) {
      setNFTs(nfts.ownedNfts);
    }
  }
  
  const fetchNFTsForCollection = async () => {
    // if collection field is not empty, 
    // fetch collection for nft
    if(collection.length) {
      let requestOptions = {
        method: 'GET'
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      // If nfts exist, set nft collections
      if(nfts) {
        setNFTs(nfts.nfts);
      }
    }
  }

  return (
    // Fetch NFT gallery with walletAddress and collectionAddress
    // if fetched collection, fetch collection for nft
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col  w-full justify-center items-center gap-y-2">
        <input onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if(fetchForCollection) {
              fetchNFTsForCollection();
            } else fetchNFTs();
          }
        }>Let's go! </button>
      </div>
      <div className="flex flex-wrap gap-y-11 mt-4 w-5/6 gap-x-5 justify-center">
        {
          NFTs.length && NFTs.map((nft) => {
            if((nft.contractMetadata.tokenType === "ERC721") && (!nft.media[0].gateway ? nft.metadata.image : nft.media[0].gateway)) {
              return (
                <NFTCard nft={nft}></NFTCard>
              );
            
            }
          })
        }
      </div>
    </div>
  );
}

export default Home
