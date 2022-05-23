import(/*webpackChunkName: 'lodash'*/'lodash')
  .then(({ default: _ })=>{
    console.log(_.join(['1', '2'], ' '));
  })
