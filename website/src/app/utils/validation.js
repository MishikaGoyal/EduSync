export const validateQuantity = (type, value) => {
    // Remove any commas and spaces from the input
    const cleanValue = value.replace(/,|\s/g, '');
    
    // Check if the value is empty
    if (!cleanValue) {
      return { isValid: false, error: 'Quantity is required' };
    }
  
    // For monetary values (grants)
    if (type.toLowerCase().includes('grant')) {
      const amount = Number(cleanValue);
      if (isNaN(amount) || amount <= 0) {
        return { isValid: false, error: 'Please enter a valid amount' };
      }
      // Format the amount with commas
      return { 
        isValid: true, 
        value: amount.toLocaleString('en-IN', { 
          maximumFractionDigits: 0,
          style: 'currency',
          currency: 'INR'
        })
      };
    }
  
    // For personnel requests
    if (type.toLowerCase().includes('teacher')) {
      const persons = Number(cleanValue);
      if (!Number.isInteger(persons) || persons <= 0) {
        return { isValid: false, error: 'Please enter a valid number of persons' };
      }
      return { 
        isValid: true, 
        value: persons === 1 ? '1 person' : `${persons} persons`
      };
    }
  
    // For equipment and books (must be whole numbers)
    const units = Number(cleanValue);
    if (!Number.isInteger(units) || units <= 0) {
      return { isValid: false, error: 'Please enter a valid quantity' };
    }
    return { isValid: true, value: units.toString() };
  };