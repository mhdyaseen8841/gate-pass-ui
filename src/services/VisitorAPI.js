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

export async function getPurpose() {
  try {
    const response = await VISITOR_INSTANCE.get('/getPurpose');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPerson(company_id) {
  try {
    const response = await VISITOR_INSTANCE.get('/getPerson', {
      params: { company_id },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCompany() {
  try {
    const response = await VISITOR_INSTANCE.get('/getCompany');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addPurpose(purpose,user="admin" ) {
  try {
    const response = await VISITOR_INSTANCE.post('/addPurpose', { user, purpose });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addPerson(company_id, person_name, user="admin") {
  try {
    const response = await VISITOR_INSTANCE.post('/addPerson', { company_id, person_name, user });
    return response.data;
  } catch (error) {
    throw error;
  }
}
