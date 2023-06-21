import MaterialTable from "@material-table/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, ModalBody, ModalFooter } from "react-bootstrap";

import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";
import { BASE_URL } from "../constants";

const Engineer = () => {
  const [userList, setUserList] = useState([]);
  const [isAssignedTicketsLoading, setIsAssignedTicketsLoading] =
    useState(false);
  const [showEngineerModal, setShowEngineerModal] = useState(false);
  const [ticketDetail, setTicketDetail] = useState({});

  const fetchTickets = async () => {
    try {
    } catch (ex) {
    } finally {
    }
  };

  const updateTicketDetail = async (event) => {
    event.preventDefault();
    try {
    } catch (ex) {}
  };

  const handleRowClick = (event, rowData) => {
    setShowEngineerModal(true);
  };

  const changeTicketDetails = (event) => {};

  useEffect(() => {
    fetchTickets();
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
                Take a quick look at your engineer stats below
              </p>

              <div className="row my-5 mx-2 text-center">
                <StatusCard cardColor="warning" cardText="Open" cardValue={8} />
                <StatusCard
                  cardColor="primary"
                  cardText="In progress"
                  cardValue={5}
                />
                <StatusCard
                  cardColor="success"
                  cardText="Closed"
                  cardValue={12}
                />
                <StatusCard
                  cardColor="secondary"
                  cardText="Blocked"
                  cardValue={3}
                />
              </div>
              <hr />
              <MaterialTable
                onRowClick={handleRowClick}
                title="Tickets assigned to me + Unassigned tickets"
                data={[
                  {
                    id: 123,
                    title: "App is not working",
                    description: "App fails to load",
                    reporter: "sumit123",
                    ticketPriority: "high",
                    assignee: "engineer",
                    status: "Pending",
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
        <ModalBody></ModalBody>
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
    </>
  );
};

export default Engineer;
