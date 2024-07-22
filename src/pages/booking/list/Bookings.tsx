import Table from "@components/table/Table";
import Layout from "@components/layout/Layout";
import { SearchConfigs, TableColumn } from "@components/table/Table.Types";
import { BookingModel } from "src/models/BookingsModel";
import BookingResources from "src/resources/BookingResources";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreStates } from "@redux/store";
import { format } from "date-fns";
import { Card, Form } from "react-bootstrap";

export default function Bookings() {
  const { bookings } = useSelector((state: StoreStates) => state.bookings);
  const navigate = useNavigate();
  const columns: TableColumn<BookingModel>[] = [
    { field: "room", title: "Room" },
    { field: "name", title: "Guest" },
    { field: "dateRange", title: "Date range", render: renderDateRange },
  ];

  function getData(configs: SearchConfigs) {
    return BookingResources.listBookings(configs, bookings);
  }

  function renderDateRange(item: BookingModel) {
    return `${format(item.accommodation.startDate, "MM/dd/yyyy")} to ${format(
      item.accommodation.endDate,
      "MM/dd/yyyy"
    )}`;
  }

  function handleClickOpen(item: BookingModel) {
    navigate(`/bookings/${item.id}`);
  }

  function renderSelectFilter(
    id: string,
    customFilter: any,
    setCustomFilter: (customFilter: any) => void
  ) {
    return (
      <div style={{ width: 200 }}>
        <Form.Group className="mb-3 ms-3">
          <Form.Select
            id={id}
            value={customFilter}
            onChange={(event) => setCustomFilter(event.target.value)}
          >
            <option value="">No filter</option>
            <option value="PREBOOKING">Pre-Booking</option>
            <option value="BOOKING">Booking</option>
            <option value="CHECKIN">Check in</option>
            <option value="CHECKOUT">Check out</option>
            <option value="CANCELED">Canceled</option>
          </Form.Select>
        </Form.Group>
      </div>
    );
  }

  return (
    <Layout>
      <Card className="mt-4 mb-4 p-3">
        <div className="mt-2 mb-2 d-flex justify-content-between">
          <h5>Bookings</h5>
          <Link id="button-new-booking" to="/bookings/new" className="btn btn-primary">
            New Booking
          </Link>
        </div>
        <Table
          columns={columns}
          onClick={handleClickOpen}
          id="bookings"
          onSearch={getData}
          renderSelectFilter={renderSelectFilter}
        />
      </Card>
    </Layout>
  );
}
