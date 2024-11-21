import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const UploadDataPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitPdf = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);

    const uploadData = new FormData();
    uploadData.append("file", selectedFile);

    try {
      const response = await api.post("/api/upload-student-data/", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        setSelectedFile(null);
        document.getElementById("fileInput").value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4 rounded" style={{ width: "500px" }}>
        <h2 className="text-center mb-4">Upload Student Data</h2>
        <form onSubmit={handleSubmitPdf}>
          {/* File Input */}
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Choose File (Excel .xlsx)
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".xlsx"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDataPDF;
