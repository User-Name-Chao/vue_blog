const {
  default: state
} = require("./states");

const getters = {
  getName: state => state.name
}
export default getters

