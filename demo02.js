
// 初始化
function init() {
    datatable = document.getElementById("datatable");
    a = 1;
}
// 显示每个英雄的数据
function showData(row) {
    var tr = document.createElement("tr");
    // console.log(row.keys())
    var rowObj = JSON.parse(JSON.stringify(row))
    console.log(rowObj.keys())
    for (let i = 0; i < row.length; i++) {
        console.log(row[i])
    }

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    td1.innerHTML = row.id;
    td2.innerHTML = row.name;
    td3.innerHTML = row.hp_max;
    td4.innerHTML = row.mp_max;
    td5.innerHTML = row.role_main;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    datatable.appendChild(tr);
}
// 设置数据库信息
var db = openDatabase('wucai', '1.0', '王者荣耀英雄数据', 1024 * 1024);
var msg;
// 插入数据
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS heros (id unique, name, hp_max, mp_max, role_main)');
    tx.executeSql('INSERT INTO heros (id, name, hp_max, mp_max, role_main) VALUES (10000, "夏侯惇", 7350, 1746, "坦克")');
    tx.executeSql('INSERT INTO heros (id, name, hp_max, mp_max, role_main) VALUES (10001, "钟无艳", 7000, 1760, "战士")');
    tx.executeSql('INSERT INTO heros (id, name, hp_max, mp_max, role_main) VALUES (10002, "张飞", 8341, 100, "坦克")');
    tx.executeSql('INSERT INTO heros (id, name, hp_max, mp_max, role_main) VALUES (10003, "牛魔", 8476, 1926, "坦克")');
    tx.executeSql('INSERT INTO heros (id, name, hp_max, mp_max, role_main) VALUES (10004, "吕布", 7344, 0, "战士")');
    msg = '<p>heros数据表创建成功，一共插入5条数据。</p>';
    document.querySelector('#status').innerHTML = msg;
});
// 查询数据

function removeTableContent(datatable) {
    var childs = datatable.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        // alert(childs[i].nodeName);
        datatable.removeChild(childs[i]);
    }
}

function searchData() {

    removeTableContent(datatable)
    db.transaction(function (tx) {

        var name = document.getElementById('search-input').value;

        var TextSql;
        name = name.trim();
        // 在这里或取条件
        if (name == '') {
            TextSql = `SELECT * FROM heros`;
        } else {
            TextSql = `SELECT * FROM heros WHERE name like '%${name.trim()}%'`;
        }
        console.log(TextSql)

        tx.executeSql(TextSql, [], function (tx, data) {
            var len = data.rows.length;
            msg = "<p>查询记录条数: " + len + "</p>";
            document.querySelector('#status').innerHTML = msg;
            // 将查询的英雄数据放到 datatable中
            for (i = 0; i < len; i++) {
                // showData(data.rows.item(i));
                showData(data.rows[i]);
            }
        });


    });
}


// 获取搜索按钮

var searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', function () {
    searchData();
});



searchData();

/**
 * 总结：
 *  1. like 后面的模糊查询，需要加引号修饰
 *  2. 获取子节点，parentNode.childNodes;遍历删除要从后面开始，否则会出现索引越界。
 */