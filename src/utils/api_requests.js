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
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  try {
    await axios.post(API_URL + "/customers", customer, config);
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

// This is to fetch traininigs without customer data
const fetchTrainings = async () => {
  try {
    const response = await axios.get(API_URL + "/trainings");
    return response.data;
  } catch {
    console.log("fetchTrainings error: " + error);
  }
};

// This is to fetch traininigs with customer data
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

const deleteCustomerTraining = async (customerTrainingURL) => {
  try {
    await axios.delete(customerTrainingURL);
  } catch (error) {
    console.log("deleteTrainingCustomer error: " + error);
  }
};

export {
  API_URL,

  // Export customer API requests
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,

  // Export training API requests
  fetchTrainings,
  fetchCustomerTrainings,
  addCustomerTraining,
  deleteCustomerTraining,
};
