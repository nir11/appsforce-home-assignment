import React, { FC, useState } from "react";
import { User } from "../../../interfaces/user";
import { Button } from "react-bootstrap";
import "./user-form.scss";
import { useAppSelector } from "../../../hooks/store-hooks";

interface Props {
  initialUser?: User;
  onSubmit: (user: User) => void;
  close: () => void;
}

export const UserForm: FC<Props> = ({ initialUser, onSubmit, close }) => {
  const users = useAppSelector((state) => state.usersReducer.users);
  const [error, setError] = useState({
    show: false,
    text: "",
  });
  const [user, setUser] = useState<User>({
    id: initialUser?.id || "",
    name: {
      title: initialUser?.name.title || "",
      firstName: initialUser?.name.firstName || "",
      lastName: initialUser?.name.lastName || "",
    },
    email: initialUser?.email || "",
    image: initialUser?.image || "",
    location: {
      country: initialUser?.location.country || "",
      city: initialUser?.location.city || "",
      street: initialUser?.location.street || "",
    },
  });

  const handleChange = (name: string, value: any): void => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(user);
  };

  const validate = (): boolean => {
    // check if title exists
    if (user.name.title.replace(/\s/g, "").length === 0) {
      setError({
        show: true,
        text: "Title is missing",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    // check if first name exists
    if (user.name.firstName.replace(/\s/g, "").length === 0) {
      setError({
        show: true,
        text: "First Name is missing",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    // check if first name with a minimum of 3 characters
    if (user.name.firstName.replace(/\s/g, "").length <= 3) {
      setError({
        show: true,
        text: "First Name must contain at least 3 characters",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    // check if last name exists
    if (user.name.lastName.replace(/\s/g, "").length === 0) {
      setError({
        show: true,
        text: "Last Name is missing",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    // check if email is valid
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      user.email.replace(/\s/g, "").length === 0 ||
      !re.test(String(user.email.replace(/\s/g, "")).toLowerCase())
    ) {
      setError({
        show: true,
        text: "Invalid email",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    // check if email already exists
    if (
      users.filter((u) => u.email === user.email.replace(/\s/g, "")).length >
        0 &&
      user.email.replace(/\s/g, "") !== initialUser?.email
    ) {
      setError({
        show: true,
        text: "Email already exists",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    // check if country exists
    if (user.location.country.replace(/\s/g, "").length === 0) {
      setError({
        show: true,
        text: "Country is missing",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    // check if city exists
    if (user.location.city.replace(/\s/g, "").length === 0) {
      setError({
        show: true,
        text: "City is missing",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    // check if street exists
    if (user.location.street.replace(/\s/g, "").length === 0) {
      setError({
        show: true,
        text: "Street is missing",
      });
      setTimeout(() => {
        setError({
          show: false,
          text: "",
        });
      }, 2000);
      return false;
    }

    return true;
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="info-wrapper ">
            <div className="input-and-label-container">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={user.name.title}
                onChange={(e) =>
                  handleChange("name", {
                    ...user?.name,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="info-wrapper ">
            <div className="input-and-label-container">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.name.firstName}
                onChange={(e) =>
                  handleChange("name", {
                    ...user?.name,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="info-wrapper ">
            <div className="input-and-label-container">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user?.name.lastName}
                onChange={(e) =>
                  handleChange("name", {
                    ...user?.name,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="info-wrapper ">
            <div className="input-and-label-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required={false}
                value={user?.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="info-wrapper ">
            <div className="input-and-label-container">
              <label>Country </label>
              <input
                type="text"
                name="country"
                value={user?.location.country}
                onChange={(e) =>
                  handleChange("location", {
                    ...user?.location,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="info-wrapper ">
            <div className="input-and-label-container">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={user?.location.city}
                onChange={(e) =>
                  handleChange("location", {
                    ...user?.location,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="info-wrapper ">
            <div className="input-and-label-container">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={user?.location.street}
                onChange={(e) =>
                  handleChange("location", {
                    ...user?.location,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="info-wrapper "></div>
        </div>

        <br />

        <div className="bottom-buttons-container">
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
        <p className="error">{error.text}</p>
      </form>
    </div>
  );
};
