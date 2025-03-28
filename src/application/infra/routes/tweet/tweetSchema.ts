import { idSchema } from "@/application/types/id";

const bodyAddTweetJsonSchema = {
  type: "object",
  required: ["userSlug", "body"],
  properties: {
    userSlug: { type: "string" },
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string", nullable: true },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addTweetResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string", nullable: true },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addTweetPostSchema = {
  schema: {
    body: bodyAddTweetJsonSchema,
    response: { 200: addTweetResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadTweetSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadTweetResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string", nullable: true },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    retweets: { type: "number", nullable: true },
    createdBy: {
      type: "object",
      properties: {
        _id: { type: "string" },
        slug: { type: "string" },
        photoId: {},
        name: { type: "string" },
      },
    },
    tweetlike: {},
    tweet: {
      type: "object",
      properties: {
        createdById: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        userSlug: { type: "string" },
        body: { type: "string" },
        image: { type: "string" },
      },
    },
    users: {
      type: "object",
      properties: {
        _id: { type: "string" },
        slug: { type: "string" },
        photoId: {},
        name: { type: "string" },
      },
    },
  },
};
export const loadTweetGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadTweetSchema,
    response: {
      200: loadTweetResponse,
    },
  },
};
const deleteTweetResponse = { type: "boolean" };
const queryStringJsonDeleteTweetSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteTweetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteTweetSchema,
    response: {
      200: deleteTweetResponse,
    },
  },
};
const queryStringJsonUpdateTweetSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateTweetResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string", nullable: true },
    createdById: { type: "string" },
  },
};
const updateTweetBody = {
  type: "object",
  properties: {
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string", nullable: true },
  },
};
export const updateTweetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateTweetSchema,
    body: updateTweetBody,
    response: {
      200: updateTweetResponse,
    },
  },
};
const queryStringJsonLoadTweetByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
    tweetId: { type: "string", nullable: true },
  },
  required: ["page"],
};
const loadTweetByPageResponse = {
  type: "object",
  properties: {
    tweets: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          userSlug: { type: "string" },
          body: { type: "string" },
          image: {},
          tweetId: { type: "string", nullable: true },
          createdById: { type: "string" },
          createdAt: { type: "string" },
          retweets: { type: "number", nullable: true },
          createdBy: {
            type: "object",
            properties: {
              _id: { type: "string" },
              slug: { type: "string" },
              photoId: {},
              photo: {},
              name: { type: "string" },
            },
          },
          tweetlike: {},
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadTweetByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadTweetByPageSchema,
    response: {
      200: loadTweetByPageResponse,
    },
  },
};
