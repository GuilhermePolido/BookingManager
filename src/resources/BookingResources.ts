import { BookingModel } from "src/models/BookingsModel";

class BookingResources {
  listBookings = (
    {
      page = 1,
      search,
      pageSize = 10,
      customFilter,
    }: {
      page?: number;
      search?: string;
      pageSize?: number;
      customFilter?: any;
    },
    list: BookingModel[]
  ): Promise<{
    data: BookingModel[];
    count: number;
    page: number;
    pageSize: number;
  }> => {
    let data: BookingModel[] = list;
    let count = data.length;

    if (customFilter != null && customFilter?.length > 0) {
      data = data.filter((booking) => booking.status == customFilter);
      count = data.length;
    }

    if (search != null && search?.length > 0) {
      data = data.filter(
        (booking) =>
          booking.name.toLowerCase().includes(search.toLowerCase()) ||
          booking.room.toLowerCase().includes(search.toLowerCase()) ||
          booking.documentNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    data = data.slice((page - 1) * pageSize, page * pageSize);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data, count, page, pageSize });
      }, 1000);
    });
  };

  getBookings = (
    id: string,
    list: BookingModel[]
  ): Promise<{ data: BookingModel | null | undefined }> => {
    const finded = list.find((booking) => booking.id === id);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: finded });
      }, 1000);
    });
  };
}

export default new BookingResources();
