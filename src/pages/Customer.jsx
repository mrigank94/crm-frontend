import MaterialTable from "@material-table/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";
import { BASE_URL } from "../constants";

const Customer = () => {
  const [ticketList, setTicketList] = useState([]);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const closeCreateTicketModal = () => setShowCreateTicketModal(false);
  const [ticketCreationData, setTicketCreationData] = useState({});

  const [isAssignedTicketsLoading, setIsAssignedTicketsLoading] =
    useState(false);
  const [showEngineerModal, setShowEngineerModal] = useState(false);
  const [ticketDetail, setTicketDetail] = useState({});
  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      setIsAssignedTicketsLoading(true);
      const { data } = await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setTicketList(data);
    } catch (ex) {
      toast.error("Error occured while fetching the list of tickets.");
    } finally {
      setIsAssignedTicketsLoading(false);
    }
  };

  const handleTicketCreateFormChange = (event) => {
    console.log(event);
    setTicketCreationData({
      ...ticketCreationData,
      [event.target.name]: event.target.value,
    });
  };

  const updateTicketDetail = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        `${BASE_URL}/crm/api/v1/tickets/${ticketDetail.id}`,
        ticketDetail,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      setShowEngineerModal(false);
      toast.success("Successfully updated the ticket details.");
      setTicketList(
        ticketList.map((ticket) =>
          ticket.id === ticketDetail.id ? data : ticket
        )
      );
    } catch (ex) {
      toast.error("Error while updating the ticket details.");
    }
  };

  const handleRowClick = (event, rowData) => {
    setShowEngineerModal(true);
    setTicketDetail(rowData);
  };

  const changeTicketDetails = (event) => {
    setTicketDetail({
      ...ticketDetail,
      [event.target.name]: event.target.value,
    });
  };

  const createTicket = async (event) => {
    event.preventDefault();
    const data = {
      title: ticketCreationData.title,
      description: ticketCreationData.description,
    };

    try {
      await axios.post(`${BASE_URL}/crm/api/v1/tickets`, data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      toast.success("Created a new ticket!");
      setShowCreateTicketModal(false);
      setTicketCreationData({});
    } catch (ex) {
      toast.error("Error while creating a new ticket!");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchTickets();
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="row bg-light vh-100">
        <Sidebar />
        <div className="col my-4 ">
          <div className="container">
            <div>
              <h3 className="text-primary text-center">
                Welcome, {localStorage.getItem("name")}
              </h3>
              <p className="text-muted text-center">
                Take a quick look at your user stats below
              </p>

              <div className="row my-5 mx-2 text-center">
                <StatusCard
                  cardColor="warning"
                  cardText="Open"
                  cardValue={
                    ticketList.filter((ticket) => ticket.status === "OPEN")
                      .length
                  }
                />
                <StatusCard
                  cardColor="primary"
                  cardText="In progress"
                  cardValue={
                    ticketList.filter(
                      (ticket) => ticket.status === "IN_PROGRESS"
                    ).length
                  }
                />
                <StatusCard
                  cardColor="success"
                  cardText="Closed"
                  cardValue={
                    ticketList.filter((ticket) => ticket.status === "CLOSED")
                      .length
                  }
                />
                <StatusCard
                  cardColor="secondary"
                  cardText="Blocked"
                  cardValue={
                    ticketList.filter((ticket) => ticket.status === "BLOCKED")
                      .length
                  }
                />
              </div>
              <hr />
              {isAssignedTicketsLoading ? (
                <Loader />
              ) : (
                <MaterialTable
                  onRowClick={handleRowClick}
                  title="Tickets created by me"
                  data={ticketList}
                  actions={[
                    {
                      icon: () => <i class="bi bi-plus-circle"></i>,
                      tooltip: "Create a new ticket",
                      isFreeAction: true,
                      onClick: () => setShowCreateTicketModal(true),
                    },
                  ]}
                  columns={[
                    { title: "Ticket ID", field: "id" },
                    {
                      title: "Title",
                      field: "title",
                    },
                    {
                      title: "Description",
                      field: "description",
                    },
                    {
                      title: "Reporter",
                      field: "reporter",
                    },
                    {
                      title: "Priority",
                      field: "ticketPriority",
                    },
                    {
                      title: "Assignee",
                      field: "assignee",
                    },
                    {
                      title: "Status",
                      field: "status",
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showEngineerModal}
        onHide={() => setShowEngineerModal(false)}
        centered
        backdrop="static"
        keyboard
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket Details</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <form onSubmit={updateTicketDetail}>
            <div className="p-1">
              <h5 className="card-subtitle mb-2 text-primary lead">
                Ticket Id: {ticketDetail.id}
              </h5>
              <hr />
              <div className="input-group mb-3">
                <span className="input-group-text">Title</span>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={ticketDetail.title}
                  required
                  onChange={changeTicketDetails}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Assignee</span>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={ticketDetail.assignee}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Priority</span>
                <input
                  type="text"
                  className="form-control"
                  name="ticketPriority"
                  value={ticketDetail.ticketPriority}
                  onChange={changeTicketDetails}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Status</span>
                <select
                  name="status"
                  className="form-select"
                  value={ticketDetail.status}
                  onChange={changeTicketDetails}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            </div>
            <div className="md-form amber-textarea active-amber-textarea-2">
              <textarea
                name="description"
                rows="3"
                className="md-textarea form-control"
                value={ticketDetail.description}
                onChange={changeTicketDetails}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="secondary"
            onClick={() => setShowEngineerModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={updateTicketDetail}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
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
    </>
  );
};

export default Customer;
