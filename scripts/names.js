

async function textToArray(path) {
  let request = await fetch(path)
  let data = await request.text()
  return data.split(/\r?\n/)
}

let names1 = await textToArray("../etc/names1.txt")
let names2 = await textToArray("../etc/names2.txt")

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateName(){
  let prefix = names1[Math.floor(Math.random()*10)]
  prefix = prefix.concat(" ")
  let suffix = names2[Math.floor(Math.random()*10)]
  let name = capitalizeFirstLetter(prefix).concat(capitalizeFirstLetter(suffix))
  document.getElementById("blank").textContent = name
  console.log("ABCS")
}

generateName()
document.getElementById("retry").addEventListener("click", generateName)
