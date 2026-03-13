"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import css from "./BookingForm.module.css";

export default function BookingForm({ carId }: { carId: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in Name and Email");
      return;
    }

    try {
      toast.success("Car successfully booked!");
      setForm({ name: "", email: "", bookingDate: "", comment: "" });
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  }

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="name"
          placeholder="Name*"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className={css.input}
          type="email"
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className={css.input}
          type="text"
          name="bookingDate"
          placeholder="Booking date"
          value={form.bookingDate}
          onChange={handleChange}
        />
        <textarea
          className={`${css.input} ${css.textarea}`}
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
        />
        <button className={css.sendBtn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
