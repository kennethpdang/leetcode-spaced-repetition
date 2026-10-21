"use client";

import { useEffect, useState } from "react";

// Sends the browser's time zone with the form so "today" matches the user's own calendar.
export default function TimeZoneInput() {
  const [timeZone, setTimeZone] = useState("UTC");

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return <input type="hidden" name="timeZone" value={timeZone} />;
}
