const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique :true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre("save",async function () {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
});

userSchema.methods.comparePassword = function(inputPassword){
    return bcrypt.compare(inputPassword,this.password);
};

module.exports = mongoose.model('User',userSchema);
