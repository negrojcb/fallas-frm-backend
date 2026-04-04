function getComisionByBirthDate(fechaNacimiento) {
  if (!fechaNacimiento) return null;

  const today = new Date();
  const birthDate = new Date(fechaNacimiento);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age < 14 ? "infantil" : "mayor";
}

module.exports = getComisionByBirthDate;
