import Cryptr from "cryptr";

//commented this line as we are not using in exisitng framework
//const bcrypt = require('bcryptjs');

class ManagePasswords {
    encrypt = (password) => {
        var cryptr = new Cryptr("JSAutomation");
        var encstring = cryptr.encrypt(password);
        console.log("Encrypted Password = " + encstring);
    }

    decrypt(encryptedString) {
        var cryptr = new Cryptr("JSAutomation");
        var decryptstring = cryptr.decrypt(encryptedString);
        return decryptstring;
    }

//commented this line as we are not using in exisitng framework
//     encryptUsingBcrypt = async (text) => {
//          generate salt to hash password
//        const salt = await bcrypt.genSalt(10);
//         now we set user password to hashed password
//         const secret = await bcrypt.hash(text, salt);
//        console.log(" Hashed Password = " + secret);
//        console.log(" SALT = " + salt);
//     }

    compare = async (password, hash) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
              console.error("Error occured while compareing the passwords. " + err);
              return
            }
            console.log("Password compare is sucessful. result = " + res); //true or false
          }) 
    };

}

export default new ManagePasswords();



