import React, { FC } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../../../hooks/store-hooks";
import { deleteUser } from "../../../store/users/users-slice";
import { toast } from "react-toastify";

interface Props {
  id: string;
  name: string;
  close: () => void;
}

export const DeleteUserModal: FC<Props> = ({ id, name, close }) => {
  const dispatch = useAppDispatch();

  const remove = (): void => {
    dispatch(deleteUser(id));
    toast("User deleted!");
  };

  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ minHeight: "200px" }}
    >
      <Modal.Dialog style={{ width: "100%", margin: "0" }}>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you want to delete `
            <span style={{ fontStyle: "italic" }}>{name}</span>`?
          </p>
        </Modal.Body>

        <Modal.Footer style={{ margin: "auto" }}>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={remove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};
