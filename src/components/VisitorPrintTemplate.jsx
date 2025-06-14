// VisitorPrintTemplate.js
import React from "react";
import { Grid } from "@mui/material";
import { formatDateToIST } from "../utils/DateUtils";
import './printStyles.css';
const VisitorPrintTemplate = React.forwardRef(({ visitor }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        boxSizing: "border-box",
      }}
      className="font-size"
    >
      <Grid container spacing={2}>
        <Grid style={{ paddingLeft: "20px" }} item xs={12} md={4}>
          <div style={{ paddingTop: "20px" }}>
            <p  style={{ paddingBottom: "0px" }}>Pass No : {visitor.visit_id}</p>
            <p style={{ paddingBottom: "0x" }}>Check In : {formatDateToIST(visitor.check_in_time)}</p>
          </div>
          <div style={{ marginBottom: "12px", marginLeft: "155px", marginTop: "100px" }}>
            {visitor.photo ? (
              <img
                src={visitor.photo}
                alt="Visitor"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  border: "1px solid #000",
                }}
              />
            ) : (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  border: "1px dashed #aaa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#777",
                  fontSize: "12px",
                }}
              >
                No Photo
              </div>
            )}
          </div>
          <table>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{visitor.visitor_name}</td>
              </tr>
              <tr>
                <td><strong>Address:</strong></td>
                <td>{visitor.address}</td>
              </tr>
              <tr>
                <td><strong>Company:</strong></td>
                <td>{visitor.company}</td>
              </tr>
              <tr>
                <td><strong>Person To Visit:</strong></td>
                <td>{visitor.person_to_visit}</td>
              </tr>
              <tr>
                <td><strong>Purpose:</strong></td>
                <td>{visitor.purpose}</td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid container xs={12} md={4} style={{ paddingTop: 0, paddingLeft: "18px" }}>
          <Grid item md={6} style={{ paddingTop: 0, paddingLeft: 10 }}>
            <p>{formatDateToIST(visitor.check_in_time)}</p>
            <p style={{ paddingTop: "10px", paddingLeft: "20px" }}> {visitor.visit_id}</p>
            <p style={{ paddingTop: "10px", paddingLeft: "60px" }}> {visitor.visitor_name}</p>
            <p style={{ paddingTop: "10px", paddingLeft: "60px" }}> {visitor.person_to_visit}</p>
          </Grid>
          <Grid item md={6} style={{ paddingTop: "10px" }}>
            <p>Address: {visitor.address}</p>
            <p style={{ paddingTop: "18px" }}>Company: {visitor.company}</p>
            <p style={{ paddingTop: "10px" }}> Pupose of visit : {visitor.purpose}</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});

export default VisitorPrintTemplate;
