import React, { FC, useState } from "react";
import { User } from "../../../interfaces/user";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../../../hooks/store-hooks";
import { createUser } from "../../../store/users/users-slice";
import { UserForm } from "../user-form/user-form";

interface Props {
  close: () => void;
}

export const CreateUserModal: FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({
    id: "",
    name: {
      title: "",
      firstName: "",
      lastName: "",
    },
    email: "",
    image: "",
    location: {
      country: "",
      city: "",
      street: "",
    },
  });
  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Dialog style={{ width: "100%", margin: "0" }}>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UserForm
            initialUser={user}
            onSubmit={(newUser: User) => {
              dispatch(createUser(newUser));
              close();
            }}
            close={close}
          />
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};
