export const dataProfile = [
  {
    id: 1,
    username: "Gus Firas",
    password: "user",
    plantType: "cabai",
    amountOfPlant: 30,
    day: 1,
  },
];

export const dataWeather = [
  {
    id: 1,
    location: "Sleman",
    date: "1668267912621",
    data: [
      { name: "Temperatur", value: 50 },
      { name: "Kelembapan", value: 92 },
      { name: "Radiasi Matahari", value: 10 },
    ],
  },

  {
    id: 2,
    location: "Sleman",
    date: "1668267912621",
    data: [
      { name: "Temperatur", value: 40 },
      { name: "Kelembapan", value: 62 },
      { name: "Radiasi Matahari", value: 15 },
    ],
  },
];

export const dataLiveReport = [
  {
    id: 1,
    location: "Sleman",
    date: "1668267912621",
    data: [
      { name: "Temperatur", value: 45 },
      { name: "Kelembapan", value: 82 },
      { name: "Air digunakan", value: 2000 },
    ],
    table: [
      {
        header: ["WAKTU", "SUHU", "KELEMBAPAN", "STATUS", "AIR"],
        content: [
          {
            timestamp: "1668267912621",
            temperatur: 45,
            humadity: 45,
            status: "Normal",
            water: 45,
          },
          {
            timestamp: "1668267912621",
            temperatur: 45,
            humadity: 45,
            status: "Normal",
            water: 45,
          },
          {
            timestamp: "1668267912621",
            temperatur: 45,
            humadity: 45,
            status: "Normal",
            water: 45,
          },
          {
            timestamp: "1668267912621",
            temperatur: 45,
            humadity: 45,
            status: "Normal",
            water: 45,
          },
        ],
      },
    ],
  },
];

export const dataMonthlyReport = [
  {
    id: 1,
    location: "Sleman",
    date: "1",
    data: [
      { name: "Temperatur", value: 45 },
      { name: "Kelembapan", value: 82 },
      { name: "Air digunakan", value: 2000 },
    ],
    table: [
      {
        header: ["WAKTU", "SUHU", "KELEMBAPAN", "AIR"],
        content: [
          {
            timestamp: "1668267912621",
            temperatur: 45,
            humadity: 45,

            water: 45,
          },
          {
            timestamp: "1668267912621",
            temperatur: 45,
            humadity: 45,

            water: 45,
          },
          {
            timestamp: "1668267912621",
            temperatur: 45,
            humadity: 45,

            water: 45,
          },
          {
            timestamp: "1668267912621",
            temperatur: 45,
            humadity: 45,
            water: 45,
          },
        ],
      },
    ],
  },
];
