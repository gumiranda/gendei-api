import { idSchema } from "@/application/types/id";

const bodyAddRouteDriverJsonSchema = {
  type: "object",
  required: ["name", "status", "routeId", "points"],
  properties: {
    name: { type: "string" },
    routeId: idSchema,
    status: { type: "string" },
    points: {},
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addRouteDriverResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    routeId: idSchema,
    status: { type: "string" },
    points: {},
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addRouteDriverPostSchema = {
  schema: {
    body: bodyAddRouteDriverJsonSchema,
    response: { 200: addRouteDriverResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadRouteDriverSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadRouteDriverResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    routeId: idSchema,
    status: { type: "string" },
    points: {},
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadRouteDriverGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadRouteDriverSchema,
    response: {
      200: loadRouteDriverResponse,
    },
  },
};
const deleteRouteDriverResponse = { type: "boolean" };
const queryStringJsonDeleteRouteDriverSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteRouteDriverSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteRouteDriverSchema,
    response: {
      200: deleteRouteDriverResponse,
    },
  },
};
const queryStringJsonUpdateRouteDriverSchema = {
  type: "object",
  properties: {
    routeId: { type: "string" },
    _id: { type: "string" },
  },
  required: ["routeId", "_id"],
};

const updateRouteDriverBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    status: { type: "string" },
  },
};
export const updateRouteDriverSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateRouteDriverSchema,
    body: updateRouteDriverBody,
    // response: {
    //   200: updateRouteDriverResponse,
    // },
  },
};
const queryStringJsonLoadRouteDriverByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadRouteDriverByPageResponse = {
  type: "object",
  properties: {
    routeDrivers: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          name: { type: "string" },
          status: { type: "string" },
          routeId: idSchema,
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadRouteDriverByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadRouteDriverByPageSchema,
    response: {
      200: loadRouteDriverByPageResponse,
    },
  },
};
