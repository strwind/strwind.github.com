
//关闭列表
var closelist = [];
//开发列表
var openlist = [];
var gw = 10;
var gh = 10;
var gwh = 14;
//起始点
var p_start = new Array(2);
//终点
var p_end = new Array(2);

var s_path, n_path = "";
var num, bg, flag = 0;
//x轴个数
var w = 20;
//y轴个数
var h = 10;

function GetRound(pos) {
    var arr = [];
    var x = pos[0];
    var y = pos[1];
    arr[0] = [x + 1, y];
    arr[1] = [x, y + 1];
    arr[2] = [x - 1, y];
    arr[3] = [x, y - 1];
    return arr;
}
function GetF(arr) {
    var G, H, F;
    for (var i = 0, len = arr.length; i < len; i++) {
        var point = arr[i];
        var x = point[0];
        var y = point[1];
        if (isOutScreen([x, y]) || IsPass(arr[i]) 
            || InClose([x, y]) || IsStart([x, y]) 
            || !IsInTurn([x, y])) {
            continue;
        }
        if ((x - s_path[3][0]) * (y - s_path[3][1]) !== 0) {
            G = s_path[1] + gwh;
        } 
        else {
            G = s_path[1] + gw;
        } 
        if (InOpen([x, y])) {
            if (G < openlist[num][1]) {
                openlist[num][0] = (G + openlist[num][2]);
                openlist[num][1] = G;
                openlist[num][4] = s_path[3];
            } else {
                G = openlist[num][1];
            }
        } else {
            H = (Math.abs(p_end[0] - x) + Math.abs(p_end[1] - y)) * gw;
            F = G + H;
            arr[i] = new Array();
            arr[i][0] = F;
            arr[i][1] = G;
            arr[i][2] = H;
            arr[i][3] = [x, y];
            arr[i][4] = s_path[3];
            openlist[openlist.length] = arr[i];
        }
        if (maptt.rows[y].cells[x].style.backgroundColor != "#cccccc" && maptt.rows[y].cells[x].style.backgroundColor != "#0000ff" && maptt.rows[y].cells[x].style.backgroundColor != "#ff0000" && maptt.rows[y].cells[x].style.backgroundColor != "#00ff00") {
            maptt.rows[y].cells[x].style.backgroundColor = "#FF00FF";
            //maptt.rows[y].cells[x].innerHTML="<font color=white>"+G+"</font>";
        }
    }
}
function IsStart(arr) {
    if (arr[0] == p_start[0] && arr[1] == p_start[1]) return true;
    return false;
}
function IsInTurn(arr) {
    if (arr[0] > s_path[3][0]) {
        if (arr[1] > s_path[3][1]) {
            if (IsPass((arr[0] - 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] - 1))) return false;
        } else if (arr[1] < s_path[3][1]) {
            if (IsPass((arr[0] - 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] + 1))) return false;
        }
    } else if (arr[0] < s_path[3][0]) {
        if (arr[1] > s_path[3][1]) {
            if (IsPass((arr[0] + 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] - 1))) return false;
        } else if (arr[1] < s_path[3][1]) {
            if (IsPass((arr[0] + 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] + 1))) return false;
        }
    }
    return true;
}
/**
 * 是否在屏外 
 * @param {Object} arr
 */
function isOutScreen(arr) {
    if (arr[0] < 0 || arr[1] < 0 || arr[0] > (w - 1) || arr[1] > (h - 1)) return true;
    return false;
}
function InOpen(arr) {
    var bool = false;
    for (var i = 0; i < openlist.length; i++) {
        if (arr[0] == openlist[i][3][0] && arr[1] == openlist[i][3][1]) {
            bool = true;
            num = i;
            break;
        }
    }
    return bool;
}
function InClose(arr) {
    var bool = false;
    for (var i = 0; i < closelist.length; i++) {
        if ((arr[0] == closelist[i][3][0]) && (arr[1] == closelist[i][3][1])) {
            bool = true;
            break;
        }
    }
    return bool;
}
function IsPass(pos) {
    if ((";" + n_path + ";").indexOf(";" + pos + ";") != -1) return true;
    return false;
}
function Sort(arr) {
    var temp;
    for (var i = 0; i < arr.length; i++) {
        if (arr.length == 1) break;
        if (arr[i][0] <= arr[i + 1][0]) {
            temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
        if ((i + 1) == (arr.length - 1)) break;
    }
}
function main() {
    GetF(GetRound(s_path[3]));
    Sort(openlist);
    s_path = openlist[openlist.length - 1];
    closelist[closelist.length] = s_path;
    openlist[openlist.length - 1] = null;
    if (openlist.length == 0) {
        alert("找不到路径");
        return;
    }
    openlist.length = openlist.length - 1;
    if ((s_path[3][0] == p_end[0]) && (s_path[3][1] == p_end[1])) {
        getPath();
    } else {
        maptt.rows[s_path[3][1]].cells[s_path[3][0]].style.backgroundColor = "#00ff00";
        setTimeout("main()", 100);
    }
}
function getPath() {
    var str = "";
    var t = closelist[closelist.length - 1][4];
    while (1) {
        str += t.join(",") + ";";
        maptt.rows[t[1]].cells[t[0]].style.backgroundColor = "#ffff00";
        for (var i = 0; i < closelist.length; i++) {
            if (closelist[i][3][0] == t[0] && closelist[i][3][1] == t[1]) t = closelist[i][4];
        }
        if (t[0] == p_start[0] && t[1] == p_start[1]) break;
    }
    alert(str);
}
function setPos() {
    var h = (Math.abs(p_end[0] - p_start[0]) + Math.abs(p_end[1] - p_start[1])) * gw;
    s_path = [h, 0, h, p_start, p_start];
}
function set(id, arr) {
    switch (id) {
    case 1:
        p_start = arr;
        maptt.rows[arr[1]].cells[arr[0]].style.backgroundColor = "#ff0000";
        break;
    case 2:
        p_end = arr;
        maptt.rows[arr[1]].cells[arr[0]].style.backgroundColor = "#0000ff";
        break;
    case 3:
        n_path += arr.join(",") + ";";
        maptt.rows[arr[1]].cells[arr[0]].style.backgroundColor = "#cccccc";
        break;
    default:
        break;
    }
}
function setflag(id) {
    flag = id;
}