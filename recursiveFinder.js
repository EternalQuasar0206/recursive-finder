import { compare } from "./lib/recursiveComparator.js"

function recursiveFind(object, target, count = 0, found = false) { 
    if(typeof target == 'object') {
        if(compare(object, target)) {
            found = true;
            count++;
        }
        switch(target.constructor.name) {
            case "Array":
                const len = target.length;
                for(let i = 0; i < len; i++) {
                    const res = recursiveFind(object, target[i]);
                    count += res.count;
                    if(!found) found = res.found;
                }
                break;

            case "Object":
                const entries = Object.entries(target);
                const lenObj = entries.length;
                for(let i = 0; i < lenObj; i++) {
                    const res = recursiveFind(object, entries[i][1]);
                    count += res.count;
                    if(!found) found = res.found;
                }
                break;
            
            case "Map":
                for (let [key, value] of target) {
                    const res = recursiveFind(object, value);
                    count += res.count;
                    if(!found) found = res.found;
                }
                break;

            case "Set":
                for (let element of target) {
                    const res = recursiveFind(object, element);
                    count += res.count;
                    if(!found) found = res.found;
                }
                break;
            
            default:
                if(compare(object, target)) {
                    count++;
                    found = true;
                }
        }
    }
    else {
        if(compare(object, target)) {
            count++;
            found = true;
        }
    }
    return {
        count,
        found
    };
}

window.recursiveFind = recursiveFind;
