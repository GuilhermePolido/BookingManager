import Layout from "src/common/components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { Controller, FieldError, useForm } from "react-hook-form";
import { BookingModel } from "src/models/BookingsModel";
import { differenceInDays } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Calendar from "@components/calendar/Calendar";
import { mockRooms, mockTypeRoom, Room } from "src/mock/MockRoom";
import { bookingsSlice } from "@redux/slices/bookingSlice";
import BookingResources from "src/resources/BookingResources";
import { StoreStates } from "@redux/store";
import { getFreeRooms } from "src/common/utils/RoomsUtils";
import { toEntity, toStore } from "@redux/slices/bookingSliceUtils";

export default function BookingForm() {
  const navigate = useNavigate();
  const { id: idURl } = useParams();
  const isEditing = idURl != null;

  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const { bookings: bookingsStore } = useSelector((state: StoreStates) => state.bookings);
  const bookings = bookingsStore.map(toEntity);
  const { createNewBooking, updateBooking, deleteBooking } =
    bookingsSlice.actions;

  const {
    control,
    register,
    setValue,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm<BookingModel>();

  const room = watch("room");
  const typeRoom = watch("typeRoom");
  const accommodation = watch("accommodation");

  const optionsTypeRoom = useMemo(() => {
    return Object.values(mockTypeRoom).map((item) => (
      <option key={`option-type-room-${item.id}`} value={item.id}>{`${
        item.name
      } - ${
        item.capacity > 1 ? `${item.capacity} Adults` : `${item.capacity} Adult`
      }`}</option>
    ));
  }, []);

  const optionsRoom = useMemo(() => {
    if (typeRoom == null) {
      return [];
    }

    let filtered: Room[] = mockRooms.filter(
      (room: Room) => room.roomType === typeRoom
    );

    let filteredBookings = bookings;

    if (isEditing) {
      filteredBookings = bookings.filter((booking) => booking.id !== idURl);
    }

    filtered = getFreeRooms(
      filteredBookings,
      accommodation.startDate,
      accommodation.endDate,
      filtered
    );

    return filtered.map((item: Room) => (
      <option
        key={`option-room-${item.roomNumber}`}
        value={item.roomNumber}
      >{`Room ${item.roomNumber} - Floor ${item.floor}`}</option>
    ));
  }, [typeRoom, accommodation]);

  useEffect(() => {
    if (isEditing) {
      BookingResources.getBookings(idURl, bookings).then((response) => {
        if (response.data != null) {
          setValue("id", response.data.id);
          setValue("name", response.data.name);
          setValue("phone", response.data.phone);
          setValue("status", response.data.status);
          setValue("typeRoom", response.data.typeRoom);
          setValue("room", response.data.room);
          setValue("email", response.data.email);
          setValue("documentNumber", response.data.documentNumber);
          setValue("accommodation", {
            ...response.data.accommodation,
            startDate: new Date(response.data.accommodation.startDate),
            endDate: new Date(response.data.accommodation.endDate),
          });
        }

        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [isEditing]);

  function handleDelete() {
    if (idURl != null) {
      dispatch(deleteBooking(idURl));

      navigate("/");
    }
  }

  function onCancelDelete() {
    setShowConfirm(false);
  }

  function onDelete() {
    setShowConfirm(true);
  }

  function onSubmit(data: BookingModel) {
    console.log(data, errors);

    if (isEditing) {
      dispatch(updateBooking(toStore(data)));
    } else {
      dispatch(createNewBooking(toStore(data)));
    }

    navigate("/");
  }

  function calculatePrice() {
    if (typeRoom != null) {
      const days = differenceInDays(
        accommodation.endDate,
        accommodation.startDate
      );

      return mockTypeRoom[typeRoom].dailyPrice * days;
    }
  }

  function renderInformationAccommodation() {
    if (typeRoom != null && room != null && mockTypeRoom[typeRoom] != null) {
      const capacity = mockTypeRoom[typeRoom].capacity;
      const nights = differenceInDays(
        accommodation.endDate,
        accommodation.startDate
      );

      return (
        <div
          id="booking-informations-accommodation"
          className="d-flex flex-column justify-content-center align-items-center flex-grow-1"
        >
          <p>
            {nights > 1 ? `${nights} nights` : `${nights} night`},{" "}
            {capacity > 1 ? `${capacity} adults` : `${capacity} adult`}
          </p>
          <h3 className="text-success">US$ {calculatePrice()}</h3>
        </div>
      );
    }
  }

  function renderError(error: FieldError | null | undefined) {
    if (error != null) {
      return <Form.Text className="text-danger">{error.message}</Form.Text>;
    }
  }

  function renderContent() {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 mb-2 d-flex justify-content-between">
          <h5 id="booking-title">
            {isEditing ? "Edit Booking" : "New Booking"}
          </h5>
          <div className="d-flex">
            {isEditing ? (
              <div className="mx-2">
                <Button
                  id="button-delete-booking"
                  variant="outline-danger"
                  type="button"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </div>
            ) : null}
            <div className="mx-2">
              <Button id="button-save-booking" variant="primary" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Row>
                <Col>
                  <Form.Group
                    controlId="formDateRange"
                    className="d-flex flex-column"
                  >
                    <Form.Label>Accommodation time</Form.Label>
                    <div className="d-flex justify-content-center">
                      <Controller
                        name="accommodation"
                        control={control}
                        defaultValue={{
                          startDate: new Date(),
                          endDate: new Date(),
                          key: "selection",
                        }}
                        render={({ field }) => (
                          <Calendar
                            ranges={[field.value]}
                            onSelectionComplete={(item: any) =>
                              field.onChange(item)
                            }
                          />
                        )}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col className="d-flex flex-column">
                  <Form.Group className="mb-3">
                    <Form.Label>Type of accommodation</Form.Label>

                    <Form.Select
                      {...register("typeRoom", {
                        required: "Field is required",
                      })}
                      onChange={(event) => {
                        setValue("typeRoom", event.target.value);
                        resetField("room");
                      }}
                    >
                      <option value="">Select</option>
                      {optionsTypeRoom}
                    </Form.Select>
                    {renderError(errors.typeRoom)}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Room</Form.Label>

                    <Form.Select
                      disabled={typeRoom == null}
                      {...register("room", {
                        required: "Field is required",
                      })}
                    >
                      <option value="">Select</option>
                      {optionsRoom}
                    </Form.Select>
                    {renderError(errors.room)}
                  </Form.Group>
                  {renderInformationAccommodation()}
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name", { required: "Field is required" })}
                />
                {renderError(errors.name)}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "Field is required",
                  })}
                />
                {renderError(errors.email)}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  {...register("phone", {
                    required: "Field is required",
                  })}
                />
                {renderError(errors.phone)}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Document</Form.Label>
                <Form.Control
                  type="text"
                  {...register("documentNumber", {
                    required: "Field is required",
                  })}
                />
                {renderError(errors.documentNumber)}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>

                <Form.Select
                  {...register("status", {
                    required: "Field is required",
                  })}
                >
                  <option value="">Select</option>
                  <option value="PREBOOKING">Pre-Booking</option>
                  <option value="BOOKING">Booking</option>
                  <option value="CHECKIN">Check in</option>
                  <option value="CHECKOUT">Check out</option>
                  <option value="CANCELED">Canceled</option>
                </Form.Select>
                {renderError(errors.status)}
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }

  return (
    <Layout>
      <Card className="mt-4 mb-4 p-3">{renderContent()}</Card>
      {isEditing ? (
        <Modal show={showConfirm} onHide={onCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCancelDelete}>
              Cancel
            </Button>
            <Button
              id="button-confirm-delete"
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </Layout>
  );
}
