import { idSchema } from "@/application/types/id";

const bodyAddCategoryJsonSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
    active: { type: "boolean" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addCategoryResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addCategoryPostSchema = {
  schema: {
    body: bodyAddCategoryJsonSchema,
    response: { 200: addCategoryResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadCategorySchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadCategoryResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadCategoryGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadCategorySchema,
    response: {
      200: loadCategoryResponse,
    },
  },
};
const deleteCategoryResponse = { type: "boolean" };
const queryStringJsonDeleteCategorySchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteCategorySchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteCategorySchema,
    response: {
      200: deleteCategoryResponse,
    },
  },
};
const queryStringJsonUpdateCategorySchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateCategoryResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
  },
};
const updateCategoryBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    active: { type: "boolean" },
  },
};
export const updateCategorySchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateCategorySchema,
    body: updateCategoryBody,
    response: {
      200: updateCategoryResponse,
    },
  },
};
const queryStringJsonLoadCategoryByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadCategoryByPageResponse = {
  type: "object",
  properties: {
    categorys: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          name: { type: "string" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadCategoryByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadCategoryByPageSchema,
    response: {
      200: loadCategoryByPageResponse,
    },
  },
};
