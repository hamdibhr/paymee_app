import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, InputGroupText } from "reactstrap";
import "./paymee.css";
function paymee_app() {
  return (
    <div className="qrcode">
      <div>
        <h2>Create new QR code</h2>
      </div>
      <div className="note">
        <label>Note</label>
        <input type="text" name="qrcode1" />
      </div>
      <div className="amount">
        <label>Amount</label>
        <InputGroup>
          <input type="number" name="prix" placeholder="0.000" />
          <InputGroupText>TND</InputGroupText>
        </InputGroup>
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
    </div>
  );
}

export default paymee_app;
