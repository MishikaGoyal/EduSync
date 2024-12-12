export const aggregateSchoolData = (data) => {
    const result = {};
  
    data.forEach((school) => {
      const state = school.State;
      const resultType = school.Result; // "ODD" or "STANDARD"
  
      if (!result[state]) {
        result[state] = { ODD: 0, STANDARD: 0 };
      }
  
      if (resultType === "ODD") {
        result[state].ODD += 1;
      } else {
        result[state].STANDARD += 1;
      }
    });
  
    return result;
  };
  