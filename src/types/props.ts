import { Dispatch, SetStateAction } from "react";
import { RouteTypes } from "./general";
import { ApiRoute, ResponseData } from "./request";

export type TextComponentProps = {
  text: string;
  className?: string;
};

export interface LinkProps {
  path: string;
  title?: string;
  text?: string;
  subHeading: string;
}

export type ButtonComponentProps = {
  text: string;
  onClick?: () => void;
  htmlType?: "submit" | "reset" | "button";
  loading?: boolean;
};

export type AuthRouteProps = {
  type?: RouteTypes;
  children?: React.ReactNode;
};

export type AddBankModalProps = {
  isOpen: boolean;
  setIsOpen: any;
  cbSuccess: (response: { data: never }) => void;
};

export type AddModalProps = {
  open: "post" | "patch" | "none";
  cbCancel: () => void;
  cbSuccess: (response: ResponseData<unknown>) => void;
  updateData: { [key: string]: never };
};

export type PageProps<T> = {
  columns: any;
  data: any;
  title: string;
  onNewClick: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onRefreshClick?: () => void;
  input: any;
  scroll: number;
  loading: boolean;
  deleteApi: ApiRoute;
  setData?: Dispatch<SetStateAction<T | []>>;
};

// export type ResponseData<T> = {
//   data: T;
//   message: string;
//   statusCode: number;
//   pagination?: {
//     count: number;
//     currentPage: number;
//     pageCount: number;
//     perPage: number;
//   };
// };

export type QuestionAnswerDto = {
  _id: string;
  title: string;
  description: string;
  parent: string | null;
  user: { [key: string]: string };
};
