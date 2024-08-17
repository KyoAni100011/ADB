// Create: Adds data to localStorage
export function createItem(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value); // Convert object to JSON string
  }
  localStorage.setItem(key, value);
}

// Read: Retrieves data from localStorage
export function readItem(key) {
  const value = localStorage.getItem(key) || "";
  try {
    return JSON.parse(value); // Convert JSON string to object
  } catch (e) {
    return value; // Return as is if not a JSON string
  }
}

// Update: Modifies existing data in localStorage
export function updateItem(key, newValue) {
  const existingValue = localStorage.getItem(key);
  if (existingValue) {
    let existingObject;
    try {
      existingObject = JSON.parse(existingValue);
    } catch (e) {
      existingObject = existingValue; // Use existing value if not a JSON string
    }

    if (typeof newValue === "object") {
      newValue = JSON.stringify(newValue); // Convert object to JSON string
    }

    if (typeof existingObject === "object" && typeof newValue === "object") {
      Object.assign(existingObject, JSON.parse(newValue));
      newValue = JSON.stringify(existingObject);
    }

    localStorage.setItem(key, newValue);
  }
}

// Delete: Removes data from localStorage
export function deleteItem(key) {
  localStorage.removeItem(key);
}
