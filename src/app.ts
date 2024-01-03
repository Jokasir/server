import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rootRoutes from "./routes"
import path from "path";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api',rootRoutes)
app.use(errorHandler)

app.use(
  "/public",
  express.static(path.join(process.cwd(), "public", "uploads", "product"))
);


app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
  }) 