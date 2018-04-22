#!/usr/bin/env node

const { db, User, Product, Review, Category } = require('../server/db')

const seed = async () => {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'grace@hopper.com', password: '123' })
  ])
  console.log(`seeded ${users.length} users`)
  console.log('email: ', users[0].email, ' password: 123')
  console.log('email: ', users[1].email, ' password: 123')
  console.log(`seeded successfully`)

  const products = await Promise.all([
    Product.create({
      title: 'Hazelnut Truffles',
      description:
        'Complex, decadent dark chocolate truffles with toasted hazelnuts and bourbon.',
      price: 25.0,
      inventory: 100,
      image: 'hazelnutTruffles.jpg'
    }),
    Product.create({
      title: 'Lavender Squares',
      description:
        'Aromatic milk chocolate squares with lavender essence and edible floral garnish.',
      price: 25.0,
      inventory: 100,
      image: 'lavenderSquares.jpg'
    }),
    Product.create({
      title: "The King's Truffles",
      description:
        'Inspired by Elvis Presley, these truffles feature white chocolate, peanutbutter, and a thin layer of banana.',
      price: 25.0,
      inventory: 100,
      image: 'whiteChocolateTruffles.jpg'
    }),
    Product.create({
      title: 'Just Chocolate',
      description: "It's just chocolate. Not everything has to be fancy!",
      price: 10.0,
      inventory: 100
    })
  ])
  const hazelnut = products[0]
  const lavender = products[1]
  const king = products[2]
  const choc = products[3]

  const reviewHazelnutTruffles1 = await Review.create({
    content: 'Hazelnuts rules, buy more!!!',
    rating: 3,
    productId: hazelnut.id,
    userId: users[0].id
  })

  const reviewHazelnutTruffles2 = await Review.create({
    content: 'Hazelnuts rules, buy a lot more!!!',
    rating: 4,
    productId: hazelnut.id,
    userId: users[0].id
  })

  const reviewHazelnutTruffles3 = await Review.create({
    content: 'Hazelnuts rules, buy many more!!!',
    rating: 5,
    productId: hazelnut.id,
    userId: users[0].id
  })

  console.log(`seeded ${products.length} products: `)
  console.log(`seeded successfully`)

  const categories = await Promise.all([
    Category.create({ name: 'Dark Chocolate' }),
    Category.create({ name: 'Milk Chocolate' }),
    Category.create({ name: 'White Chocolate' })
  ])

  const dark = categories[0]
  const milk = categories[1]
  const white = categories[2]

  console.log(`seeded ${categories.length} categories: `)
  console.log(`seeded successfully`)

  await hazelnut.addCategory(dark)
  await lavender.addCategory(milk)
  await king.addCategory(white)
  await choc.addCategory(white)
  await choc.addCategory(milk)
  await choc.addCategory(dark)

  console.log(`relationships created`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
