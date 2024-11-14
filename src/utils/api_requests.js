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

const addCustomer = async (customer) => {
  try {
    await axios.post(API_URL + "/customers", customer);
  } catch (error) {
    console.log("addCustomer error: " + error);
  }
};

const updateCustomer = async (customerURL, customer) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  try {
    await axios.put(customerURL, customer, config);
  } catch (error) {
    console.log("updateCustomer error: " + error);
  }
};

const deleteCustomer = async (customerURL) => {
  try {
    await axios.delete(customerURL);
  } catch (error) {
    console.log("deleteCustomer error: " + error);
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

const addCustomerTraining = async (training) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  try {
    await axios.post(API_URL + "/trainings", training, config);
  } catch (error) {
    console.log("addCustomerTraining error: " + error);
  }
};

export {
  // Export customer API requests
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,

  // Export training API requests
  fetchCustomerTrainings,
  addCustomerTraining,
};
