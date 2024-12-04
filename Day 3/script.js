
// Day 3 Part 1

// fetch('inputData.txt')
//   .then(response => response.text())
//   .then(data => {

//     const mulRegex = /mul\(\d+,\s*\d+\)/g;
    
//     const mulMatches = data.match(mulRegex)
//     if (mulMatches) {
//         const arrayOfMuls = mulMatches.map(mulMatch => {
//             const numberRegex = /mul\((\d+),\s*(\d+)\)/;
//             const [, num1, num2] = mulMatch.match(numberRegex)
//             const product = parseInt(num1) * parseInt(num2);
//             return product
//         })
//         const sumOfArray = arrayOfMuls.reduce(
//             (accumulator, currentValue) => accumulator + currentValue
//         );
//         console.log(sumOfArray)

//     }

//   })
//   .catch(error => console.error('Error loading file:', error));


// Day 3 Part 2


fetch('inputData.txt')
  .then(response => response.text())
  .then(data => {
    const mulRegex = /mul\(\d+,\d+\)/g;
    const doRegex = /do\(\)/g;
    const dontRegex = /don't\(\)/g;

    let shouldYouMultiply = true;
    let arrayOfMuls = [];
    let position = 0;

    while (position < data.length) {
      // Find the first match of any of the three patterns
      const doIndex = data.slice(position).search(doRegex);
      const dontIndex = data.slice(position).search(dontRegex);
      const mulIndex = data.slice(position).search(mulRegex);

      // Determine the closest match
      let closestMatch = Infinity;
      let matchType = null;

      if (doIndex !== -1 && doIndex < closestMatch) {
        closestMatch = doIndex;
        matchType = 'do';
      }
      if (dontIndex !== -1 && dontIndex < closestMatch) {
        closestMatch = dontIndex;
        matchType = 'dont';
      }
      if (mulIndex !== -1 && mulIndex < closestMatch) {
        closestMatch = mulIndex;
        matchType = 'mul';
      }

      // Process the match
      if (matchType === 'do') {
        shouldYouMultiply = true;
        position += closestMatch + 4; // "do()" has length 4
      } else if (matchType === 'dont') {
        shouldYouMultiply = false;
        position += closestMatch + 7; // "don't()" has length 7
      } else if (matchType === 'mul') {
        if (shouldYouMultiply) {
          const numberRegex = /mul\((\d+),\s*(\d+)\)/;
          const [, num1, num2] = data.slice(position + closestMatch).match(numberRegex);
          const product = parseInt(num1) * parseInt(num2);
          arrayOfMuls.push(product);
        }
        // Advance position past the `mul(...)`
        const mulLength = data.slice(position + closestMatch).match(mulRegex)[0].length;
        position += closestMatch + mulLength;
      } else {
        // No match, move to the next character
        position++;
      }
    }

    const sumOfArray = arrayOfMuls.reduce((acc, val) => acc + val, 0);
    console.log("Sum of Multiplications:", sumOfArray);
  });


