const axios = require("axios");
const { v4 } = require("uuid");
const data = {
  id: v4(),
  name: "HN1234",
  owner: "Phuong Trang Travel",
  source: "Ho Chi Minh",
  destination: "Hanoi",
  price: "150",
  date: new Date().toDateString(),
  time: new Date().toLocaleTimeString(),
};

const generator = async (details) => {
  try {
    const { data } = await axios.post(
      "https://train-booking-tfd.firebaseio.com/trains.json",
      details
    );
    console.log(data);
  } catch (e) {
    console.log(`e -> ${e.message}`);
  }
};

generator(data);

// const getDetails = async () => {
//     try {
//         const { data } = await axios.get("https://train-booking-tfd.firebaseio.com/trains.json")
//         console.log(data)
//     } catch (e) {
//         console.log (`e -> ${e.message}`)
//     }
// }
// getDetails()
