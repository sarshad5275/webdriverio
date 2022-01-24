import Cryptr from "cryptr";

class ManagePasswords {

    encrypt = (password) => {
        var cryptr = new Cryptr("JSAutomation");    
        var encstring = cryptr.encrypt(password);
        console.log("Encrypted Password = " + encstring) ;       
    }
    
    decrypt(encryptedString) {   
        var cryptr = new Cryptr("JSAutomation");    
        var decryptstring = cryptr.decrypt(encryptedString);    
        return decryptstring;
    }
}

export default new ManagePasswords();



