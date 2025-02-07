export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diff = now - date;

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  // Return the appropriate format
  if (minutes < 1) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // If more than 7 days, return the date in YYYY-MM-DD format
    return date.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
  }
};
