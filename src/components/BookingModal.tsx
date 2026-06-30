"use client";

import { useEffect } from "react";
import Button from "./Button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-main/60 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-main rounded-bl-[50px] rounded-tr-[50px] p-6 md:p-10 flex flex-col gap-4 md:gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-main-bg/70 hover:text-main-bg transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>

        <h3 className="font-fraunces font-bold text-xl md:text-2xl text-main-bg pr-8">
          Book your free introduction
        </h3>

        <input
          type="text"
          placeholder="Name"
          className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
        />
        <input
          type="tel"
          placeholder="Phone"
          className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors"
        />

        {/* Meeting preference */}
        <div className="flex gap-3">
          <label className="flex-1 flex items-center gap-3 bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 cursor-pointer has-[:checked]:bg-main-bg has-[:checked]:ring-2 has-[:checked]:ring-main-bg transition-colors">
            <input
              type="radio"
              name="modal-meeting"
              value="in-person"
              className="accent-main-bg w-4 h-4"
              defaultChecked
            />
            <span className="font-inter text-sm md:text-base text-main">In person</span>
          </label>
          <label className="flex-1 flex items-center gap-3 bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 cursor-pointer has-[:checked]:bg-main-bg has-[:checked]:ring-2 has-[:checked]:ring-main-bg transition-colors">
            <input
              type="radio"
              name="modal-meeting"
              value="online"
              className="accent-main-bg w-4 h-4"
            />
            <span className="font-inter text-sm md:text-base text-main">Online</span>
          </label>
        </div>

        <textarea
          placeholder="Message (optional)"
          rows={3}
          className="bg-main-bg/90 rounded-bl-[25px] rounded-tr-[25px] px-5 md:px-6 py-3 md:py-4 font-inter text-base text-main placeholder:text-main/40 outline-none focus:bg-main-bg transition-colors resize-none"
        />
        <Button variant="inverse" className="!w-full !h-auto !py-4 !font-normal mt-2">
          Book your free introduction
        </Button>
      </div>
    </div>
  );
}
