const crypto = require('crypto');

function genPassword(password) {
    // salt = pseudorandom value, add randmoness at the generation of the hash
    var salt = crypto.randomBytes(32).toString('hex');
    //password = plaintext passw, pdk...= method of the crypto library, 10000 iterations, 64 how long the hash will be,
    // sha512 = hash function, and finally we are converting this to a hexadecimal string
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}
// we are creating the same thing except this time we are passing the hash salt as a argument from the db
//verificate that the password writted and the password is the same
function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;