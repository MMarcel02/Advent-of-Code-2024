
// Day 1 Part 1

// fetch('inputData.txt')
//   .then(response => response.text())
//   .then(data => {
//     const lines = data.trim().split('\n')

//     const leftArray = [];
//     const rightArray = [];
//     let totalDifference = 0;

//     lines.forEach(line => {
//       const [left, right] = line.trim().split(/\s+/).map(Number)
//       leftArray.push(left);
//       rightArray.push(right);
//     })

//     leftArray.sort((a, b) => a - b);
//     rightArray.sort((a, b) => a - b);

//     for (let i = 0; i < leftArray.length; i++) {
//       const difference = Math.abs(leftArray[i] - rightArray[i]);
//       totalDifference += difference
//     }
//     console.log(totalDifference)
//   })
//   .catch(error => console.error('Error loading file:', error));


// Day 2 Part 2

fetch('inputData.txt')
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split('\n')

    const leftArray = [];
    const rightArray = [];
    let totalSimilarityScore = 0;

    lines.forEach(line => {
      const [left, right] = line.trim().split(/\s+/).map(Number)
      leftArray.push(left);
      rightArray.push(right);
    })

    leftArray.sort((a, b) => a - b);
    rightArray.sort((a, b) => a - b);

    for (let i = 0; i < leftArray.length; i++) {
      const totalMatches = rightArray.filter(n => n === leftArray[i]).length;
      const similarityScore = totalMatches*leftArray[i]
      totalSimilarityScore += similarityScore
    }

    console.log(totalSimilarityScore)
  })
  .catch(error => console.error('Error loading file:', error));