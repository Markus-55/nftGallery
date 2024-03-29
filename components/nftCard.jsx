import { CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

const NFTCard = ({ nft }) => {
  return (
    <div className="w-1/3 flex flex-col shadow-md shadow-white">
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          // if not gateway, use metadata image
          src={!nft.media[0].gateway ? nft.metadata.image : nft.media[0].gateway}
        ></img>
      </div>
      <div className="flex flex-col h-full y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
        <div className="flex-grow mt-2">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {parseInt(nft.id.tokenId)}</p>
          <p className="text-gray-600">Address: {nft.contract.address}</p>
          <CopyButton value={nft.contract.address} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                </ActionIcon>
              </Tooltip>)}
          </CopyButton>
        </div>

         <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
