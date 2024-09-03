"use client";

import React, { useState, useEffect } from "react";
import CampaignDetailsComponent from "./campaignDetailsComponent";
import axios from "axios";
import { SERVER_IP } from "../../../../utils/constants";

const Page = ({ params }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsRes = await axios.get(
          `${SERVER_IP}/api/campaign/${params}`,
        );
        setCampaigns(campaignsRes.data.data);
        console.log("Fetched Campaigns:", campaigns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const campaignData = campaigns.find((item) => item?._id === params.slug);
  // console.log("Selected Campaign ID:", params.slug);
  // console.log("Selected Campaign Data:", campaignData);

  // return <CampaignDetailsComponent campaignData={campaignData} />;
};

export default Page;
