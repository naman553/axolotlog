import express from "express"
const router = express.Router()

import signup from "../controllers/auth/signup.controller.js"
import signin from "../controllers/auth/signin.controller.js"

router.post("/signup", signup)
router.post("/signin", signin)

export default router