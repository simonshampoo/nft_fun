import { ethers } from "ethers";
const axios = require("axios");

require("dotenv").config();

type Asset = {
  owner: string;
  ownerAddress: string;
  listingPrice: number | undefined;
  highestBid: number | undefined;
  isListed: boolean;
};

type Order = {
  maker: string | undefined;
  makerAddress: string | undefined;
  taker: string | undefined;
  takerAddress: string | undefined;
  bidPrice: string | undefined;
  listingPrice: number | undefined;
};

const ordersExist = (result: any) => {
  return result.orders;
};

export const retrieveAsset = async () => {
  const contractAddress: string | undefined = process.env.CONTRACT_ADDRESS;
  const tokenId: string | undefined = process.env.TOKEN_ID;
  axios.defaults.headers.common = {
    "X-API-Key": process.env.OPENSEA_API_KEY,
  };

  try {
    const result = await axios.get(
      `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}?format=json`
    );
    const resultData = result.data;
    console.log(resultData.asset_contract.name + " " + resultData.token_id);
    console.log("Owner:", resultData.owner.user.username);
    console.log("Owner address:", resultData.owner.address);
    console.log("=============");
    console.log("Orders:");
    for (let order of resultData.orders) {
      console.log(ethers.utils.parseEther(order.current_price));
    }
    // const assetName = assetObject.name;
    // const assetOwner = assetObject.owner.user.username;
    // const assetOwnerAddress = assetObject.owner.address;
  } catch (error) {
    console.log(error);
    return;
  }
};
