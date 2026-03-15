"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import css from "./BookingForm.module.css";
import Button from "@/components/Button/Button";
import clsx from "clsx";

export default function BookingForm() {
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in Name and Email");
      return;
    }

    toast.success("Car successfully booked!");
    setForm({ name: "", email: "", bookingDate: "", comment: "" });
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
          className={clsx(css.input, css.dateInput, form.bookingDate && css.dateFilled)}
          type="date"
          name="bookingDate"
          placeholder="Booking date"
          value={form.bookingDate}
          onChange={handleChange}
        />
        <textarea
          className={clsx(css.input, css.textarea)}
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
        />
        <Button type="submit" className={css.bookBtn}>
          Send
        </Button>
      </form>
    </div>
  );
}
