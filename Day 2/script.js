
// Day 2 Part 1

// fetch('inputData.txt')
//   .then(response => response.text())
//   .then(data => {

//     const reports = data.trim().split('\n').map(line => line.split(" ").map(Number));
  
//     let safeReports = 0; 

//     reports.forEach(report => {

//       const ascendingReport = report.slice().sort((a, b) => a - b);
//       const descendingReport = report.slice().sort((a, b) => b - a);

//       const areArraysEqual = (arr1, arr2) => 
//         arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
      
      
//       const areLevelsWithinSafeRange = (report) => {
//         for (let i = 0; i < report.length - 1; i++) {
//           const levelDifference = Math.abs(report[i] - report[i + 1]);
//           if (levelDifference < 1 || levelDifference > 3) {
//             return false;
//           }
//         }
//         return true; 
//       };
      
//       if (areArraysEqual(report, ascendingReport) || areArraysEqual(report, descendingReport)) {
//         if (areLevelsWithinSafeRange(report)) {
//           safeReports += 1
//         }
//       } 
//     })
//     console.log(safeReports)
//   })
//   .catch(error => console.error('Error loading file:', error));


// Day 2 Part 2

fetch('inputData.txt')
  .then(response => response.text())
  .then(data => {
    const reports = data.trim().split('\n').map(line => line.split(" ").map(Number));

    let safeReports = 0;

    const isSafe = (report) => {
        const differences = [];

        for (let i = 1; i < report.length; i++) {
            differences.push(report[i] - report[i - 1]);
        }

        const increasing = differences.every((d) => d >= 1 && d <= 3);
        const decreasing = differences.every((d) => d <= -1 && d >= -3);
        
        console.log(increasing)
        return increasing || decreasing;
    }

    reports.forEach(report => {
        let tolerable = false;

        for (let i = 0; i < report.length; i++){
            const removed = report.toSpliced(i, 1);

            if (isSafe(removed)) {
                tolerable = true;
                break;
            }
        }

        if (isSafe(report) || tolerable) safeReports++;
        
    })
    console.log(safeReports)
})
  .catch(error => console.error('Error loading file:', error));
