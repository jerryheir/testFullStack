export const findWithAttr = (array: Array<any>, attr: any, value: any) => {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}