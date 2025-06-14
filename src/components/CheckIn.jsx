import React, { useEffect, useState } from "react";

import {
  getCompany,
  getPerson,
  getPurpose,
  addPerson,
  addPurpose,
  visitEntry,
  searchVisitorReport,
} from "../services/VisitorAPI";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import ImageUploadComponent from "./ImageUploadComponent";
import AddDialog from "./AddDialog";
import DropdownSearch from "./DropDownSearch";
import { Business, Email, Person, Phone } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import VisitorPrintTemplate from "./VisitorPrintTemplate";
import LoadingOverlay from "./LoadingOverlay";
import { formatDateToIST } from "../utils/DateUtils";

const CheckIn = ({ setView }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [currentVisitor, setCurrentVisitor] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    personToVisit: "",
    purpose: "",
    remarks: "",
    image: "",
    visitorType: "individual",
  });

  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPurpose, setSearchPurpose] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [form, setForm] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(false);

  const printComponentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const [printData, setPrintData] = useState(null);

  const handleSearch = async (term, purposeFilter) => {
    try {
      setLoading(true);
      const response = await searchVisitorReport(term, purposeFilter);
      setSearchResults(response || []);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Failed to search visitors");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVisitor = (visitor) => {
    debugger;
    setCurrentVisitor({
      name: visitor.visitor_name,
      email: visitor.email || "",
      phone: visitor.phone || "",
      address: visitor.address || "",
      visitorType: visitor.visitor_type || "individual",
      image: visitor.photo || "",
    });
    
    setSearchDialogOpen(false);
    setSearchPurpose();
    setSearchResults([]);
    setSearchTerm();
    setHasSearched(false);
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Visitor Pass",
    contentRef: printComponentRef,
    pageStyle: `
        @page {
          size: auto;
          margin: 0;
        }
          @media print {
        body {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          margin: 0;
          padding-left: 20px;
        }
        html {
          height: 100%;
        }
      }
      `,
    onAfterPrint: () => {
      setPrintData(null);
    },
  });

  async function addPersonDetails(person_name) {
    const data = await addPerson(selectedCompanyId, person_name);
    getPersonByCompanyId(selectedCompanyId);
    setCurrentVisitor({
      ...currentVisitor,
      personToVisit: person_name,
    });
  }

  async function addPurposeName(purpose_name) {
    await addPurpose(purpose_name);
    fetchPurpose();
    setCurrentVisitor({
      ...currentVisitor,
      purpose: purpose_name,
    });
  }

  async function getPersonByCompanyId(companyId = null) {
    const data = await getPerson(companyId);
    setPerson(data);
  }

  async function fetchCompanies() {
    const data = await getCompany();
    setCompanies(data);
  }

  async function fetchPurpose() {
    const data = await getPurpose();
    setPurpose(data);
  }

  useEffect(() => {
    fetchCompanies();
    fetchPurpose();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCurrentVisitor({ ...currentVisitor, [name]: value });
  };

  const handleImageChange = (data, url) => {
    console.log(data);
    console.log(url);
    setCurrentVisitor({ ...currentVisitor, image: data });
  };
  // Handle check-in submission
  const handleCheckIn = () => {
    if (!currentVisitor.name) {
      toast.error("Name is required!");
      return false;
    }
    if (!currentVisitor.personToVisit) {
      toast.error("Person to visit is required!");
      return false;
    }
    if (!currentVisitor.purpose) {
      toast.error("Purpose is required!");
      return false;
    }
    if (!currentVisitor.image) {
      toast.error("Image is required!");
      return false;
    }
    if (!currentVisitor.company) {
      toast.error("Company is required!");
      return false;
    }
    if (!currentVisitor.phone) {
      toast.error("Phone is required!");
      return false;
    }
    if (!currentVisitor.address) {
      toast.error("Address is required!");
      return false;
    }

    setLoading(true);
    visitEntry(currentVisitor)
      .then((res) => {
        toast.success("Visitor checked in successfully!");
        setLoading(false);
        setPrintData({
          visit_id: res?.[0]?.[""] ?? "",
          visitor_name: currentVisitor.name,
          company: currentVisitor.company,
          person_to_visit: currentVisitor.personToVisit,
          purpose: currentVisitor.purpose,
          address: currentVisitor.address,
          photo: currentVisitor.image,
          check_in_time: new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString(),
        });

        setCurrentVisitor({
          name: "",
          email: "",
          phone: "",
          address: "",
          company: "",
          personToVisit: "",
          purpose: "",
          remarks: "",
          image: "",
          visitorType: "individual",
        });
        setForm(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error checking in visitor!");
      });
  };

  useEffect(() => {
    if (printData && !loading) {
      const timeout = setTimeout(() => {
        handlePrint();
      }, 100); // slight delay to ensure render

      return () => clearTimeout(timeout); // cleanup
    }
  }, [printData]);

  return (
    <>
      {loading && <LoadingOverlay />}
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: 600,
            color: "#2c3e50",
            mb: 4,
          }}
        >
          Visitor Check-In
        </Typography>
        <Grid
          container
          spacing={2}
          flexDirection={{ xs: "column-reverse", md: "row" }}
        >
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} direction="column">
              <Grid item></Grid>

              <Grid item>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={currentVisitor.name}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ color: "action.active", mr: 1 }} />
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSearchDialogOpen(true)}
                    sx={{ minWidth: "auto", px: 2 }}
                  >
                    <PersonSearchIcon />
                  </Button>
                </Box>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={currentVisitor.email}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <Email sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={currentVisitor.phone}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <Phone sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <ImageUploadComponent
              image={form}
              setImage={setForm}
              handleImageChange={handleImageChange}
              visitorData={currentVisitor}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Visitor Type</FormLabel>
              <RadioGroup
                row
                name="visitorType"
                value={currentVisitor.visitorType}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="individual"
                  control={<Radio />}
                  label="Individual"
                />
                <FormControlLabel
                  value="group"
                  control={<Radio />}
                  label="Group"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              required
              value={currentVisitor.address}
              onChange={handleInputChange}
              multiline
              rows={4}
              placeholder="Enter address..."
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <DropdownSearch
                options={
                  purpose
                    ? purpose.map((p) => ({
                        label: p.purpose,
                        value: p.purpose,
                      }))
                    : []
                }
                formdata={form}
                value={currentVisitor.purpose}
                label="Purpose To Visit"
                onChange={(selected) =>
                  setCurrentVisitor({
                    ...currentVisitor,
                    purpose: selected?.value,
                  })
                }
              />
              <AddDialog
                label="Purpose"
                stateName="purpose"
                addData={addPurposeName}
                setData={setPurpose}
                setCurrentVisitor={setCurrentVisitor}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Company</InputLabel>
              <Select
                name="company"
                value={currentVisitor.company}
                label="Company"
                onChange={(e) => {
                  const selectedCompany = companies.find(
                    (c) => c.company_name === e.target.value
                  );
                  console.log(selectedCompany);
                  setSelectedCompanyId(selectedCompany.company_id);
                  getPersonByCompanyId(selectedCompany.company_id);
                  handleInputChange(e);
                }}
                startAdornment={<Business />}
              >
                {companies.map((c) => (
                  <MenuItem key={c.company_id} value={c.company_name}>
                    {c.company_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <DropdownSearch
                options={
                  person
                    ? person.map((p) => ({
                        label: p.person_name,
                        value: p.person_name,
                      }))
                    : []
                }
                label="Person To Visit"
                formdata={form}
                value={currentVisitor.personToVisit}
                onChange={(selected) =>
                  setCurrentVisitor({
                    ...currentVisitor,
                    personToVisit: selected?.value,
                  })
                }
                disabled={!selectedCompanyId}
              />
              {selectedCompanyId && (
                <AddDialog
                  label="person"
                  stateName="personToVisit"
                  addData={addPersonDetails}
                  setData={setPerson}
                  setCurrentVisitor={setCurrentVisitor}
                />
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Remarks"
              name="remarks"
              label="Remarks"
              value={currentVisitor.remarks}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setView("dashboard")}
            sx={{
              color: "red", // 🔴 Set text color for cancel
              borderColor: "red",
              "&:hover": {
                backgroundColor: "#ffe5e5",
                borderColor: "darkred",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCheckIn}
            sx={{
              backgroundColor: "#4CAF50",
              color: "#fff", // ✅ Set white text color
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            Complete Check-In
          </Button>
        </Box>
      </Paper>

      <div style={{ display: "none" }}>
        {printData && !loading && (
          <VisitorPrintTemplate ref={printComponentRef} visitor={printData} />
        )}
      </div>

      <Dialog
        open={searchDialogOpen}
        onClose={() => {
          setSearchDialogOpen(false);
          setSearchPurpose();
          setSearchResults([]);
          setSearchTerm();
          setHasSearched(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Search by name or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                  name="search-no-autofill"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleSearch(searchTerm, searchPurpose)}
                  disabled={!searchTerm || searchTerm.length < 3}
                  sx={{ minWidth: "auto", px: 3 }}
                >
                  Search
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <DropdownSearch
                  options={
                    purpose
                      ? purpose.map((p) => ({
                          label: p.purpose,
                          value: p.purpose,
                        }))
                      : []
                  }
                  value={searchPurpose}
                  label="Filter by Purpose"
                  onChange={(selected) => {
                    setSearchPurpose(selected?.value || "");
                  }}
                  isClearable={true}
                  isRequired={false}
                />
              </FormControl>
            </Grid>
          </Grid>
          <List>
            {searchResults.map((visitor) => (
              <ListItem
                key={visitor.visit_id}
                divider
                sx={{
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  py: 2,
                }}
              >
                <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                  {/* Visitor Image */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "1px solid #ddd",
                    }}
                  >
                    {visitor.photo ? (
                      <img
                        src={visitor.photo}
                        alt={visitor.visitor_name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#f5f5f5",
                        }}
                      >
                        <Person sx={{ fontSize: 40, color: "#bdbdbd" }} />
                      </Box>
                    )}
                  </Box>

                  {/* Visitor Details */}
                  <Box sx={{ flex: 1 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {visitor.visitor_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }} color="text.secondary">
                          {visitor.check_out_time
                            ? formatDateToIST(visitor.check_out_time)
                            : "Not checked out"}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <Phone
                            sx={{
                              fontSize: 16,
                              mr: 0.5,
                              verticalAlign: "middle",
                            }}
                          />
                          {visitor.phone}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <Business
                            sx={{
                              fontSize: 16,
                              mr: 0.5,
                              verticalAlign: "middle",
                            }}
                          />
                          {visitor.company}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Purpose: {visitor.purpose}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Person To Visit: {visitor.person_to_visit}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Action Button */}
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleSelectVisitor(visitor)}
                    sx={{ alignSelf: "center" }}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
            {searchResults.length === 0 && searchTerm && hasSearched && (
              <ListItem>
                <ListItemText primary="No results found" />
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckIn;
