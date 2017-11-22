var arr = [ 
    // { name:'London', population:'7000000' },
    // { name:'Munich', population:'1000000' }

    {macAddress: 'e9:85:a4:34:d0:2a',answer: '1'},
    {macAddress: 'f2:c5:da:51:a5:e8',answer: '1'},
]

var addNewElement = function(arr, newElement) {
    var found = false;
    for(var i=0; element=arr[i]; i++) {
        if(element.macAddress == newElement.macAddress) {
            found = true;
            // if(newElement.population === 0) {
            //     arr[i] = false;
            // } else {
            //     arr[i] = newElement;
            // }            
        }
    }
    if(found === false) {
        arr.push(newElement);
    }
    // removing elements
    var newArr = [];
    for(var i=0; element=arr[i]; i++) {
        if(element !== false) newArr.push(element);
    }
    return newArr;
}

console.log(arr);
console.log('-----------------------------------');
arr = addNewElement(arr, {macAddress: 'f2:c5:da:51:a5:e8',answer: '2'});
console.log(arr);
console.log('-----------------------------------');
// arr = addNewElement(arr, {name: 'Paris', population: '60000000'});
// console.log(arr);
// console.log('-----------------------------------');
// arr = addNewElement(arr, {name: 'Paris', population: 0});
// console.log(arr);
// console.log('-----------------------------------');