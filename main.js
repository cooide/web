var a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]];
var b = [];
for (var j = 0; j < a[0].length; j++) {
    b[j] = [];
    for (var i = 0; i < a.length; i++) {

        b[j][i] = a[i][j];
    }

}
for (var i = 0; i < b.length; i++) {
    for (var j = 0; j < b[i].length; j++) {
        document.writeln(b[i][j]);
    }
    document.writeln("<br/>");
} 