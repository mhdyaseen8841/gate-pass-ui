  export const formatDateToIST = (dateStr) => {
        // Convert the date string to a Date object (UTC time)
        const date = new Date(dateStr);
      
        // Extract date components
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = date.getUTCFullYear();
      
        // Get the hours, minutes, and seconds in UTC 24-hour format
        let hours = date.getUTCHours();
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      
        // Determine AM/PM and convert hours to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;  // Convert to 12-hour format
        hours = hours === 0 ? 12 : hours; // The hour '0' should be '12' in 12-hour format
      
        // Return the formatted date and time with AM/PM in UTC
        return `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
      };
      