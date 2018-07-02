var utils = function () {

  function formetMemuData(data){
    var menus=[];
    data.forEach(function (ele) {
        if(ele.pid==0){
          menus.push(ele);
        }
    })
  }
  function clearData(data) {
    for (var p in data){
      if(typeof  data[p] !="object"){
        data[p]="";
      }else {
        clearData( data[p]);
      }
    }
  }
  function removeDuplicatedItem(ar) {
      var ret = [];

        for (var i = 0, j = ar.length; i < j; i++) {
      if (ret.indexOf(ar[i]) === -1) {
                  ret.push(ar[i]);
                 }
          }
         return ret;
     }
   function deepCopy(source) {
    var result={};
    for (var key in source) {
      result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
    }
    return result;
  }
  return utils= {
    clearData:clearData,
    removeDuplicatedItem:removeDuplicatedItem,
    deepCopy:deepCopy
  }
}();
export {utils}
