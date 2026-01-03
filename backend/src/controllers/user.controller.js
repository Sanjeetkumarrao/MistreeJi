const registerUser = (req, res) => {
    res.status(500).json({
        message: 'Ok'
    })
}
const loginUser = (req, res) => {
    res.send(`Server is running at 1232343 sk`);
}

export {
    registerUser,
    loginUser
}