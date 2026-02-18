// src/app/lib/session.js
export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD, // at least 32 chars
  cookieName: "carpool_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};


