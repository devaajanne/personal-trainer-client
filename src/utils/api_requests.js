import axios from "axios";

const API_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

const fetchCustomers = async () => {
  try {
    const response = await axios.get(API_URL + "/customers");
    return response.data._embedded.customers;
  } catch (error) {
    console.log("fetchCustomers error: " + error);
  }
};

const fetchCustomerTrainings = async () => {
  try {
    const response = await axios.get(API_URL + "/gettrainings");
    return response.data;
  } catch (error) {
    console.log("fetchCustomerTrainings error: " + error);
  }
};

export { fetchCustomers, fetchCustomerTrainings };
