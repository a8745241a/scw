import router from "../router"
var routerUtils=(function () {

  function goByName(name) {
    router.push({name:name})
  }

  return {
    goByName:goByName
  }
})();
export {routerUtils}
