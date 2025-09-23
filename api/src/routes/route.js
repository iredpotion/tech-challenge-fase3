import express from "express";
import posts from "./postRoutes.js";
import authRoutes from "./authRoutes.js";

const routes = (app) => {
    app.route("/").get((req,res)=> res.status(200).send("API DE POSTS!"))

    app.use(express.json(),posts)
    app.use(express.json(), authRoutes);
};

export default routes;