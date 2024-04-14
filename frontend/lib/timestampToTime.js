export function convertTimestampToTime(timestamp) {
  const targetDate = new Date(timestamp * 1000);

  if (timestamp === "0") {
    return "Not ended yet";
  } else {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    let hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();
    const seconds = targetDate.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12;

    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year} ${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds} ${ampm}`;
  }
}
