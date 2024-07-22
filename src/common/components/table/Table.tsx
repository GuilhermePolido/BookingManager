import {
  Table as BsTable,
  InputGroup,
  Pagination,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

import { TableProps } from "./Table.Types";
import { useEffect, useMemo, useState } from "react";
import { FaListUl } from "react-icons/fa";

const DEFAULT_PAGE_SIZE = 10;

export default function Table<T extends object>({
  id,
  columns,
  onClick,
  pageSize = DEFAULT_PAGE_SIZE,
  onSearch,
  renderSelectFilter,
}: TableProps<T>) {
  const [totalItems, setTotalItems] = useState(1);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<T[]>([]);
  const [customFilter, setCustomFilter] = useState<any>(null);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

  const paginationItems = useMemo(() => {
    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(totalPages, page + 1);

    if (page === 1) {
      endPage = Math.min(totalPages, 3);
    }

    if (page === totalPages) {
      startPage = Math.max(1, totalPages - 2);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item
          key={`table-${id}-pagination-${i}`}
          active={i === page}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  }, [page, totalPages]);

  useEffect(() => {
    if (initialized) {
      getData();
    }
  }, [page, pageSize, customFilter]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setLoading(true);
    onSearch?.({
      page,
      pageSize,
      search,
      customFilter,
    }).then(({ data, count }) => {
      setData(data);
      setTotalItems(count);
      setLoading(false);

      if (!initialized) {
        setInitialized(true);
      }
    });
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  function handleFirst() {
    setPage(1);
  }

  function handleLast() {
    setPage(totalPages);
  }

  function handlePrev() {
    setPage(Math.max(1, page - 1));
  }

  function handleNext() {
    setPage(Math.min(totalPages, page + 1));
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      getData();
    }
  }

  function renderTable() {
    if (loading) {
      return (
        <div
          id={`loading-table-${id}`}
          className="d-flex justify-content-center align-items-center flex-grow-1"
        >
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div
          id={`empty-table-${id}`}
          className="d-flex justify-content-center align-items-center flex-grow-1 flex-column"
        >
          <div>
            <FaListUl className="text-secondary" size={30} />
          </div>
          <div>
            <small className="text-secondary">Oops, we didn't find data</small>
          </div>
        </div>
      );
    }

    return (
      <>
        <BsTable
          id={`table-${id}`}
          striped
          hover
          className="table-hover-clickable"
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.field}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index) => (
              <tr
                key={`row-table-${id}-${index}`}
                className="cursor-pointer"
                onClick={() => onClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={`row-data-${id}-${column.field}-${index}`}>
                    {column.render?.(item) ?? item[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </BsTable>
        <div className="d-flex justify-content-between flex-grow-1 align-items-end">
          <div className="d-none d-sm-block">
            <small id="showing-table" className="text-secondary">
              Showing from {(page - 1) * pageSize + 1} to {page * pageSize} of{" "}
              {totalItems}
            </small>
          </div>
          <div className="d-flex justify-content-end flex-grow-1">
            <Pagination id={`pagination-table-${id}`}>
              <Pagination.First onClick={handleFirst} />
              <Pagination.Prev onClick={handlePrev} />
              {paginationItems}
              <Pagination.Next onClick={handleNext} />
              <Pagination.Last onClick={handleLast} />
            </Pagination>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="d-flex flex-grow-1 flex-column">
      <div className="d-flex">
        <InputGroup className="mb-3">
          <Form.Control
            id={`search-table-${id}`}
            placeholder="Type to search"
            value={search}
            onChange={(event: any) => setSearch(event.target.value)}
            onKeyUp={handleKeyUp}
            name="search-table"
          />
          <Button
            variant="outline-primary"
            id={`button-search-table-${id}`}
            onClick={getData}
          >
            Search
          </Button>
        </InputGroup>
        {renderSelectFilter?.(
          `custom-filter-table-${id}`,
          customFilter,
          setCustomFilter
        )}
      </div>
      {renderTable()}
    </div>
  );
}
