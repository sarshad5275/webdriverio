import ManagePasswords from '../utility/managepassword';

/*
Steps to use Encrypted Password:
run: 'npm run encrypt' command in terminal
get the encryptedPassword written to console log 
Open 'Edit Environment Variables' on windows/Mac and set the ENV variable with the encryptedPassword
Reopen the VSCode project
*/

describe('Encrypt Password', () => {
    it('Encrypt Password', async () => {
        ManagePasswords.encrypt("");
       // const decryr = managepassword.decrypt("enter the env variable here to decrypt it exg: process.env.NexPassword");
       // console.log("Decrypcted = " + decryr);
     });
});