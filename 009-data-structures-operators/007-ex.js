/*

  THIS TEST DATA (pasted to textarea)
  underscore_case
   first_name
  Some_Variable 
    calculate_AGE
  delayed_departure

  SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
  underscoreCase      ✅
  firstName           ✅✅
  someVariable        ✅✅✅
  calculateAge        ✅✅✅✅
  delayedDeparture    ✅✅✅✅✅

*/

const textArea = document.querySelector('.textToRead')
const button = document.querySelector('.btn')
const checkBox = ' ✅'

button.addEventListener('click', () => {
    const rows = textArea.value.split('\n')
    for (const [i, row] of rows.entries()) {
        const [first, second] = row.trim().toLowerCase().split('_')
        const part1 = first
        const part2 = second[0].toUpperCase()
        const part3 = second.slice(1)
        const output = part1 + part2 + part3
        console.log(`${output.padEnd(30)}${checkBox.repeat(i + 1)}`)
    }

    // for (const [index, varName] of finalArray.entries()) {
    //     console.log(varName.padEnd(30) + '    ' + checkBox.repeat(index + 1))
    // }
})

// const specialSplit = (text) => {
//     const varNames = text
//         .trim()
//         .toLowerCase()
//         .split('\n')
//         .map((element) => element.trim())
//         .map((element) => parse(element))
//     return varNames
// }
//
// const parse = (varName) => {
//     let index = varName.indexOf('_', 0)
//     let first = varName.slice(0, index)
//     let second = varName.slice(index + 1, index + 2)
//     let third = varName.slice(index + 2)
//     return `${first}${second.toUpperCase()}${third}`
// }
