export default function getMinDate() {
  let date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
}
