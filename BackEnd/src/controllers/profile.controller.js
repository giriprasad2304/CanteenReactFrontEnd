const userModel = require("../models/user.model")


async function getProfile(req, res) {
    try {
        const profile = await userModel.findById(req.user.id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            profile: profile
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { getProfile }