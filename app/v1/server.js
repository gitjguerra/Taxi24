import startupDebugger from "debug";
import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>
  res.json({ message: `Servidor escuchando por el puerto ${port}` })
);
app.use("/api/v1", routes);

const debug = startupDebugger("minutes:start");
app.listen(port, () => debug(`Escuchando por el puerto: ${port}`));