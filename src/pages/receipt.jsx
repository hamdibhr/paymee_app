import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlinePaperClip } from "react-icons/ai";
import "./receipt.css";

function Receipt() {
  const [fileName, setFileName] = useState("No selected file");

  const handleFileChange = ({ target: { files } }) => {
    if (files[0]) {
      const fullName = files[0].name;
      const fileExtension = fullName.split(".").pop();
      const fileNameWithoutExtension = fullName.substring(
        0,
        fullName.lastIndexOf(".")
      );

      if (fileNameWithoutExtension.length > 10) {
        const shortFileName = fileNameWithoutExtension.substring(0, 5);
        setFileName(`${shortFileName}...${fileExtension}`);
      } else {
        setFileName(fullName);
      }
    } else {
      setFileName("No selected file");
    }
  };

  const handleFileClear = () => {
    setFileName("No selected file");
    const fileInput = document.querySelector(".input-field");
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const uploadMessageStyle = {
    color: "#034DA3",
    textAlign: "center",
    marginTop: "70px",
  };
  const uploadMessageStyl = {
    color: "#5469D4",
    textAlign: "center",
  };

  return (
    <main>
      <form className="center-container">
        <div className="qrcode">
          <div>
            <h2>Receipt</h2>
          </div>
          <div>
            <h6>Receipt</h6>
          </div>
          <section>
            <div>
              <input
                type="file"
                accept="image/*"
                className="input-field"
                hidden
                onChange={handleFileChange}
              />
              <div class="upload-message">
                <div
                  className="heada"
                  onClick={() => document.querySelector(".input-field").click()}
                >
                  <AiFillPlusCircle
                    className="icon"
                    style={{
                      color: "#d9dce1",
                      position: "absolute",
                      left: "659px",
                      top: "210px",
                      fontSize: "55px",
                    }}
                  />
                  <p style={uploadMessageStyle}>Upload your documents</p>
                  <p style={uploadMessageStyl}>
                    in JPEG or PDF
                    <hr />
                  </p>
                </div>
                <div className="reponse-message">
                  <AiOutlinePaperClip
                    size={24}
                    style={{
                      position: "absolute",
                      color: "#034DA3",
                      left: "593px",
                      top: "380px",
                      fontSize: "55px",
                    }}
                  />
                  <span className="text-center">{fileName}</span>
                  <FontAwesomeIcon
                    icon={faClose}
                    onClick={handleFileClear}
                    className="icon"
                    style={{
                      width: "12px",
                      Height: "12px",
                      position: "absolute",
                      color: "#3c4257",
                      left: "754px",
                      top: "385px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="create">
              <button type="submit" name="submit">
                Create
              </button>
            </div>
            <div className="ferme">
              <button name="fermer">
                <FontAwesomeIcon icon={faClose} />
                Fermer
              </button>
            </div>
          </section>
        </div>
      </form>
    </main>
  );
}

export default Receipt;
