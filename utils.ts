import * as fs from "fs";
export const USER_DATA = {
  Password: "new1",
  Username: "new1",
  Url: "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC",
  LoginUrl: "https://parabank.parasoft.com/parabank/overview.htm",
  BASE_URL: "https://jsonplaceholder.typicode.com",
  API_URL: "https://parabank.parasoft.com/parabank/login.htm",
  UI_URL: "https://parabank.parasoft.com/parabank",
};

function readJsonFile(filePath: string): any {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
    return null;
  }
}

export default readJsonFile;
