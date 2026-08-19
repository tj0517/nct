"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import BookingModal from "./BookingModal";

interface BookingDict {
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  inPerson: string;
  online: string;
  messagePlaceholder: string;
  submitCta: string;
  modalHeading: string;
}

const Ctx = createContext<() => void>(() => {});

export function useBookingModal() {
  return useContext(Ctx);
}

export function BookingModalProvider({
  children,
  bookingDict,
}: {
  children: ReactNode;
  bookingDict: BookingDict;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={() => setOpen(true)}>
      {children}
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        dict={bookingDict}
      />
    </Ctx.Provider>
  );
}
