import { Router } from "express";

const router = Router();

router.get("/upload", (req, res) => res.json({ data: "hello world!" }));

export default router;
