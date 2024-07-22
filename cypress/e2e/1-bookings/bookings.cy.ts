import {
  checkInformationsOfAccommodation,
  clearField,
  clickOnSave,
  fillField,
  selectAccommodationTime,
  selectOption,
  selectRoomOfAccommodation,
  selectTypeOfAccommodation,
} from "../../utils/e2eUtils";

describe("Tests without data on the home page", () => {
  it("Visit the home page and check the title", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Booking Manager");
  });

  it("Check if the data list is empty", () => {
    cy.visit("http://localhost:5173");
    cy.wait(2000);
    cy.get("#table-bookings").should("not.exist");
    cy.get("#empty-table-bookings").should("exist");
  });

  it("Check if there is a New Booking button and click", () => {
    cy.visit("http://localhost:5173");
    cy.get("#button-new-booking").should("exist").click();
    cy.wait(500);
    cy.url().should("include", "/bookings/new");
  });
});

describe("Create and update the first reservation", () => {
  let localStorageData;

  beforeEach(() => {
    if (localStorageData) {
      Object.keys(localStorageData).forEach((key) => {
        localStorage.setItem(key, localStorageData[key]);
      });
    }
  });

  afterEach(() => {
    localStorageData = {};
    Object.keys(localStorage).forEach((key) => {
      localStorageData[key] = localStorage.getItem(key);
    });
  });

  it("Visit the page and check the title", () => {
    cy.visit("http://localhost:5173/bookings/new");
    cy.get("#booking-title").should("have.text", "New Booking");
  });

  it("Create booking", () => {
    cy.visit("http://localhost:5173/bookings/new");

    selectAccommodationTime("10", "17");
    selectTypeOfAccommodation({ value: "2" });
    selectRoomOfAccommodation({ index: 3 });

    cy.wait(500);

    checkInformationsOfAccommodation();

    fillField("name", "Guilherme Anderzen Polido");
    fillField("email", "polidoguilherme13@gmail.com");
    fillField("phone", "+55 45 999115073");
    fillField("documentNumber", "08951995992");
    selectOption({ fieldName: "status", value: "BOOKING" });

    clickOnSave();

    cy.wait(500);

    cy.url().should("not.include", "/bookings/new");
  });

  it("Update first booking", () => {
    cy.visit("http://localhost:5173");

    cy.wait(2000);

    cy.get("#table-bookings").should("exist");

    cy.get("#table-bookings tbody")
      .find("tr")
      .first()
      .find("td")
      .eq(1)
      .should("have.text", "Guilherme Anderzen Polido");

    cy.get("#table-bookings tbody").find("tr").first().click();

    cy.wait(1000);
    cy.url().should("include", "/bookings/");
    cy.url().should("not.include", "/bookings/new");
    cy.get("#booking-title").should("have.text", "Edit Booking");

    clearField("name");
    fillField("name", "Guilherme Polido");
    selectOption({ fieldName: "status", value: "CANCELED" });

    clickOnSave();

    cy.wait(500);

    cy.get("#table-bookings").should("exist");

    cy.get("#table-bookings tbody")
      .find("tr")
      .first()
      .find("td")
      .eq(1)
      .should("have.text", "Guilherme Polido");
  });
});

describe("Import multiple reservations and test pagination and filters", () => {
  let localStorageData;

  before(() => {
    cy.fixture("e2eBookings.json").then((reservations) => {
      localStorageData = {
        bookings: JSON.stringify(reservations),
      };
    });
  });

  beforeEach(() => {
    if (localStorageData) {
      Object.keys(localStorageData).forEach((key) => {
        localStorage.setItem(key, localStorageData[key]);
      });
    }
  });

  afterEach(() => {
    localStorageData = {};
    Object.keys(localStorage).forEach((key) => {
      localStorageData[key] = localStorage.getItem(key);
    });
  });

  it("Go to page 2", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#showing-table").should("have.text", "Showing from 1 to 10 of 44");

    cy.get("#pagination-table-bookings").should("be.visible");

    cy.get("#pagination-table-bookings")
      .find("a.page-link")
      .contains("2")
      .click();

    cy.get("#pagination-table-bookings li.page-item.active").should(
      "contain",
      "2"
    );

    cy.get("#showing-table").should("have.text", "Showing from 11 to 20 of 44");
  });

  it("Click on next and previous", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#showing-table").should("have.text", "Showing from 1 to 10 of 44");

    cy.get("#pagination-table-bookings")
      .find("a.page-link")
      .contains("›")
      .click();

    cy.get("#pagination-table-bookings li.page-item.active").should(
      "contain",
      "2"
    );

    cy.get("#showing-table").should("have.text", "Showing from 11 to 20 of 44");

    cy.get("#pagination-table-bookings")
      .find("a.page-link")
      .contains("‹")
      .click();

    cy.get("#pagination-table-bookings li.page-item.active").should(
      "contain",
      "1"
    );

    cy.get("#showing-table").should("have.text", "Showing from 1 to 10 of 44");
  });

  it("Click on the last and first page", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#showing-table").should("have.text", "Showing from 1 to 10 of 44");

    cy.get("#pagination-table-bookings")
      .find("a.page-link")
      .contains("»")
      .click();

    cy.get("#pagination-table-bookings li.page-item.active").should(
      "contain",
      "5"
    );

    cy.get("#showing-table").should("have.text", "Showing from 41 to 50 of 44");

    cy.get("#pagination-table-bookings")
      .find("a.page-link")
      .contains("«")
      .click();

    cy.get("#pagination-table-bookings li.page-item.active").should(
      "contain",
      "1"
    );

    cy.get("#showing-table").should("have.text", "Showing from 1 to 10 of 44");
  });

  it("Filter by search field", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#search-table-bookings").should("exist");
    fillField("search-table", "Michael Brown{enter}");

    cy.wait(1000);

    cy.get("#table-bookings tbody").find("tr").should("have.length", 1);

    clearField("search-table");
    cy.get("#button-search-table-bookings").click();

    cy.wait(1000);

    cy.get("#table-bookings tbody")
      .find("tr")
      .its("length")
      .should("be.eq", 10);
  });

  it("Filter by status", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#search-table-bookings").should("exist");
    cy.get("#custom-filter-table-bookings").should("be.visible");

    selectOption({ id: "custom-filter-table-bookings", value: "BOOKING" });

    cy.get("#button-search-table-bookings").click();

    cy.get("#table-bookings tbody").find("tr").its("length").should("be.eq", 9);

    cy.get("#table-bookings tbody").find("tr").first().click();

    cy.get('select[name="status"]').should("have.value", "BOOKING");
  });

  it("Delete booking", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#search-table-bookings").should("exist");

    cy.get("#showing-table").should("have.text", "Showing from 1 to 10 of 44");

    cy.get("#table-bookings tbody").find("tr").first().click();

    cy.get("#button-delete-booking").should("exist").click();

    cy.get(".modal-content").should("be.visible");
    cy.get("#button-confirm-delete").should("be.visible").click();

    cy.get("#showing-table").should("have.text", "Showing from 1 to 10 of 43");
  });
});
