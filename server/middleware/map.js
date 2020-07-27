let mapArray = new Array();

function saveUserInfo(token, succesfolLoginDetails) {
    let userInformatiom = {
        key: token,
        value: succesfolLoginDetails,
    };

    mapArray.push(userInformatiom);
 
    
    return mapArray;
};

function checkMapForUserId(token) {
    let userId;
   
    for (let index = 0; index < mapArray.length; index++) {

        if (token == "Bearer" + " " + mapArray[index].key) {
            userId = mapArray[index].value.id;
      
        };
    };
    return userId;
};


module.exports = { saveUserInfo, checkMapForUserId }