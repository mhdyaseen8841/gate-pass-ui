import { VISITOR_INSTANCE } from "./axiosInstance";

// GET: Visitor Dashboard
export async function getVisitorDashboard() {
  try {
    const response = await VISITOR_INSTANCE.get("/getVisitorDashboard");
    return response.data;
  } catch (error) {
    throw error;
  }
}

// GET: Current Visitors
export async function getCurrentVisitor() {
  try {
    const response = await VISITOR_INSTANCE.get("/getCurrentVisitor");
    return response.data;
  } catch (error) {
    throw error;
  }
}

// GET: Visitor Report (with date filters)
export async function getVisitorReport(from_date, to_date) {
  try {
    const response = await VISITOR_INSTANCE.get(`/getVisitorReport`, {
      params: { from_date, to_date }, // Pass query parameters
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// POST: Visitor Checkout
export async function visitorCheckout(data) {
  try {
    const response = await VISITOR_INSTANCE.post("/visitorCheckout", data);
    return response;
  } catch (error) {
    throw error;
  }
}

// POST: Visit Entry
export async function visitEntry(data) {
  try {
    const response = await VISITOR_INSTANCE.post("/visitEntry", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}