import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("url");
  const [urlToDetect, setUrlToDetect] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDetection = async () => {
    if (selectedOption === "url") {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/predict?feature=${encodeURIComponent(
            urlToDetect
          )}`
        );

        console.log("Response from FastAPI:", response.data);

        if (response.data.result === "This is not a Phishing Site") {
          setDetectionResult("Safe to use");
        } else if (response.data.result === "This is a Phishing Site") {
          setDetectionResult("Phishing Website");
        } else {
          setDetectionResult("Invalid URL or Error");
        }
      } catch (error) {
        console.error("Error analyzing URL", error);
        setDetectionResult("Invalid URL or Error");
      }
    } else if (selectedOption === "image") {
      try {
        setDetectionResult("Detecting...");

        const formData = new FormData();
        formData.append("file", selectedImageFile);

        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Response from Flask API:", result);
          setDetectionResult(result.result);
        } else {
          console.error("Error processing image:", response.statusText);
          setDetectionResult("Error processing image");
        }
      } catch (error) {
        console.error("Error processing image:", error);
        setDetectionResult("Error processing image");
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImageFile(file);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="shadow p-4 rounded">
            <h1 className="display-4 text-center mb-4">Phishing Detector</h1>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input h5"
                id="urlOption"
                value="url"
                checked={selectedOption === "url"}
                onChange={handleOptionChange}
              />
              <label className="form-check-label h5" htmlFor="urlOption">
                Detect using URL
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input h5"
                id="imageOption"
                value="image"
                checked={selectedOption === "image"}
                onChange={handleOptionChange}
              />
              <label className="form-check-label h5" htmlFor="imageOption">
                Detect using Image
              </label>
            </div>
            {selectedOption === "url" && (
              <div className="input-group mt-3">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Enter URL to detect phishing..."
                  value={urlToDetect}
                  onChange={(e) => setUrlToDetect(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={handleDetection}
                  >
                    Detect
                  </button>
                </div>
              </div>
            )}
            {selectedOption === "image" && (
              <div className="input-group mt-3">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="imageUpload"
                    onChange={handleImageUpload}
                  />
                  <label className="custom-file-label" htmlFor="imageUpload">
                    Choose an image file...
                  </label>
                </div>
                <div className="input-group-append">
                  <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={handleDetection}
                  >
                    Detect
                  </button>
                </div>
              </div>
            )}
            {detectionResult !== null && (
              <div
                className={`alert ${
                  detectionResult === "Safe to use" ||
                  detectionResult === "Predicted Website is Safe"
                    ? "alert-success"
                    : "alert-danger"
                } mt-3`}
              >
                <strong>Result:</strong> {detectionResult}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
