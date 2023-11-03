module.exports = {
  beforeCompile: context => {
    console.log(context)
  },
  afterCompile: context => {
    console.log(context)
  }
}
