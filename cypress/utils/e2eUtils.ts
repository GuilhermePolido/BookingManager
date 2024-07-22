export function selectAccommodationTime(startDate: string, endDate: string) {
  cy.get(".custom-date-range-picker").should("exist");
  cy.contains("button.rdrDay", startDate).click();
  cy.contains("button.rdrDay", endDate).click();
}

export function selectTypeOfAccommodation({
  index,
  value,
}: {
  index?: number | null;
  value?: string | null;
}) {
  cy.get('select[name="typeRoom"]').should("exist");
  selectOption({ fieldName: "typeRoom", index, value });
}

export function selectRoomOfAccommodation({
  index,
  value,
}: {
  index?: number | null;
  value?: string | null;
}) {
  cy.get('select[name="room"]').should("exist");
  cy.get('select[name="room"]').find("option").its("length").should("be.gt", 1);
  cy.get('select[name="room"]').select(index ?? value ?? "");

  selectOption({ fieldName: "room", index, value });
}

export function checkInformationsOfAccommodation() {
  cy.get("#booking-informations-accommodation").should("exist");
  cy.get("#booking-informations-accommodation p").should(
    "have.text",
    "7 nights, 2 adults"
  );
  cy.get("#booking-informations-accommodation h3").should("exist");
}

export function fillField(fieldName: string, value: string) {
  cy.get(`input[name="${fieldName}"]`).type(value);
}

export function clearField(fieldName: string) {
  cy.get(`input[name="${fieldName}"]`).clear();
}

export function selectOption({
  id,
  fieldName,
  index,
  value,
}: {
  id?: string;
  fieldName?: string;
  index?: number | null;
  value?: string | null;
}) {
  cy.get(fieldName ? `select[name="${fieldName}"]` : `#${id}`)
    .select(index ?? value ?? "", { force: true })
    .trigger("change");
}

export function clickOnSave() {
  cy.get('button[type="submit"]').should("exist").click();
}
