// requiremnets 
const { Post } = require('../models');

const postdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    initial_message: 'Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least.',
    user_id: 10
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    initial_message: 'Another journey chamber way yet females man. Way extensive and dejection get delivered deficient sincerity gentleman age. Too end instrument possession contrasted motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard.',
    user_id: 8
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    initial_message: 'One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy.',
    user_id: 1
  },
  {
    title: 'Nunc purus.',
    initial_message: 'Pellentesque nisi feugiat inceptos sagittis platea ipsum dictumst malesuada facilisis tempor eu malesuada sem neque orci sollicitudin adipiscing leo taciti pulvinar scelerisque potenti, himenaeos interdum lacinia nec ornare diam facilisis.',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    initial_message: 'Posuere vel bibendum scelerisque quisque ornare rutrum ante nisl ad, commodo aliquam vehicula nibh blandit pulvinar habitasse auctor, malesuada cursus consectetur massa platea felis dolor in',
    user_id: 7
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    initial_message: 'Volutpat tincidunt auctor lorem velit eu egestas viverra mattis sociosqu ut, consectetur vivamus elementum nulla est sed aenean sapien ultricies elementum sagittis pretium aliquam gravida.',
    user_id: 4
  },
  {
    title: 'In hac habitasse platea dictumst.',
    initial_message: 'Lorem ipsum nisl pulvinar tincidunt vitae phasellus purus pretium, hendrerit eu ut curabitur fames placerat odio etiam, at lorem condimentum netus lacus volutpat consectetur commodo donec ultrices lacus interdum aliquam placerat velit pulvinar adipiscing at.',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    initial_message: 'Est condimentum auctor maecenas ultricies purus habitant scelerisque ornare potenti eleifend, erat purus augue diam duis donec taciti vulputate necv',
    user_id: 1
  },
  {
    title: 'Duis ac nibh.',
    initial_message: 'Odio pharetra ligula praesent etiam vulputate odio felis, sem ante purus sodales eget eleifend at, inceptos taciti auctor consequat suscipit cubilia.',
    user_id: 9
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    initial_message: 'Inceptos integer risus mi dictumst pulvinar maecenas pretium maecenas integer, quisque nullam interdum habitasse lectus magna enim ac a phasellus neque bibendum.',
    user_id: 5
  },
  {
    title: 'In hac habitasse platea dictumst.',
    initial_message: 'Egestas mattis ullamcorper eget eleifend odio justo dictumst lobortis, auctor luctus etiam ullamcorper ac sem consequat, per habitant class vulputate viverra cras auctor.',
    user_id: 3
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    initial_message: 'Lorem ipsum vehicula blandit sodales duis vel blandit rhoncus pretium scelerisque, at mi ipsum cubilia habitant aliquet quisque molestie arcu habitant, nam rhoncus id tempus quis eros himenaeos eleifend pellentesque.',
    user_id: 10
  },
  {
    title: 'Donec dapibus.',
    initial_message: 'Aliquam himenaeos gravida ultrices pulvinar maecenas, tellus nibh lectus nulla phasellus ligula, feugiat augue netus himenaeos integer aenean etiam curae aenean ligula primis euismod.',
    user_id: 8
  },
  {
    title: 'Nulla tellus.',
    initial_message: 'Taciti facilisis adipiscing habitasse in arcu sagittis placerat, aenean accumsan interdum condimentum auctor pharetra curae orci, est consequat pulvinar dui sagittis erat semper fringilla quisque enim.',
    user_id: 3
  },
  {
    title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    initial_message: 'Per pellentesque commodo pulvinar vitae consectetur libero, sagittis vivamus hac dapibus gravida nunc taciti, donec et cursus egestas taciti.',
    user_id: 3
  },
  {
    title:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    initial_message: 'Malesuada suspendisse quisque fusce ut est curae sodales, pulvinar nibh leo id turpis risus auctor, aenean etiam quisque augue auctor vivamus metus scelerisque habitant eros lacinia',
    user_id: 7
  },
  {
    title: 'In hac habitasse platea dictumst.',
    initial_message: 'Lorem ipsum sociosqu vehicula varius consequat imperdiet interdum magna tempus lorem, scelerisque curabitur dolor sociosqu molestie odio orci ullamcorper.',
    user_id: 6
  },
  {
    title: 'Etiam justo.',
    initial_message: 'Nec habitant quis feugiat donec dui phasellus, ligula duis cras donec at sit, tincidunt suspendisse sociosqu cursus cubilia habitasse mauris ad imperdiet a nisi, nostra congue dolor suscipit ut, consequat id ac aliquam',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    initial_message: 'Tempus neque facilisis leo malesuada aenean congue habitasse, vestibulum fringilla aenean lectus augue tempus lobortis, ullamcorper potenti ut inceptos consectetur maecenas.',
    user_id: 6
  },
  {
    title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    initial_message: 'Viverra metus sodales vivamus ullamcorper fringilla nisl platea sollicitudin, tincidunt imperdiet lacinia in aliquam quis hac semper, vitae egestas in placerat maecenas egestas sapien nisl taciti per quam eu.',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;