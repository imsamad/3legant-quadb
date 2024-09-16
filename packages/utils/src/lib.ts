export function generateOTP(numDigits: number = 4): string {
  if (numDigits < 1) {
    throw new Error("Number of digits must be at least 1");
  }

  // Calculate the range for the OTP
  const max = Math.pow(10, numDigits);
  const min = max / 10;

  // Generate a random number within the range
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  // Convert to string and pad with leading zeros if required
  // @ts-ignore
  const otpString = randomNumber.toString().padStart(numDigits, "0");

  return otpString;
}

export function humaniseDateObject(time: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return time.toLocaleString("en-US", options);
}
