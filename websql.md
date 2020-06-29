# websql

WebSQ:LWebSQL DB API

WebSQL 并不属于 HTML5 规范的一部分，它是一个单独的规范，只是随着 HTML5 规范一起加入到了浏览器端。

+ 创建数据库

openDatabase 方法中一共包括了 5 个参数，分别为数据库名、版本号、描述、数据库大小、创建回调。其中创建回调可以缺省。

```js
var db = window.openDatabase(dbname, version, dbdesc, dbsize,function() {});
```

+ 事务操作

```js
transaction(callback, errorCallback, successCallback); 
```

例：

```js
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS heros (id unique, name, hp_max, mp_max, role_main)');
    tx.executeSql('INSERT INTO heros (id, name, hp_max, mp_max, role_main) VALUES (10000, "夏侯惇", 7350, 1746, "坦克")');
});
```