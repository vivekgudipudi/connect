import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "In India, everyone is a self taught developer.Fact. Not kidding. The education part of college failed all of us.",
    likes: {
      likeCount: 46,
      likedBy: [],
      dislikedBy: [],
    },
    username: "tanaypratap123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "vivekgudipudi",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content: "If you can’t smell your wifi, how do you know it’s real?",
    likes: {
      likeCount: 27,
      likedBy: [],
      dislikedBy: [],
    },
    username: "vivekgudipudi",

    comments: [
      {
        _id: uuid(),
        username: "vijayashree",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "tanaypratap123",
        text: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "For improved quality of sleep, raise head of your bed by about 3” or 5cm and don’t eat 3 hours before bedtime",
    likes: {
      likeCount: 17,
      likedBy: [],
      dislikedBy: [],
    },
    username: "vijayashree",

    comments: [
      {
        _id: uuid(),
        username: "vivekgudipudi",
        text: "hahahha",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Tesla is to protect life on Earth,SpaceX to extend life beyond.",
    likes: {
      likeCount: 9,
      likedBy: [],
      dislikedBy: [],
    },
    username: "theElon",

    comments: [
      {
        _id: uuid(),
        username: "vivekgudipudi",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "satyaNadella",
        text: "okay!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      " Whatever your politics is, we cannot ignore the past three hundred years of economic research and understanding. People argue they are on the side of “science.” Let’s use the education we all have. Please.",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    username: "jeffBezooooo",

    comments: [
      {
        _id: uuid(),
        username: "vivekgudipudi",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "satyaNadella",
        text: "okay!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "I’m looking forward to Inspire next week, where we’ll share how we’re creating new opportunity for partners to help customers do more with less across the Microsoft Cloud. Please join us.",
    likes: {
      likeCount: 11,
      likedBy: [],
      dislikedBy: [],
    },
    username: "satyaNadella",

    comments: [
      {
        _id: uuid(),
        username: "vivekgudipudi",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
