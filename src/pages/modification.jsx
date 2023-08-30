import React, { useState, useEffect, startTransition } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSearch,
  faCirclePlus,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlinePaperClip } from "react-icons/ai";
import {
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";
import Download from "../assets/images/download.png";
import Print from "../assets/images/print.png";
import imagev from "../assets/images/edit.png";
import "./modification.css";
function Modification() {
  const [randomValue, setRandomValue] = useState("");

  useEffect(() => {
    generateRandomValue();
  }, []);

  const generateRandomValue = () => {
    const random = Math.random().toString(36).substring(7);
    setRandomValue(random);
  };
  const options = [
    { value: "Succeded", label: "Succeded" },
    { value: "Failed", label: "Failed" },
  ];
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
  const { cardId } = useParams();
  const [tableData, setTableData] = useState([]);
  const [file, setFile] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [fileName, setFileName] = useState("No selected file");
  const handleCreate = () => {
    toggle();
  };

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
    const fileInput = document.querySelector(".input-file");
    if (fileInput) {
      fileInput.value = null;
    }
  };
  const handleFermerButtonClick = () => {
    setFile("");
    toggle();
  };
  const updateMassegeStyle = {
    color: "#034DA3",
    marginLeft: "55px",
    display: "block",
    fontSize: "15px",
  };
  const updateMassegeStyl = {
    color: "#5469D4",
    marginLeft: "55px",
    display: "block",
    fontSize: "14px",
  };
  const uploadMessageStyle = {
    color: "#034DA3",
    textAlign: "center",
    marginTop: "70px",
  };
  const uploadMessageStyl = {
    color: "#034DA3",
    textAlign: "center",
  };
  const montant = {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16,94px",
    font: "Inter",
  };
  const buttCheck = {
    width: "14px",
    height: "14px",
    border: "none",
    borderRadius: "4px",
    boxShadow:
      "0px 1px 1px 0px #0000001F, 0px 0px 0px 1px #3C425729, 0px 2px 5px 0px #3C425714",
  };
  const headr = {
    font: "Inter",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "16,94px",
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleDate1Change = (event) => {
    setDate1(event.target.value);
  };

  const handleDate2Change = (event) => {
    setDate2(event.target.value);
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  // Filter the tableData based on the search query, date1, date2, and status
  const filteredRows = tableData.filter((row) => {
    const isDateInRange =
      (!date1 || row.date >= date1) && (!date2 || row.date <= date2);

    const isStatusMatch =
      !selectedStatus || row.statut === selectedStatus.value;

    return (
      row.Number.toString().toLowerCase().includes(searchQuery.toLowerCase()) &&
      isDateInRange &&
      isStatusMatch
    );
  });
  const rowCount = tableData.length;
  const getStatutStyle = (status) => {
    if (status === "Failed") {
      return {
        background: "#ff0000",
        color: "#FFFFFF",
        padding: "8px, 4px,8px,4px",
        borderRadius: "4px",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "14,52px",
        font: "Inter",
      };
    } else if (status === "Succeded") {
      return {
        background: "#CBF4C9",
        color: "#0E6245",
        padding: "8px, 4px,8px,4px",
        borderRadius: "4px",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "14,52px",
        font: "Inter",
      };
    }
    return {};
  };
  const buttonContainerStyle = {
    display: "flex",
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
    marginLeft: "80%",
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
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredRows.slice(startIndex, endIndex);
  // Function to handle "Next" button click
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle "Previous" button click
  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await fetch(
          `https://api.staging.paymee.app/api/v2/panoramix/on-table/qrcodes/${cardId}/details`
        );
        const responseData = await response.json();

        // Assuming that responseData has the purchase history data
        if (responseData && responseData.tableData && responseData.tableData) {
          setTableData(responseData.tableData);
        }
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchPurchaseHistory();
  }, [cardId]);

  //date forma
  const formatDate = (dateString) => {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const navigate = useNavigate();
  return (
    <form>
      <div className="row">
        <div className="col-9">
          <h3
            style={{ marginLeft: "30px" }}
            onClick={() => {
              startTransition(() => {
                navigate("/");
              });
            }}
          >
            <span style={{ cursor: "pointer" }}>Caisse 1</span>
          </h3>
        </div>
        <div className="col-3 d-flex justify-content-end">
          <img src={Download} alt="Download" />
          <img
            src={Print}
            alt="Print"
            onClick={() => {
              window.print();
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6 align-items-center">
          <div className="amount1">
            <label>Amount</label>
            <InputGroup>
              <input
                type="number"
                name="prix"
                placeholder="0.000"
                className="amount1"
              />
              <InputGroupText className="custom-input-group-text">
                TND
              </InputGroupText>
            </InputGroup>
          </div>
          <div className="upload" style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={{
                color: "#d9dce1",
                position: "absolute",
                left: "255px",
                top: "35px",
                fontSize: "33px",
              }}
            />
            <div>
              <label>Receipt</label>

              <div
                className="receipt-input"
                onClick={toggle}
                onChange={handleFileChange}
              >
                <h8 style={updateMassegeStyle}>Upload your documents</h8>
                <h10 style={updateMassegeStyl}>in JPEG or PDF</h10>
              </div>
              <Modal
                isOpen={modal}
                toggle={toggle}
                size=".modal-sm"
                style={{ height: "421px", width: "337px" }}
              >
                <ModalBody>
                  <h2>Receipt</h2>
                  <h4>Receipt</h4>

                  <section>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="input-file"
                        hidden
                        onChange={handleFileChange}
                      />
                      <div class="upload-message">
                        <div
                          className="heada"
                          onClick={() =>
                            document.querySelector(".input-file").click()
                          }
                        >
                          <AiFillPlusCircle
                            className="icon"
                            style={{
                              color: "#d9dce1",
                              position: "absolute",
                              left: "140px",
                              top: "130px",
                              fontSize: "55px",
                            }}
                          />
                          <p style={uploadMessageStyle}>
                            Upload your documents
                          </p>
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
                              left: "75px",
                              fontSize: "55px",
                            }}
                          />
                          <span
                            className="text-center"
                            value={file}
                            onChange={(e) => setFile(e.target.value)}
                          >
                            {fileName}
                          </span>
                          <FontAwesomeIcon
                            icon={faClose}
                            onClick={handleFileClear}
                            className="icon"
                            style={{
                              width: "12px",
                              Height: "12px",
                              position: "absolute",
                              color: "#3c4257",
                              left: "240px",
                              top: "289px",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="testValider">
                        <button
                          type="submit"
                          name="submit"
                          onClick={handleCreate}
                        >
                          Valider
                        </button>
                      </div>
                      <div className="testFermer">
                        <button name="fermer" onClick={handleFermerButtonClick}>
                          <FontAwesomeIcon
                            icon={faClose}
                            style={{ marginRight: "9px" }}
                          />
                          Fermer
                        </button>
                      </div>
                    </div>
                  </section>
                </ModalBody>
              </Modal>
            </div>
          </div>
          <div className="valider">
            <button type="submit" name="submit">
              Valider
            </button>
          </div>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <QRCode
            value={randomValue}
            style={{
              width: "228px",
              height: "228px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          />
        </div>
      </div>
      <div className="input">
        <h2 style={{ marginLeft: "30px" }}>Transactions</h2>
        <div className="row">
          <div className="col-8" style={{ position: "relative" }}>
            <FontAwesomeIcon icon={faSearch} className="plus-icon" />
            <input
              type="search"
              placeholder="Search an invoice"
              className="input-field"
              style={{ marginLeft: "30px" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <input
              type="date"
              name="date-prix1"
              value={date1}
              onChange={handleDate1Change}
            />
            <input
              type="date"
              name="date-prix2"
              value={date2}
              onChange={handleDate2Change}
            />
          </div>
          <div className="col d-flex align-items-end flex-column">
            <Select
              options={options}
              className="select"
              placeholder="Show all"
              styles={customStyles}
              value={selectedStatus}
              onChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
      <div>
        <Table>
          <thead className="bordered header">
            <tr>
              <th
                style={{
                  borderLeft: "1px solid #dee2e6",
                  borderBottomLeftRadius: "7px",
                  borderTopLeftRadius: "7px",
                }}
              >
                <input type="checkbox" style={buttCheck} />{" "}
              </th>
              <th style={headr}>Number</th>
              <th style={headr}>Date</th>
              <th style={headr}>Montant</th>
              <th style={headr}>Montant net</th>
              <th style={headr}>Cout TTC</th>
              <th style={headr}>Note</th>
              <th style={headr}>Status</th>
              <th
                style={{
                  borderRight: "1px solid #dee2e6",
                  borderBottomRightRadius: "7px",
                  borderTopRightRadius: "7px",
                }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={row.id}>
                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    borderBottomLeftRadius: "7px",
                    borderTopLeftRadius: "7px",
                  }}
                >
                  <input type="checkbox" style={buttCheck} />
                </td>
                <td
                  style={{
                    fontWeight: "400",
                    fontSize: "13px",
                    lineHeight: "15,73px",
                    font: "Inter",
                  }}
                >
                  {row.id}
                </td>
                <td
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "16,94px",
                    font: "Inter",
                  }}
                >
                  {formatDate(row.date_added)}
                </td>
                <td style={montant}>{row.montant}</td>
                <td style={montant}>{row.montant_net}</td>
                <td style={montant}>{row.coutTTC}</td>
                <td
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "16,94px",
                    font: "Inter",
                  }}
                >
                  {row.label}
                </td>
                <td>
                  <span style={getStatutStyle(row.statut)}>
                    {row.statut}
                    {row.statut === "Succeded" ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: "#0E6245", marginLeft: "5px" }}
                      />
                    ) : (
                      row.statut === "Failed" && (
                        <FontAwesomeIcon
                          icon={faClose}
                          style={{ color: "white", marginLeft: "5px" }}
                        />
                      )
                    )}
                  </span>
                </td>
                <td
                  style={{
                    borderRight: "1px solid #dee2e6",
                    borderBottomRightRadius: "7px",
                    borderTopRightRadius: "7px",
                  }}
                >
                  <img
                    src={imagev}
                    alt=""
                    style={{ width: "16px", height: "16px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {filteredRows.length > rowsPerPage && (
          <div style={buttonContainerStyle}>
            <span style={{ marginLeft: "35px" }}>{rowCount} results</span>
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
              disabled={endIndex >= tableData.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default Modification;
