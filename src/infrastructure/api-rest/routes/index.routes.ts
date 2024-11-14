import Express from "express";

export const routes = () => {
    const router = Express.Router();

    router.get("/api/v1", (req, res) => {
        res.send("Hello world");
    })
    
    return router;
}