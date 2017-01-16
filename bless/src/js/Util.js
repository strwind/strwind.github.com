

const Util = {
    getQuery: function(query) {
        var hash = document.location.hash || '';
        hash = hash.slice(1);
        hash = hash.split("&");
        var map = {};
        hash.map(function(item) {
            var arr = item.split('=');
            map[arr[0]] = arr[1];
        });
        return map[query];
    },
    
    setQuery: function(key, value) {
        var hash = document.location.hash || '';
        hash = hash.slice(1);
        hash = hash.split("&");
        var map = {};
        hash.map(function(item) {
            var arr = item.split('=');
            map[arr[0]] = arr[1];
        });
        map[key] = value;
        var resultHash = '#';
        for(var i in map) {
            if (i && map[i]) {
                resultHash += i + '=' + map[i] + '&';
            }
        }
        document.location.hash = resultHash;
    }
};
module.exports = Util;