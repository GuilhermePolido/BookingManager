export const RoomTypes = {
  SINGLE_ROOM: "1",
  DOUBLE_ROOM: "2",
  TWIN_ROOM: "3",
  TRIPLE_ROOM: "4",
  QUAD_ROOM: "5",
  QUEEN_ROOM: "6",
  KING_ROOM: "7",
  STUDIO_ROOM: "8",
  SUITE_ROOM: "9",
  PRESIDENTIAL_SUITE: "10",
};

export type TypeRoom = {
  id: string;
  name: string;
  capacity: number;
  dailyPrice: number;
};

export const mockTypeRoom: { [key: string]: TypeRoom } = {
  [RoomTypes.SINGLE_ROOM]: {
    id: RoomTypes.SINGLE_ROOM,
    name: "Single Room",
    capacity: 1,
    dailyPrice: 12.00
  },
  [RoomTypes.DOUBLE_ROOM]: {
    id: RoomTypes.DOUBLE_ROOM,
    name: "Double Room",
    capacity: 2,
    dailyPrice: 20.00
  },
  [RoomTypes.TWIN_ROOM]: {
    id: RoomTypes.TWIN_ROOM,
    name: "Twin Room",
    capacity: 2,
    dailyPrice: 24.00
  },
  [RoomTypes.TRIPLE_ROOM]: {
    id: RoomTypes.TRIPLE_ROOM,
    name: "Triple Room",
    capacity: 3,
    dailyPrice: 30.00
  },
  [RoomTypes.QUAD_ROOM]: {
    id: RoomTypes.QUAD_ROOM,
    name: "Quad Room",
    capacity: 4,
    dailyPrice: 34.00
  },
  [RoomTypes.QUEEN_ROOM]: {
    id: RoomTypes.QUEEN_ROOM,
    name: "Queen Room",
    capacity: 2,
    dailyPrice: 25.00
  },
  [RoomTypes.KING_ROOM]: {
    id: RoomTypes.KING_ROOM,
    name: "King Room",
    capacity: 2,
    dailyPrice: 30.00
  },
  [RoomTypes.STUDIO_ROOM]: {
    id: RoomTypes.STUDIO_ROOM,
    name: "Studio Room",
    capacity: 2,
    dailyPrice: 25.00
  },
  [RoomTypes.SUITE_ROOM]: {
    id: RoomTypes.SUITE_ROOM,
    name: "Suite Room",
    capacity: 4,
    dailyPrice: 40.00
  },
  [RoomTypes.PRESIDENTIAL_SUITE]: {
    id: RoomTypes.PRESIDENTIAL_SUITE,
    name: "Presidential Suite",
    capacity: 5,
    dailyPrice: 50.00
  },
};

export type Room = {
  roomNumber: string;
  roomType: string;
  floor: number;
};

