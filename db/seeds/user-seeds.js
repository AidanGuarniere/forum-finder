// requirements 
const sequelize = require('../../config/connection');
const { User } = require('../../models');

const userdata = [
  {
    username: 'hwilder',
    email: 'hwilder@mail.com',
    password: 'userpassword'
  },
  {
    username: 'alexverse',
    email: 'alex@mail.com',
    password: 'userpassword'
  },
  {
    username: 'catman',
    email: 'catman@mail.com',
    password: 'userpassword'
  },
  {
    username: 'manners039',
    email: 'matthanners@mail.com',
    password: 'userpassword'
  },
  {
    username: 'irishgirl47',
    email: 'amymcgidley@mail.com',
    password: 'userpassword'
  },
  {
    username: 'driftking',
    email: 'burnout@mail.com',
    password: 'userpassword'
  },
  {
    username: 'craftsman2444',
    email: 'joeshmoe@mail.com',
    password: 'userpassword'
  },
  {
    username: 'tennismenace',
    email: 'kpragi@mail.com',
    password: 'userpassword'
  },
  {
    username: 'msbaker',
    email: 'cynthiabaker@mail.com',
    password: 'userpassword'
  },
  {
    username: 'hughdunnit',
    email: 'hughdonanvan@mail.com',
    password: 'userpassword'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
