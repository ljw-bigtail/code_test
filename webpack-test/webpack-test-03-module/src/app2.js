import(/*webpackChunkName: 'loadsh'*/'loadsh')
  .then(({ default: _ })=>{
    console.log(_.join(['1', '2'], ' '));
  })
