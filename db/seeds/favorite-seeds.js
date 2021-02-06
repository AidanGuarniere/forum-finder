// requirements 
const { Favorite } = require('../models');

const favoritedata = [
  {
    user_id: 9,
    forum_id: 19
  },
  {
    user_id: 1,
    forum_id: 8
  },
  {
    user_id: 8,
    forum_id: 12
  },
  {
    user_id: 8,
    forum_id: 19
  },
  {
    user_id: 9,
    forum_id: 3
  },
  {
    user_id: 3,
    forum_id: 16
  },
  {
    user_id: 4,
    forum_id: 7
  },
  {
    user_id: 10,
    forum_id: 7
  },
  {
    user_id: 3,
    forum_id: 18
  },
  {
    user_id: 9,
    forum_id: 16
  },
  {
    user_id: 3,
    forum_id: 17
  },
  {
    user_id: 10,
    forum_id: 2
  },
  {
    user_id: 6,
    forum_id: 10
  },
  {
    user_id: 5,
    forum_id: 11
  },
  {
    user_id: 6,
    forum_id: 1
  },
  {
    user_id: 9,
    forum_id: 18
  },
  {
    user_id: 6,
    forum_id: 15
  },
  {
    user_id: 6,
    forum_id: 7
  },
  {
    user_id: 6,
    forum_id: 4
  },
  {
    user_id: 1,
    forum_id: 16
  },
  {
    user_id: 10,
    forum_id: 18
  },
  {
    user_id: 4,
    forum_id: 10
  },
  {
    user_id: 10,
    forum_id: 5
  },
  {
    user_id: 5,
    forum_id: 16
  },
  {
    user_id: 6,
    forum_id: 17
  },
  {
    user_id: 1,
    forum_id: 15
  },
  {
    user_id: 7,
    forum_id: 13
  },
  {
    user_id: 6,
    forum_id: 3
  },
  {
    user_id: 6,
    forum_id: 13
  },
  {
    user_id: 7,
    forum_id: 1
  },
  {
    user_id: 4,
    forum_id: 15
  },
  {
    user_id: 2,
    forum_id: 18
  },
  {
    user_id: 9,
    forum_id: 10
  },
  {
    user_id: 10,
    forum_id: 15
  },
  {
    user_id: 8,
    forum_id: 1
  },
  {
    user_id: 10,
    forum_id: 8
  },
  {
    user_id: 2,
    forum_id: 13
  },
  {
    user_id: 9,
    forum_id: 20
  },
  {
    user_id: 1,
    forum_id: 17
  },
  {
    user_id: 10,
    forum_id: 9
  },
  {
    user_id: 10,
    forum_id: 3
  },
  {
    user_id: 5,
    forum_id: 6
  },
  {
    user_id: 6,
    forum_id: 12
  },
  {
    user_id: 5,
    forum_id: 2
  },
  {
    user_id: 6,
    forum_id: 14
  },
  {
    user_id: 8,
    forum_id: 18
  },
  {
    user_id: 3,
    forum_id: 4
  }
];

const seedFavorites = () => Favorite.bulkCreate(favoritedata);

module.exports = seedFavorites;
