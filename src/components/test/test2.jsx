import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseURL = "https://ktuoawzzqcqvidxiqkzy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dW9hd3p6cWNxdmlkeGlxa3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5Mzc2MTcsImV4cCI6MjA5MDUxMzYxN30.jvAbkT1pPwjsb05C3THNnpcMipfexMD7NBj3rXWS-mU";
const supabase = createClient(supabaseURL, supabaseKey);

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    console.log(e.target.files);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      //Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("Images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      //Get the public URL of the uploaded file
      const {
        data: { publicURL },
      } = supabase.storage.from("Images").getPublicUrl(filePath);

      console.log("File uploaded successfully:", publicURL);
      setFile(null);
      //Reset the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("Error uploading:", err);
      setError(err.message || "Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
