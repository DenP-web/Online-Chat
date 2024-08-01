const sendMessage = async (req, res) => {

  try {
    const {id} = req.body
    const {message} = req.body

    const senderId = req.userId

   
  } catch (error) {
    console.log(`Error in sendMessage controller: ${error.message}`)
    res.status(500).json({error: 'Internal Server Error'})
  }

};

module.exports = {
  sendMessage,
};
