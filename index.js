import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://dog-api.kinduff.com/api/facts");
      const facts = response.data.facts; // API returns an array of fact objects
      res.render("index.ejs", { facts });
    } catch (error) {
        console.error("Error fetching dog facts:", error.message);
        res.render("index.ejs", { facts: ["We couldn't fetch any dog facts. Try again later!"] });
      }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  