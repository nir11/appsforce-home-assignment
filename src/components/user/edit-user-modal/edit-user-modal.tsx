import React, { FC } from "react";
import { User } from "../../../interfaces/user";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../../../hooks/store-hooks";
import { editUser } from "../../../store/users/users-slice";
import { UserForm } from "../user-form/user-form";

interface Props {
  user: User;
  close: () => void;
}

export const EditUserModal: FC<Props> = ({ user, close }) => {
  const dispatch = useAppDispatch();

  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Dialog style={{ width: "100%", margin: "0" }}>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UserForm
            initialUser={user}
            onSubmit={(editedUser: User) => {
              dispatch(editUser(editedUser));
              close();
            }}
            close={close}
          />
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};
