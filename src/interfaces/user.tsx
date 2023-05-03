export type UserName = {
  title: string;
  firstName: string;
  lastName: string;
};

export type UserLocation = {
  country: string;
  city: string;
  street: string;
};

export interface User {
  id: string;
  name: UserName;
  email: string;
  image: string;
  location: UserLocation;
}
