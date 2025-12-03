import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// 静的ファイル配信
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../static")));

// プロキシAPI
app.get("/proxy", async (req,res)=>{
    const target = req.query.url;
    if(!target) return res.status(400).send("url query required");

    try {
        const response = await fetch(target);
        const text = await response.text();
        res.send(text);
    } catch(e) {
        res.status(500).send("Fetch failed: " + e.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
