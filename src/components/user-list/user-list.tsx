import React, { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { getUsers } from "../../store/users/users-slice";
import { User } from "../user/user";
import { CreateUserModal } from "../user/create-user-modal/create-user-modal";
import { Button } from "react-bootstrap";
import "./user-list.scss";

export const UserList: FC = () => {
  const users = useAppSelector((state) => state.usersReducer.users);
  const dispatch = useAppDispatch();
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="user-list-container">
      <Button
        variant="primary add-user-button bounce"
        onClick={() => setCreateUserModalOpen(true)}
      >
        Add User
      </Button>

      {createUserModalOpen && (
        <CreateUserModal close={() => setCreateUserModalOpen(false)} />
      )}

      {users.length > 0 &&
        users.map((user) => (
          <User
            key={user.id}
            name={user.name}
            email={user.email}
            image={user.image}
            location={user.location}
            id={user.id}
          />
        ))}
    </div>
  );
};
