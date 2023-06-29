import axios from "axios";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import { BASE_URL } from "../constants";

const Customer = () => {
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const closeCreateTicketModal = () => setShowCreateTicketModal(false);
  const [ticketCreationData, setTicketCreationData] = useState({});

  const handleTicketCreateFormChange = (event) => {
    console.log(event);
    setTicketCreationData({
      ...ticketCreationData,
      [event.target.name]: event.target.value,
    });
  };

  const createTicket = async (event) => {
    event.preventDefault();
    const data = {
      title: ticketCreationData.title,
      description: ticketCreationData.description,
    };

    await axios.post(`${BASE_URL}/crm/api/v1/tickets`, data, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
  };
  
  return (
    <div className="row bg-light vh-100">
      <Sidebar />
      <div className="col my-4 ">
        <div className="container">
          <Button
            variant="primary"
            onClick={() => setShowCreateTicketModal(true)}
          >
            Create ticket
          </Button>
          <Modal
            show={showCreateTicketModal}
            onHide={closeCreateTicketModal}
            centered
            backdrop="static"
            keyboard
          >
            <ModalHeader closeButton>
              <ModalTitle>Create Ticket</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={createTicket}>
                <div className="p-1">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Title"
                      value={ticketCreationData.title}
                      onChange={handleTicketCreateFormChange}
                      required
                    />
                  </div>
                </div>
                <div className="p-1">
                  <div className="input-group">
                    <textarea
                      type="text"
                      className="form-control md-textarea"
                      rows={3}
                      name="description"
                      placeholder="Description"
                      value={ticketCreationData.description}
                      onChange={handleTicketCreateFormChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="secondary"
                onClick={() => setShowCreateTicketModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={createTicket}>
                Create
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Customer;
