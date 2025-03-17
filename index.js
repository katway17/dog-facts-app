import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
      const response = await axios.get("https://dogapi.dog/api/v2/facts");
      
      console.log("🐶 Full API Response:", JSON.stringify(response.data, null, 2)); // Log full API response
      
      // Extract the dog facts safely
      const facts = response.data.data?.map(fact => fact.attributes?.body) || [];

      console.log("✅ Extracted Facts:", facts); // Log extracted facts

      res.render("index.ejs", { facts });
  } catch (error) {
      console.error("❌ Error fetching dog facts:", error.message);
      res.render("index.ejs", { facts: ["We couldn't fetch any dog facts. Try again later!"] });
  }
});

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  