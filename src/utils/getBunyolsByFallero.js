const getComisionByBirthDate = require("./getComisionByBirthDate");

function getYearsFromDate(startDate) {
  if (!startDate) return 0;

  const today = new Date();
  const start = new Date(startDate);

  let years = today.getFullYear() - start.getFullYear();
  const monthDiff = today.getMonth() - start.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < start.getDate())) {
    years -= 1;
  }

  return Math.max(years, 0);
}

function getBunyolsByFallero(fallero) {
  const comision = getComisionByBirthDate(fallero.fecha_nacimiento);
  const antiguedad = getYearsFromDate(fallero.fecha_alta);

  if (comision === "infantil") {
    const recompensas = [
      {
        key: "distintiu_coure",
        label: "Distintiu de Coure",
        requiredYears: 1,
        unlocked: antiguedad >= 1,
      },
      {
        key: "distintiu_argent",
        label: "Distintiu d'Argent",
        requiredYears: 5,
        unlocked: antiguedad >= 5,
      },
      {
        key: "distintiu_or",
        label: "Distintiu d'Or",
        requiredYears: 10,
        unlocked: antiguedad >= 10,
      },
    ];

    return {
      comision,
      antiguedad,
      recompensas,
    };
  }

  const recompensas = [
    {
      key: "bunyol_coure",
      label: "Bunyol de Coure",
      requiredYears: 2,
      unlocked: antiguedad >= 2,
    },
    {
      key: "bunyol_argent",
      label: "Bunyol d'Argent",
      requiredYears: 7,
      unlocked: antiguedad >= 7,
    },
    {
      key: "bunyol_or",
      label: "Bunyol d'Or",
      requiredYears: 10,
      unlocked: antiguedad >= 10,
    },
    {
      key: "bunyol_or_lliurer",
      label: "Bunyol d'Or amb Fulles de Llorer",
      requiredYears: 20,
      unlocked: antiguedad >= 20,
    },
    {
      key: "bunyol_or_brillants",
      label: "Bunyol d'Or i Brillants amb Fulles de Llorer",
      requiredYears: 30,
      unlocked: antiguedad >= 30,
    },
  ];

  return {
    comision,
    antiguedad,
    recompensas,
  };
}

module.exports = getBunyolsByFallero;
