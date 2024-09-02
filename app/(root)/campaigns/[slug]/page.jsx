"use client";

import React, { useState, useEffect } from "react";
import CampaignDetailsComponent from "./campaignDetailsComponent";
import axios from "axios";

const Page = ({ params }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsRes = await axios.get(
          `http://localhost:5005/api/campaign/${params}`,
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
