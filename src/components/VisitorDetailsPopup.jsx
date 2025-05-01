import { formatDateToIST } from "../utils/DateUtils";

const VisitorDetailsPopup = ( ({ visitor }) => 
    {
    return(
  <div  style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h1 style={{ margin: "0" }}>Visitor Badge</h1>
      <p style={{ margin: "5px 0" }}>Synthite</p>
    </div>

    <div style={{ border: "2px solid #000", padding: "15px", borderRadius: "5px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <div>
          <h2 style={{ margin: "0 0 10px 0" }}>VISITOR</h2>
          <h3 style={{ margin: "0" }}>{visitor.badge}</h3>
        </div>
        <div style={{ width: "100px", height: "100px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {visitor.photo ? (
            <img src={visitor.photo} alt="Visitor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span>Photo</span>
          )}
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
        <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Visit No:</td>
            <td style={{ padding: "5px 0" }}>{visitor.visit_id}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Name:</td>
            <td style={{ padding: "5px 0" }}>{visitor.visitor_name}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Company:</td>
            <td style={{ padding: "5px 0" }}>{visitor.company}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>personToVisit:</td>
            <td style={{ padding: "5px 0" }}>{visitor.person_to_visit}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Purpose:</td>
            <td style={{ padding: "5px 0" }}>{visitor.purpose}</td>
          </tr>
          <tr>
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Check-in Time:</td>
            <td style={{ padding: "5px 0" }}>{formatDateToIST(visitor.check_in_time)}</td>
          </tr>

          <tr>
           
            <td style={{ padding: "5px 0", fontWeight: "bold" }}>Check-out Time:</td>
            <td style={{ padding: "5px 0" }}>{visitor.check_out_time ? formatDateToIST(visitor.check_out_time) : "-"}</td>
          </tr>
          
        </tbody>
      </table>

      <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <p style={{ margin: "0", fontSize: "12px" }}>Visitor Details Page for view only.</p>
        <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>Please click the PRINT button to print slip.</p>
      </div>
    </div>

    {/* <div style={{ marginTop: "20px", fontSize: "12px", textAlign: "center" }}>
      <p>For security assistance, please call 555-123-4567</p>
    </div> */}
  </div>
)});

export default VisitorDetailsPopup