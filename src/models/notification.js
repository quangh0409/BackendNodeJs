const mongoose = require("mongoose");

const { Schema } = mongoose;

const action = mongoose.model('actions')

const notificationSchema = new Schema({
    action: {
        type: action
    }
    
})
