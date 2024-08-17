import { poolPromise } from "../config/database.config.js";

// Call a stored procedure with parameters
export const callStoredProcedure = async (procedureName, params = {}) => {
  try {
    const pool = await poolPromise; // Await the promise to get the pool instance
    const request = pool.request();

    // Add parameters to the request
    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });

    // Execute the stored procedure
    const result = await request.execute(procedureName);

    // Return the recordset
    return result.recordset;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `Error calling stored procedure '${procedureName}': ${err.message}`
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
