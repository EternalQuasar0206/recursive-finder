/*
    recursiveFind v1.0.0 [Alpha] - 11/2021
    (C) 2021 Kayky Vitor Cruz
    Variable find algorithm focused in searching recursively any type of JavaScript object in order to 
    find what you are looking for. Returns an object with the result and the number of instances. 
    This code is licensed under Public Domain (CC0).
*/

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
                for (let x of target) {
                    const res = recursiveFind(object, x);
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