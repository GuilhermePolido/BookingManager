import { ReactNode } from "react";

export type TableColumn<T> = {
  title?: string;
  field: string;
  render?: (item: T) => ReactNode;
};

export type PaginatedResponse<T> = {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
};

export type SearchConfigs = {
  page: number;
  pageSize: number;
  search: string;
  customFilter?: any;
};

export type TableData = { [key: string]: string | number };

export type TableProps<T> = {
  id: string;
  onClick: (item: T) => void;
  columns: TableColumn<T>[];
  pageSize?: number;
  onSearch: (configs: SearchConfigs) => Promise<PaginatedResponse<T>>;
  renderSelectFilter?: (id:string, customFilter: any, setCustomFilter: (customFilter: any) => void) => ReactNode;
};

export type TablePagination = {
  count: number;
  page: number;
};
