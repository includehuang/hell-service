const arr1 = ['a', 'b', 'c', 'd', 'e']
const arr2 = ['c', 'd', 'e', 'g', 'h']
const arr3 = ['i', 'j', 'k', 'l', 'o']

function bySet(a, b) {
    const arr = new Set([...a, ...b])
    return a.length + b.length === arr.size
}

function byObj(a, b) {

}

console.log(bySet(arr1, arr2))
console.log(bySet(arr3, arr2))