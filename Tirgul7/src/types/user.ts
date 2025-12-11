export interface User {
  username: string;        // non-empty, 3..30 chars
  email: string;           // valid email (RFC-like), non-empty
  password: string;        // non-empty, min-length (e.g. 6)
  dob: string;             // ISO date string "YYYY-MM-DD" (validate no future dates)
  isAdmin: boolean;        // boolean (true | false)
}