const uniqid = require('uniqid'); 

/**
 * 
 * @returns Generated Id for product Item
 */
exports.generateSKUID = async ()=>{

    var id_2 = Math.floor(10 + Math.random() * 90); /**generate 2 digit random number  */

    var final = "#CA" + id_2;

    return final;
}

