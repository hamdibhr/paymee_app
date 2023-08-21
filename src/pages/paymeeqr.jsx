import React, { startTransition, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  Card,
  Button,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import image from "../assets/images/image.png";
import imagev from "../assets/images/edit.png";
import "./paymeeqr.css";
function Paymeeqr() {
  const navigate = useNavigate();
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleButtonClick = (index) => {
    setQrCodes((prevEmployees) => {
      const updatedEmployees = [...prevEmployees];
      updatedEmployees[index].status = "Payee"; // Update the status of the clicked employee
      return updatedEmployees;
    });
  };
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const options = [{ value: "nothing", label: "nothing" }];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#C2C7CF",
      minHeight: "30px",
      height: "30px",
      boxShadow: state.isFocused ? null : null,
      marginTop: 3,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };
  const handleFermerButtonClick = () => {
    setNote("");
    setAmount("");
    toggle();
  };
  const buttonA = {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16,94px",
    font: "Inter",
  };
  const buttonContainerStyle = {
    display: "flex",
    marginTop: "10px",
  };
  const previousButton = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "74px",
    height: "30px",
    borderRadius: "4px",
    padding: "6px 8px",
    gap: "8px",
    opacity: "50%",
    marginLeft: "70%",
    boxShadow:
      "0px 2px 5px 0px rgba(60, 66, 87, 0.08), 0px 0px 1px 0px #3C425712, 0px 1px 1px 0px rgba(0, 0, 0, 0.12)",
    border: "1px solid #ccc",
    background: "#FFFFFF",
    color: "#3C4257",
    font: "Inter",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16.94px",
  };
  const nextButton = {
    width: "48px",
    marginRight: "40px",
    marginLeft: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    background: "#FFFFFF",
    padding: "6px 8px",
    gap: "8px",
    boxShadow:
      "0px 2px 5px 0px rgba(60, 66, 87, 0.08), 0px 0px 1px 0px #3C425712, 0px 1px 1px 0px rgba(0, 0, 0, 0.12)",
    font: "Inter",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16.94px",
    color: "#3C4257",
  };
  const rowCount = qrCodes.length;
  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = qrCodes.slice(startIndex, endIndex);
  // Function to handle "Next" button click
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle "Previous" button click
  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  // POST Create new qrcode-on-table
  const handleCreateButtonClick = () => {
    const data = {
      note: note,
      amount: parseFloat(amount),
    };
    const token = "ee767c938b21da26f9990d11bb2df8c00c88d83d";
    fetch(
      "https://api.staging.paymee.app/api/v2/panoramix/on-table/qrcodes/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const accessToken = "ee767c938b21da26f9990d11bb2df8c00c88d83d";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.staging.paymee.app/api/v2/panoramix/on-table/qrcodes",
          {
            headers: {
              Authorization: `Token ${accessToken}`,
            },
          }
        );

        setQrCodes(response.data.qrcodes);
        setLoading(false);
      } catch (error) {
        setError(
          error.response ? error.response.data.detail : "Unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <form>
      <div className="top">
        <h5>QR Codes on delivery</h5>
        <button
          className="btn btn-primary qrcode"
          data-toggle="modal"
          type="button"
          onClick={toggle}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
          Create QR code
        </button>
        <Modal isOpen={modal} toggle={toggle} size="sm">
          <ModalBody>
            <div className="topp">
              <h3>Create new QR code</h3>
            </div>
            <div className="note">
              <label>Note</label>
              <input
                type="text"
                name="qrcode1"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="amount">
              <label>Amount</label>
              <InputGroup>
                <input
                  type="number"
                  name="prix"
                  placeholder="0.000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <InputGroupText>TND</InputGroupText>
              </InputGroup>
            </div>
            <div className="create ">
              <button
                type="submit"
                name="submit"
                style={buttonA}
                onClick={handleCreateButtonClick}
              >
                Create
              </button>
            </div>
            <div className="ferme">
              <button
                name="fermer"
                onClick={handleFermerButtonClick}
                style={buttonA}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  style={{ marginRight: "6px" }}
                />
                Fermer
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
      <div className="input">
        <div className="row">
          <div className="col-5">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search an invoice"
              className="input-field"
            />
          </div>
          <div>
            <input type="date" id="date1" name="date1" />
            <input type="date" id="date2" name="date2" />
          </div>

          <div className="col d-flex align-items-end flex-column">
            <Select
              id="mySelect"
              options={options}
              className="select"
              placeholder="Show all"
              styles={customStyles}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {currentData.map((qrCode, index) => (
          <div key={qrCode.id}>
            <Card>
              <div className="d-flex align-items-end flex-column card-height">
                <CardImg
                  src={imagev}
                  className="vector"
                  onClick={() => {
                    startTransition(() => {
                      navigate(`/modification/${qrCode.id}`);
                    });
                  }}
                  style={{
                    maxWidth: "20px",
                    maxHeight: "20px",
                    marginTop: "7px",
                    marginRight: "7px",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="text-center">
                <CardImg src={image} className="img" />
              </div>
              <CardBody>
                <CardTitle className="title">Table N°{qrCode.id}</CardTitle>
                <CardText className="text" tag="h6">
                  Montant: {qrCode.amount} DT
                </CardText>
                <div className="text-center">
                  <Button
                    style={buttonA}
                    className={`button ${
                      qrCode.status === "Payee" ? "green" : "default"
                    }`}
                    onClick={() => handleButtonClick(index)}
                  >
                    {qrCode.status === "Payee" ? "Payée" : "En attente"}
                  </Button>{" "}
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      {qrCodes.length > rowsPerPage && (
        <div style={buttonContainerStyle} className="row">
          <span style={{ marginLeft: "180px" }}>{rowCount} results</span>
          <button
            style={previousButton}
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            style={nextButton}
            onClick={handleNextClick}
            disabled={endIndex >= qrCodes.length}
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
}

export default Paymeeqr;
