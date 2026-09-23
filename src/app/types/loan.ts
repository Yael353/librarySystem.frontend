export interface Loan {
  id: string;
  bookId: string;
  memberId: string;
  loanDate: string;
  dueDate: string;
  returnedDate?: string | null;
}

export interface CreateLoanInput {
  bookId: string;
  memberId: string;
}