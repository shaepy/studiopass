const dayjs = require("dayjs");

const formatSessions = (sessions) => {
  const transformedSessions = sessions.map((session) => {
    const start = new Date(session.startAt);
    const end = new Date(session.endAt);
    const weekday = start.toLocaleString("en-US", { weekday: "short" });
    const month = start.toLocaleString("en-US", { month: "short" });
    const day = start.getDate().toString();
    const year = start.getFullYear().toString();

    const startTime = start.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = end.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const instructorName = `${session.instructorId.firstName} ${session.instructorId.lastName}`;

    return {
      ...session.toObject(),
      month: month,
      day: day,
      year: year,
      weekday: weekday,
      startTime: startTime,
      endTime: endTime,
      instructorName: instructorName,
    };
  });

  console.log("transformedSessions:", transformedSessions);
  return transformedSessions;
};

const formatSession = (session) => {
  const start = new Date(session.startAt);
  const end = new Date(session.endAt);
  const weekday = start.toLocaleString("en-US", { weekday: "short" });
  const month = start.toLocaleString("en-US", { month: "short" });
  const day = start.getDate().toString();
  const year = start.getFullYear().toString();

  const startTime = start.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = end.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const instructorName = `${session.instructorId.firstName} ${session.instructorId.lastName}`;

  const startDate = dayjs(start);
  const startAtDate = startDate.format("YYYY-MM-DD");
  const startAtTime = startDate.format("HH:mm");

  const endDate = dayjs(end);
  const endAtDate = endDate.format("YYYY-MM-DD");
  const endAtTime = endDate.format("HH:mm");

  return {
    ...session.toObject(),
    month: month,
    day: day,
    year: year,
    weekday: weekday,
    startTime: startTime,
    endTime: endTime,
    instructorName: instructorName,
    // ALSO INCLUDE INFO FOR FORM DATA (EDIT SESSION)
    instructor: session.instructorId.username,
    startAtDate: startAtDate,
    startAtTime: startAtTime,
    endAtDate: endAtDate,
    endAtTime: endAtTime,
  };
};

module.exports = { formatSessions, formatSession };
