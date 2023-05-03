import React, { FC, useState, useMemo } from "react";
import { User as UserData } from "../../interfaces/user";
import { DeleteUserModal } from "./delete-user-modal/delete-user-modal";
import { EditUserModal } from "./edit-user-modal/edit-user-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./user.scss";

export const User: FC<UserData> = (user) => {
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const fullname = useMemo(() => {
    return `${user.name.title} ${user.name.firstName} ${user.name.lastName}`;
  }, [user.name]);

  return (
    <>
      {deleteUserModalOpen && (
        <DeleteUserModal
          id={user.id}
          name={fullname}
          close={() => setDeleteUserModalOpen(false)}
        />
      )}

      {editUserModalOpen && (
        <EditUserModal user={user} close={() => setEditUserModalOpen(false)} />
      )}

      <div className="user-container col-sm-12 col-md-8">
        <div className="header flex">
          <img className="user-image" src={user.image} />
          <div className="user-name flex">
            <h2>{fullname}</h2>
          </div>
          <p>{user.email}</p>
          <p>{user.location.country}</p>
          <p className="italic">
            {user.location.city}, {user.location.street}
          </p>
        </div>
        <hr />
        <div className="footer flex">
          <div className="edit-and-remove-icons flex">
            <div>
              <span onClick={() => setEditUserModalOpen(true)}>Edit</span>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="icon mx-2"
                onClick={() => setEditUserModalOpen(true)}
              />
            </div>
            <div>
              <span onClick={() => setDeleteUserModalOpen(true)}>Delete</span>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="icon mx-2"
                onClick={() => setDeleteUserModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
