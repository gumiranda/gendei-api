import { idSchema } from "@/application/types/id";
import { webHookBody } from "../webhooks/paymentSchema";

const bodyAddTransactionJsonSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addTransactionResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addTransactionPostSchema = {
  schema: {
    body: bodyAddTransactionJsonSchema,
    response: { 200: addTransactionResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadTransactionSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const loadTransactionGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadTransactionSchema,
    response: {
      200: webHookBody,
    },
  },
};
const deleteTransactionResponse = { type: "boolean" };
const queryStringJsonDeleteTransactionSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteTransactionSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteTransactionSchema,
    response: {
      200: deleteTransactionResponse,
    },
  },
};
const queryStringJsonUpdateTransactionSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateTransactionResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateTransactionBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateTransactionSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateTransactionSchema,
    body: updateTransactionBody,
    response: {
      200: updateTransactionResponse,
    },
  },
};
const queryStringJsonLoadTransactionByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadTransactionByPageResponse = {
  type: "object",
  properties: {
    transactions: {
      type: "array",
      maxItems: 10,
      items: webHookBody,
    },
    total: { type: "integer" },
  },
};
export const loadTransactionByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadTransactionByPageSchema,
    response: {
      200: loadTransactionByPageResponse,
    },
  },
};
