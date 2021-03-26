// N-Queen I / Hard 
// link: https://leetcode.com/problems/n-queens/submissions/
// 慣性式思考 , 落子一次 , 想記住全部棋盤結果     --> 不佳
// 應拆成 一個 row 一個 row , 每次一條去搜尋比較 --> 好！
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    if(n === 1) return [["Q"]];
    if(n === 2 || n === 3) return [];

    let s = [];
    
    for(let i =0 ; i<n ; i++){
        s.push( new Array(n).fill(0).map(v=>{
            let o = {};
            new Array(n).fill(0).map((k,j)=>{
                o[j] = 0;
            });
            return o;
        }));
    };

    let d1  = new Array(Math.ceil(n/2)).fill(0).map((v,i)=>([0,i]));

    let l = 0 ,  cnt = 0 ;
    let tmp = {};
    let final = new Array(n).fill(null);

    let dynamicGetNextPoint = (data)=>{
        
        for(let j =0 ; j <data.length ; j++){

            // 前置
            let d = data[j];
            tmp[l] = d;
            let isFinalCase = j === data.length -1;

            // 判斷點 + 產生下一個 snapShot 
            s[l+1] = occupy(d,s[l]);
            
            let { allOut , rowOut }  = getSpacePoint(s[l+1],l);

            // 剩餘棋子數
            let restLen = n-l-1;

            // kk case - 剩餘一個空白點 + 僅剩一顆棋
            if(allOut.length === restLen && restLen === 1){

                // d  --> [i,j]
                // allOut --> [ [i,j] , [i2,j2] , ... ]

                final[cnt] = [];
                Object.keys(tmp).map(k=>final[cnt][tmp[k][0]] = Number(tmp[k][1]));
                final[cnt][allOut[0][0]] = Number(allOut[0][1]);

                cnt++;
                return true;
            };

            // 爛 case - 空白點 < 剩餘棋數
            if(allOut.length < restLen){
                if(isFinalCase) return;
                continue;
            };

            // 進下一層
            l += 1;

            dynamicGetNextPoint(rowOut);

            tmp[l] = null;

            l -= 1;

        };

        // 全然的失敗 , 只好 return false 
        tmp[l] = null;
        return;
    };
    


    dynamicGetNextPoint(d1);

    final  = final.filter(ele => ele);

    let out = final.length>0 ? final : [];

    out = parsingAnswer(out);
    
    return out;
  
    
};

let getSpacePoint = (snapShot,level)=>{ 
    
    // snapShot : [ {} , {} , {} , ...]
    // out : [ [0,2] , [0,3] , ...]
    let allOut = [] , rowOut = [] ;

    snapShot.map((ele,i)=>{
        Object.keys(ele).map(k=>{
            if(ele[k] === 0) allOut.push([i,k]);
            if(i === level+1 && ele[k] === 0) rowOut.push([i,k]);
        });
    });

    return { allOut , rowOut};

};

let isUndefined = v => v === undefined;

let occupy = (d,s)=>{
    let out = s.map(ele => Object.assign({},ele));
    
    let [x,y] = d;
    y = Number(y);

    out[x][y] = 1;

    for(let i = 0 ; i<8;i++){
        let step = 1;
        while(true){
            if(i === 0 ){
                if(isUndefined(out[x-step])) break;
                else{
                    out[x-step][y] = 1;
                    step++;
                };
            };

            if(i === 1 ){
                if(isUndefined(out[x-step]) || isUndefined(out[x-step][y+step])) break;
                else{
                    out[x-step][y+step] = 1;
                    step++;
                };
                
            };
            if(i === 2 ){
                if(isUndefined(out[x][y+step])) break;
                else{
                    out[x][y+step] = 1;
                    step++;
                };
            };

            if(i === 3 ){
                if(isUndefined(out[x+step]) || isUndefined(out[x+step][y+step])) break;
                else{
                    out[x+step][y+step] = 1;
                    step++;
                };
            };

            if(i === 4 ){
                if(isUndefined(out[x+step])) break;
                else{
                    out[x+step][y] = 1;
                    step++;
                };
            };

            if(i === 5 ){
                if(isUndefined(out[x+step]) || isUndefined(out[x+step][y-step])) break;
                else{
                    out[x+step][y-step] = 1;
                    step++;
                };
            };

            if(i === 6 ){
                if(isUndefined(out[x][y-step])) break;
                else{
                    out[x][y-step] = 1;
                    step++;
                };
            };

            if(i === 7 ){
                if(isUndefined(out[x-step]) || isUndefined(out[x-step][y-step])) break;
                else{
                    out[x-step][y-step] = 1;
                    step++;
                };
            }
            
        }
    };

    return out;

};

let parsingAnswer = (out)=>{
    

    let result = [];

    // reverse + 鏡射
    out.map(ele=>{
        let len = ele.length;
        result.push(
            ele.map(v=>v),
            ele.map(v=>v).reverse(),
            ele.map(v=> len-1-v),
            ele.map(v=> len-1-v).reverse()
        );
    });

    result = Array.from(new Set(result.map(l=>l.join("_")))).map(s=>s.split("_"));

    return result.map(ele=>{

        let len = ele.length;
        return ele.map(i=>{
            let p = new Array(len).fill(".");
            p[i] = "Q";
            return p.join("");
        });
    })

};

let r = solveNQueens(10);
console.log(r);
