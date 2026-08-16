//purpose of this file is to check wheather the backend is alive or not

import express from "express";

const router=express.Router();

router.get("/",(req,res)=>{
    res.json({//This sends JSON back to whoever made the request.
        status:"ok",
        message:"TrackYour backend is running"
    });
});

export default router;