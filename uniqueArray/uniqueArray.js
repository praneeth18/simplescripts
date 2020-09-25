var v = [1, 2, 2, 3, 7, 4545, 4545, 7, 5, 4, 6];

var unique = [];

//HARD WAY 
var unique = [];

for (var index = 0; index < v.length; index++) {

    if (unique.length > 0) {
        var hasEqual = false;
        for (var i = 0; i < unique.length; i++) {
            if (v[index] === unique[i]) {
                hasEqual = true;
            }
        }
        if (!hasEqual) {
            unique.push(v[index]);
        }

    } else {
        unique.push(v[index]);
    }
}

console.log(unique);


//EASY WAY

var unique = v.filter(function(v, i, a) {
    return a.indexOf(v) === i;
});

console.log(unique);

//ES6 WAY

var unique = [...new Set(v)];

console.log(unique)

//TEST

// ADDING SOMETHING