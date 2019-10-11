let inMemoryWorkshop = []


function getWorkshopList() {
    return new Promise((resolve, ) => {
        resolve(inMemoryWorkshop)
    })
}

function getWorkshopByName(name) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("name parameter is required"))
        }
        resolve(inMemoryWorkshop.find(workshop => workshop.name === workshop))
    })
}

function addWorkshop(name, description) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("Workshop name required"))
        }
        if (!description) {
            reject(new Error("Workshop description required"))
        }
        inMemoryWorkshop.push({
            name,
            description
        })
        resolve()
    })
}

function findIndex(name) {
    let index = -1;
    for(let i = 0; i<inMemoryWorkshop.length;i++){
        if(inMemoryWorkshop[i].name === name){
            index = i;
        }
    }
    return index;
}

function removeWorkshop(name) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("Workshop name required"))
        }
        let index = findIndex(name)
        if (index != -1) {
            inMemoryWorkshop.splice(index,1)
        }
        resolve()
    })
}

function updateWorkshop(name, description) {
    return new Promise((resolve, reject) => {
        let index = findIndex(name)
        if (index === -1) {
            reject(new Error("Workshop must exist to be edited"))
        }
        removeWorkshop(name)
        addWorkshop(name, description)
        resolve()
    })
}

module.exports = {
    getWorkshopList,
    getWorkshopByName,
    addWorkshop,
    removeWorkshop,
    updateWorkshop
}