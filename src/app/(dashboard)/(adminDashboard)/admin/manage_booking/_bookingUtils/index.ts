export const statusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-blue-100 text-blue-600";
    case "completed":
      return "bg-green-100 text-green-600";
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
