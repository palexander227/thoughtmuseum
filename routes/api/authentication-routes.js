const router = require('express').Router();
const { User } = require('../../models');

// The `/api/categories` endpoint


router.post('/register-teacher', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
//   const category = await Category.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [{
//       model: Product
//     }]
//  });
//   res.json(category);
console.log(`/api/register-teacher | ${req.body.username} ${req.body.password}`) 
});

router.post('/login', async (req, res) => {
  // create a new category
  // const category = await Category.create({
  //   category_name: req.body.category_name
  // });
  // res.json(category);
});

router.get('/logout', (req, res) => {
  // update a category by its `id` value
//     Category.findOne({
//     where: {
//       id: req.params.id
//     },
//  }).then(category => {
//    if(category){
//      category.update({
//        category_name: req.body.category_name
//       }).then(category => res.json(category))
//     } else {res.json('no category with that id found')}
//     })
res.json('logged out');
});



module.exports = router;
