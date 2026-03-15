export function formatMileage(mileage: number): string {
  return mileage.toLocaleString("uk-UA");
}

export function formatMileageInput(prefix: string, value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits
    ? `${prefix} ${Number(digits).toLocaleString("en-US")}`
    : prefix;
}

export function parseAddress(address: string) {
  const parts = address.split(", ");
  return {
    city: parts[1] ?? "",
    country: parts[2] ?? "",
  };
}
