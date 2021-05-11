import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ShareModal(props) {
  const url =
    window.location.protocol +
    "//" +
    window.location.host +
    "/" +
    props.encryption;
  const [copied, setCopied] = useState(props.copied);

  const handleCopyClick = () => {
    const el = document.createElement("textarea");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <i
            className="fas fa-share-square"
            style={{ marginRight: "10px" }}
          ></i>
          Share Nominations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {copied && (
          <div className="alert alert-success ms-2 mx-2 mt-2" role="alert">
            Link Copied!
          </div>
        )}
        <div className="input-group mb-3">
          <input type="url" className="form-control mx-2" value={url} />
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              type="button"
              style={{
                boxShadow: "none !important",
                outline: "0px !important",
              }}
              onClick={handleCopyClick}
            >
              Copy
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ShareModal;
