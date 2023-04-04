// tham chiếu thư viện
const mongoose = require('mongoose')
//link kết nối database
const URL = "mongodb+srv://quangvt5:Qvt29092001.@cluster0.k0fqybm.mongodb.net/test?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB()
