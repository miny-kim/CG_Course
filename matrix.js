var resButtonNode = document.querySelector("#btn1");


resButtonNode.addEventListener("click", function() {
    var matrix_row = [];

    var ind = 0;

    $("#a_matrix").contents().each(function(i, e) {
        if (this.nodeName == "input") {
            (!matrix_row[ind]) {
                matrix_row.push([]);
            }
            matrix_row[ind].push($(this).val());
        } else {
            ind++;
        }
    });
    var mul = [];
    var len = a.length;
    for (i = 0; i < len; i++) {
        var row = [];
        for (j = 0; j < len; j++) {
            var x = 0;
            for (k = 0; k < len; k++) x += a[i][k] * b[k][j];
            row.push(x);
        }
        mul.push(row);
    }
    document.querySelector("#res"), innerHTML = mul;

})


var countTime = function() {
    n_time = Math.floor(new Date().getTime());
    var s_Time = Math.floor((n_time - b_time) / 1000);
    var h_Time = Math.floor((n_time - b_time) / 3600 / 1000);
    var m_Time = Math.floor((n_time - b_time) / 60 / 1000);
    if (s_Time < 60) {
        h_Time = 0;
        m_Time = 0;
    } else if (m_Time < 60) {
        h_Time = 0;
        s_Time %= 60;
    } else {
        m_Time %= 60;
        s_Time %= 60;
    }

    document.querySelector("#ftr").innerHTML = h_Time + ":" + m_Time + ":" + s_Time;

}

function textCountFunc() {
    tadd();
    document.querySelector("#C1").innerHTML = "Number of Text Memo" + tcounter;
}



function imgCountFunc() {
    iadd();
    document.querySelector("#D1").innerHTML = "Number of Image Memo" + icounter;
}

function matrixMultiplication(a, b) {
    var mul = [];
    var len = a.length;
    for (i = 0; i < len; i++) {
        var row = [];
        for (j = 0; j < len; j++) {
            var x = 0;
            for (k = 0; k < len; k++) x += a[i][k] * b[k][j];
            row.push(x);
        }
        mul.push(row);
    }
    return mul;
}


delButtonNode.addEventListener("click", function() {
    var parentSec = document.querySelector("#parentSec");
    parentSec.innerHTML = '';
})