export const mockRooms: Room[] = [
  // Floor 1
  { roomNumber: "101", roomType: RoomTypes.SINGLE_ROOM, floor: 1 },
  { roomNumber: "102", roomType: RoomTypes.DOUBLE_ROOM, floor: 1 },
  { roomNumber: "103", roomType: RoomTypes.TWIN_ROOM, floor: 1 },
  { roomNumber: "104", roomType: RoomTypes.TRIPLE_ROOM, floor: 1 },
  { roomNumber: "105", roomType: RoomTypes.QUAD_ROOM, floor: 1 },
  { roomNumber: "106", roomType: RoomTypes.QUEEN_ROOM, floor: 1 },
  { roomNumber: "107", roomType: RoomTypes.KING_ROOM, floor: 1 },
  { roomNumber: "108", roomType: RoomTypes.STUDIO_ROOM, floor: 1 },
  { roomNumber: "109", roomType: RoomTypes.SUITE_ROOM, floor: 1 },
  { roomNumber: "110", roomType: RoomTypes.PRESIDENTIAL_SUITE, floor: 1 },

  // Floor 2
  { roomNumber: "201", roomType: RoomTypes.SINGLE_ROOM, floor: 2 },
  { roomNumber: "202", roomType: RoomTypes.DOUBLE_ROOM, floor: 2 },
  { roomNumber: "203", roomType: RoomTypes.TWIN_ROOM, floor: 2 },
  { roomNumber: "204", roomType: RoomTypes.TRIPLE_ROOM, floor: 2 },
  { roomNumber: "205", roomType: RoomTypes.QUAD_ROOM, floor: 2 },
  { roomNumber: "206", roomType: RoomTypes.QUEEN_ROOM, floor: 2 },
  { roomNumber: "207", roomType: RoomTypes.KING_ROOM, floor: 2 },
  { roomNumber: "208", roomType: RoomTypes.STUDIO_ROOM, floor: 2 },
  { roomNumber: "209", roomType: RoomTypes.SUITE_ROOM, floor: 2 },
  { roomNumber: "210", roomType: RoomTypes.PRESIDENTIAL_SUITE, floor: 2 },

  // Floor 3
  { roomNumber: "301", roomType: RoomTypes.SINGLE_ROOM, floor: 3 },
  { roomNumber: "302", roomType: RoomTypes.DOUBLE_ROOM, floor: 3 },
  { roomNumber: "303", roomType: RoomTypes.TWIN_ROOM, floor: 3 },
  { roomNumber: "304", roomType: RoomTypes.TRIPLE_ROOM, floor: 3 },
  { roomNumber: "305", roomType: RoomTypes.QUAD_ROOM, floor: 3 },
  { roomNumber: "306", roomType: RoomTypes.QUEEN_ROOM, floor: 3 },
  { roomNumber: "307", roomType: RoomTypes.KING_ROOM, floor: 3 },
  { roomNumber: "308", roomType: RoomTypes.STUDIO_ROOM, floor: 3 },
  { roomNumber: "309", roomType: RoomTypes.SUITE_ROOM, floor: 3 },
  { roomNumber: "310", roomType: RoomTypes.PRESIDENTIAL_SUITE, floor: 3 },

  // Floor 4
  { roomNumber: "401", roomType: RoomTypes.SINGLE_ROOM, floor: 4 },
  { roomNumber: "402", roomType: RoomTypes.DOUBLE_ROOM, floor: 4 },
  { roomNumber: "403", roomType: RoomTypes.TWIN_ROOM, floor: 4 },
  { roomNumber: "404", roomType: RoomTypes.TRIPLE_ROOM, floor: 4 },
  { roomNumber: "405", roomType: RoomTypes.QUAD_ROOM, floor: 4 },
  { roomNumber: "406", roomType: RoomTypes.QUEEN_ROOM, floor: 4 },
  { roomNumber: "407", roomType: RoomTypes.KING_ROOM, floor: 4 },
  { roomNumber: "408", roomType: RoomTypes.STUDIO_ROOM, floor: 4 },
  { roomNumber: "409", roomType: RoomTypes.SUITE_ROOM, floor: 4 },
  { roomNumber: "410", roomType: RoomTypes.PRESIDENTIAL_SUITE, floor: 4 },

  // Floor 5
  { roomNumber: "501", roomType: RoomTypes.SINGLE_ROOM, floor: 5 },
  { roomNumber: "502", roomType: RoomTypes.DOUBLE_ROOM, floor: 5 },
  { roomNumber: "503", roomType: RoomTypes.TWIN_ROOM, floor: 5 },
  { roomNumber: "504", roomType: RoomTypes.TRIPLE_ROOM, floor: 5 },
  { roomNumber: "505", roomType: RoomTypes.QUAD_ROOM, floor: 5 },
  { roomNumber: "506", roomType: RoomTypes.QUEEN_ROOM, floor: 5 },
  { roomNumber: "507", roomType: RoomTypes.KING_ROOM, floor: 5 },
  { roomNumber: "508", roomType: RoomTypes.STUDIO_ROOM, floor: 5 },
  { roomNumber: "509", roomType: RoomTypes.SUITE_ROOM, floor: 5 },
  { roomNumber: "510", roomType: RoomTypes.PRESIDENTIAL_SUITE, floor: 5 },

  // Floor 6
  { roomNumber: "601", roomType: RoomTypes.SINGLE_ROOM, floor: 6 },
  { roomNumber: "602", roomType: RoomTypes.DOUBLE_ROOM, floor: 6 },
  { roomNumber: "603", roomType: RoomTypes.TWIN_ROOM, floor: 6 },
  { roomNumber: "604", roomType: RoomTypes.TRIPLE_ROOM, floor: 6 },
  { roomNumber: "605", roomType: RoomTypes.QUEEN_ROOM, floor: 6 },
  { roomNumber: "606", roomType: RoomTypes.QUEEN_ROOM, floor: 6 },
  { roomNumber: "607", roomType: RoomTypes.KING_ROOM, floor: 6 },
  { roomNumber: "608", roomType: RoomTypes.STUDIO_ROOM, floor: 6 },
  { roomNumber: "609", roomType: RoomTypes.KING_ROOM, floor: 6 },
  { roomNumber: "610", roomType: RoomTypes.STUDIO_ROOM, floor: 6 },

  // Floor 7
  { roomNumber: "701", roomType: RoomTypes.SINGLE_ROOM, floor: 7 },
  { roomNumber: "702", roomType: RoomTypes.DOUBLE_ROOM, floor: 7 },
  { roomNumber: "703", roomType: RoomTypes.TWIN_ROOM, floor: 7 },
  { roomNumber: "704", roomType: RoomTypes.TRIPLE_ROOM, floor: 7 },
  { roomNumber: "705", roomType: RoomTypes.QUEEN_ROOM, floor: 7 },
  { roomNumber: "706", roomType: RoomTypes.QUEEN_ROOM, floor: 7 },
  { roomNumber: "707", roomType: RoomTypes.KING_ROOM, floor: 7 },
  { roomNumber: "708", roomType: RoomTypes.STUDIO_ROOM, floor: 7 },
  { roomNumber: "709", roomType: RoomTypes.KING_ROOM, floor: 7 },
  { roomNumber: "710", roomType: RoomTypes.STUDIO_ROOM, floor: 7 },

  // Floor 8
  { roomNumber: "801", roomType: RoomTypes.SINGLE_ROOM, floor: 8 },
  { roomNumber: "802", roomType: RoomTypes.DOUBLE_ROOM, floor: 8 },
  { roomNumber: "803", roomType: RoomTypes.TWIN_ROOM, floor: 8 },
  { roomNumber: "804", roomType: RoomTypes.TRIPLE_ROOM, floor: 8 },
  { roomNumber: "805", roomType: RoomTypes.QUEEN_ROOM, floor: 8 },
  { roomNumber: "806", roomType: RoomTypes.QUEEN_ROOM, floor: 8 },
  { roomNumber: "807", roomType: RoomTypes.KING_ROOM, floor: 8 },
  { roomNumber: "808", roomType: RoomTypes.STUDIO_ROOM, floor: 8 },
  { roomNumber: "809", roomType: RoomTypes.KING_ROOM, floor: 8 },
  { roomNumber: "810", roomType: RoomTypes.STUDIO_ROOM, floor: 8 },

  // Floor 9
  { roomNumber: "901", roomType: RoomTypes.SINGLE_ROOM, floor: 9 },
  { roomNumber: "902", roomType: RoomTypes.DOUBLE_ROOM, floor: 9 },
  { roomNumber: "903", roomType: RoomTypes.TWIN_ROOM, floor: 9 },
  { roomNumber: "904", roomType: RoomTypes.TRIPLE_ROOM, floor: 9 },
  { roomNumber: "905", roomType: RoomTypes.QUEEN_ROOM, floor: 9 },
  { roomNumber: "906", roomType: RoomTypes.QUEEN_ROOM, floor: 9 },
  { roomNumber: "907", roomType: RoomTypes.KING_ROOM, floor: 9 },
  { roomNumber: "908", roomType: RoomTypes.STUDIO_ROOM, floor: 9 },
  { roomNumber: "909", roomType: RoomTypes.KING_ROOM, floor: 9 },
  { roomNumber: "910", roomType: RoomTypes.STUDIO_ROOM, floor: 9 },

  // Floor 10
  { roomNumber: "1001", roomType: RoomTypes.SINGLE_ROOM, floor: 10 },
  { roomNumber: "1002", roomType: RoomTypes.DOUBLE_ROOM, floor: 10 },
  { roomNumber: "1003", roomType: RoomTypes.TWIN_ROOM, floor: 10 },
  { roomNumber: "1004", roomType: RoomTypes.TRIPLE_ROOM, floor: 10 },
  { roomNumber: "1005", roomType: RoomTypes.QUEEN_ROOM, floor: 10 },
  { roomNumber: "1006", roomType: RoomTypes.QUEEN_ROOM, floor: 10 },
  { roomNumber: "1007", roomType: RoomTypes.KING_ROOM, floor: 10 },
  { roomNumber: "1008", roomType: RoomTypes.STUDIO_ROOM, floor: 10 },
  { roomNumber: "1009", roomType: RoomTypes.KING_ROOM, floor: 10 },
  { roomNumber: "1010", roomType: RoomTypes.STUDIO_ROOM, floor: 10 },
];
