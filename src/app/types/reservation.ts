export type ReservationStatus = "Pending" | "Fulfilled" | "Cancelled";

export interface Reservation {
  id: string;
  bookId: string;
  memberId: string;
  reservedDate: string;
  status: ReservationStatus;
  fulfilledDate?: string | null;
}

export interface CreateReservationInput {
  bookId: string;
  memberId: string;
}
