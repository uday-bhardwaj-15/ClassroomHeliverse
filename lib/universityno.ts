export function generateUniversityNo(length) {
  const number = "123456789";
  let universityno = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * number.length);
    universityno += number[randomIndex];
  }
  return `CU${universityno}`;
}
