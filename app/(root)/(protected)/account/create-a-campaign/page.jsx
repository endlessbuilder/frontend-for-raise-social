"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import RichTextEditor from "@/components/ui/richTextEditor";
import DragDropUpload from "@/components/ui/dragDropUpload";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [amount, setAmount] = useState();
  const [campaignImage, setCampaignImage] = useState();
  const [proofDocuments, setProofDocuments] = useState([]);
  const [campaignTitle, setCampaignTitle] = useState("");
  const [description, setDescription] = useState("");
  const [campaignImageIds, setCampaignImageId] = useState();
  const [proofDocumentIds, setProofDocumentIds] = useState([]);
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, locationsRes] = await Promise.all([
          axios.get("http://192.168.146.191:5005/api/category"),
          axios.get("http://192.168.146.191:5005/api/location"),
        ]);

        setCategories(categoriesRes.data.category || []);
        setLocations(locationsRes.data.country || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const validateInputs = () => {
  //   if (
  //     !campaignTitle ||
  //     !category ||
  //     !location ||
  //     !amount ||
  //     !campaignImage ||
  //     !description ||
  //     proofDocuments.length === 0
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };

  const uploadFile = async (files) => {
    const formData = new FormData();

    // If multiple files, append them
    if (Array.isArray(files)) {
      files.forEach((file, index) => formData.append("file_" + index, file));
    } else {
      formData.append("files", files); // Single file
    }

    try {
      const response = await axios.post(
        "http://localhost:5004/api/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Ensure the response contains the uploaded file information
      const uploadedFiles = response.data.uploaded;
      console.log("Uploaded Files:", uploadedFiles);

      // Map the file IDs
      const fileIds = uploadedFiles.map((file) => file._id);
      return fileIds;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      // Upload campaign image
      const campaignImageIds = await uploadFile(campaignImage);
      setCampaignImageId(campaignImageIds[0]); // Assuming there's only one campaign image
      console.log(campaignImageIds);
      // Debugging: Check if proofDocuments contains files
      console.log("Proof Documents:", proofDocuments);

      // Upload proof documents and get their IDs
      const proofDocumentIds = await uploadFile(proofDocuments);
      setProofDocumentIds(proofDocumentIds);

      console.log("Proof Document IDs:", proofDocumentIds);
      // if (!validateInputs()) {
      //   alert("All fields must be filled!");
      //   return;
      // }
      // Prepare form data

      const formData = {
        title: campaignTitle,
        categoryId: category,
        countryId: location,
        amount: amount,
        file: campaignImageIds[0],
        kyc: proofDocumentIds,
        text: description,
        createrId: userID,
        totalAmount: "0",
      };

      // Send form data to the server
      const response = await axios.post(
        "http://localhost:5005/api/campaign/create",
        formData,
      );
      console.log("Campaign created successfully:", response.data);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (error) {
    return <div>Error loading data</div>; // Add an error state
  }
  return (
    <div className="pb-8">
      <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading">
        Create a Campaign
      </h1>
      <div className="grid grid-cols-2 gap-8 mb-4">
        <div className="flex flex-col gap-5">
          <Input
            variant="bordered"
            label="Campaign Title"
            radius="sm"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
          />
          <Autocomplete
            label="Where will your funds go? (Country)"
            variant="bordered"
            radius="sm"
            onSelectionChange={(key) => {
              setLocation(key);
            }}>
            {locations.map((item) => (
              <AutocompleteItem key={item._id} value={item.name}>
                {item.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Autocomplete
            label="Why are you raising funds? (Category)"
            variant="bordered"
            radius="sm"
            onSelectionChange={(key) => {
              setCategory(key);
            }}>
            {categories.map((item) => (
              <AutocompleteItem key={item._id} value={item.name}>
                {item.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Input
            variant="bordered"
            label="How much fund do you want to raise? (Goal)"
            radius="sm"
            onChange={(e) => setAmount(e.target.value)}
            endContent={
              <p className="font-heading text-xl text-brand-dark">SOL</p>
            }
          />
          <DragDropUpload
            acceptedFormats={{
              "image/*": [".jpeg", ".png", ".jpg", ".gif"],
            }}
            isMultiple={false}
            label="Campaign Image"
            onChange={(files) => setCampaignImage(files[0])}
          />
        </div>
        <RichTextEditor
          value={description}
          onChange={(content) => setDescription(content)}
          placeholder="Hello Everyone, We are raising funds for..........."
        />
        <div className="col-span-2">
          <DragDropUpload
            acceptedFormats={{
              "image/*": [".jpeg", ".png", ".jpg", ".gif"],
              "application/*": [".pdf"],
            }}
            isMultiple={true}
            label="Proof Document"
            onChange={(files) => setProofDocuments(files)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant="solid"
          radius="full"
          size="lg"
          className="font-medium bg-brand-olive-green border-brand-olive-green text-white"
          onClick={handleSubmit}>
          Send For KYC
        </Button>
      </div>
    </div>
  );
};

export default Page;
