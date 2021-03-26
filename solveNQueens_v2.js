// N-Queen I / Hard 
// link: https://leetcode.com/problems/n-queens/submissions/
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    if(n === 1) return [["Q"]];
    if(n === 2 || n === 3) return [];

    let r = [];

    placeQueen(r, n);

    return r;
};

let placeQueen = (result ,size , place = [] , row = 0)=>{
    if(row === size){
        parsingResult(result,place);
        return;
    };

    for(let col1 = 0 ; col1 < size ; col1++){
        if(isPlaceValid(place,col1,row)){
            place.push(col1);
            placeQueen(result,size,place,row+1);
            place.pop();
        };
    };


};

let isPlaceValid = (place,col1,row1) =>{


    for(let checkRow = 0 ; checkRow< place.length ; checkRow++){
        if(col1 === place[checkRow]) return false;

        let colDiff = Math.abs(place[checkRow] - col1);
        let rowDiff = Math.abs(checkRow - row1);
        if(colDiff === rowDiff) return false;
    };

    return true;
};


let parsingResult = (r,p)=>{

    let len = p.length;
    r.push(p.map(v=>{
        let r2 = ".".repeat(len);
        return r2.substr(0,v) +"Q"+ r2.substr(v+1);
    }));
};


let r = solveNQueens(12);
console.log(r);