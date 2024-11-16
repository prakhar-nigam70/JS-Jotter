import express from "express";
import fs from "fs/promises";
import path from "path";
import { introCellsData } from "../utility/introCellsData";

interface Cell {
  id: string;
  content: string;
  type: "code" | "text";
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === "string";
    };
    try {
      const data = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(data));
    } catch (err) {
      if (isLocalApiError(err)) {
        // If it does not exists, add in default list of cells
        if (err.code === "ENOENT") {
          await fs.writeFile(fullPath, JSON.stringify(introCellsData), "utf-8");
          res.send([]);
        }
      } else {
        throw err;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    res.send({ status: "ok" });
  });

  return router;
};
