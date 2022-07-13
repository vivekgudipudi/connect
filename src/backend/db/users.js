import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Tanay Pratap",
    lastName: "tester",
    username: "tanaypratap123",
    password: "testing",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profileURL: 'https://github.com/tanaypratap',
    bio: 'Ex Microsoft | Ex Amazon',
    profileIMG : 'https://pbs.twimg.com/profile_images/1501178147420585987/5_2plEJW_400x400.jpg'
  },
  {
    _id: uuid(),
    firstName: "Vivek",
    lastName: "Gudipudi",
    username: "vivekgudipudi",
    password: "vivekgudipudi",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profileURL: 'https://github.com/vivek',
    bio: 'Ex Microsoft | Ex Udemy | SDE@Cred'
  },
];
