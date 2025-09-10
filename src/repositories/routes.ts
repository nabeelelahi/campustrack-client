import { ApiRoute, RequestMethod } from "../types";

const requestMethods: { [key: string]: RequestMethod } = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
Object.freeze(requestMethods);

export const imageUploadRoute: ApiRoute = {
  url: "/general/file-upload",
  method: requestMethods.POST,
  auth: true,
};

export const artistRoute: ApiRoute = {
  url: "/user",
  method: requestMethods.GET,
  auth: true,
};

export const loginRoute: ApiRoute = {
  url: "/user/login",
  method: requestMethods.POST,
  auth: false,
};

export const serviceRoute: ApiRoute = {
  url: "/service",
  method: requestMethods.GET,
  auth: true,
};

export const artistUpdate: ApiRoute = {
  url: "/user",
  method: requestMethods.PATCH,
  auth: true,
};

export const createCategory: ApiRoute = {
  url: "/category",
  method: requestMethods.POST,
  auth: true,
};

export const updateCategory: ApiRoute = {
  url: "/category",
  method: requestMethods.PATCH,
  auth: true,
};

export const deleteCategory: ApiRoute = {
  url: "/category",
  method: requestMethods.DELETE,
  auth: true,
};

export const getCategory: ApiRoute = {
  url: "/category",
  method: requestMethods.GET,
  auth: true,
};

export const getsubCategory: ApiRoute = {
  url: "/sub-category",
  method: requestMethods.GET,
  auth: true,
};

export const createSubCategory: ApiRoute = {
  url: "/sub-category",
  method: requestMethods.POST,
  auth: true,
};

export const updateSubCategory: ApiRoute = {
  url: "/sub-category",
  method: requestMethods.PATCH,
  auth: true,
};

export const deleteSubCategory: ApiRoute = {
  url: "/sub-category",
  method: requestMethods.DELETE,
  auth: true,
};
