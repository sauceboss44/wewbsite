async function fetchText(path) {
    let response = await fetch(path);
    let data = await response.text();
    let arr = data.split(/\r?\n/)
    return await arr
}
let firstNames = []
let lastNames = []
fetchText("../etc/names1.txt")
.then(data => console.log(data))
// firstNames = fetchText("../etc/names1.txt")
// lastNames = fetchText("../etc/names2.txt")
console.log(firstNames)
