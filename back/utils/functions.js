const removeAccents = (str) => {
    const result = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toString();
    return result;
}

const createDefaultUsername = (lastname, name) => {
    let newLastname = removeAccents(lastname.toLowerCase()).split(" ");
    newLastname = newLastname[newLastname.length-1];
    let newName = removeAccents(name.toLowerCase()).split(" ")[0];    
    const defaultUsername = newLastname+"_"+newName;

    return defaultUsername;
}

exports.removeAccents = removeAccents;
exports.createDefaultUsername = createDefaultUsername;
