import { createStore } from 'vuex';

// 模拟数据
const attractions = [
  {
    id: 'attraction-1',
    name: '黄山风景区',
    location: '中国 安徽 黄山',
    description: '黄山是中国著名的风景名胜区，以奇松、怪石、云海、温泉"四绝"著称于世。明代旅行家徐霞客曾两次登临黄山，赞叹道："薄海内外无如徽之黄山，登黄山天下无山，观止矣！"后人据此概括为"五岳归来不看山，黄山归来不看岳"。',
    history: '黄山古称黟山，因峰岩青黑，遥望苍黛而名。后因传说轩辕黄帝曾在此炼丹，故改名为"黄山"。黄山经历了漫长的造山运动和地壳抬升，以及冰川和自然风化作用，才形成其特有的峰林结构。',
    features: [
      '世界文化与自然双重遗产',
      '国家5A级旅游景区',
      '天下第一奇山',
      '奇松、怪石、云海、温泉四绝'
    ],
    tips: [
      '最佳游览季节为春秋两季，天气适宜，景色优美',
      '建议穿舒适的运动鞋，山上路程较远',
      '带好雨具，山区天气多变',
      '山上食物和水较贵，可适量携带'
    ],
    openTime: '全年 06:30-17:00',
    price: 190,
    discountPrice: 150,
    suggestedDuration: '1-2天',
    rating: 4.8,
    reviewCount: 12543,
    tags: ['自然风光', '历史文化'],
    images: [
      'https://picsum.photos/id/10/800/600',
      'https://picsum.photos/id/11/800/600',
      'https://picsum.photos/id/12/800/600'
    ],
    phone: '0559-5561111',
    website: 'https://www.huangshan.com',
    reviews: [
      {
        id: 1,
        userName: '旅行者1',
        userAvatar: 'https://picsum.photos/id/1005/200/200',
        rating: 5,
        content: '非常美丽的景点，值得一去！自然风光令人惊叹，空气清新，适合放松身心。',
        images: ['https://picsum.photos/id/10/400/300', 'https://picsum.photos/id/11/400/300'],
        date: '2023-05-15'
      },
      {
        id: 2,
        userName: '摄影爱好者',
        userAvatar: 'https://picsum.photos/id/1012/200/200',
        rating: 5,
        content: '黄山的云海简直太壮观了！日出和日落的景色令人难忘。作为一名摄影师，这里给了我很多创作灵感。',
        images: ['https://picsum.photos/id/12/400/300'],
        date: '2023-04-22'
      },
      {
        id: 3,
        userName: '背包客',
        userAvatar: 'https://picsum.photos/id/1025/200/200',
        rating: 4,
        content: '黄山的风景确实名不虚传，但节假日人太多了，体验感有所下降。建议避开节假日前往。',
        images: [],
        date: '2023-03-18'
      }
    ]
  },
  {
    id: 'attraction-2',
    name: '迪士尼乐园',
    location: '中国 上海',
    description: '上海迪士尼度假区是中国内地首座迪士尼主题乐园，于2016年6月16日正式开园。乐园由六大主题园区组成，包括米奇大街、奇想花园、梦幻世界、探险岛、宝藏湾和明日世界，拥有许多全球首发游乐项目、精彩的现场演出和独特的餐饮体验。',
    history: '上海迪士尼度假区是中国内地首座迪士尼主题乐园，于2016年6月16日正式开园。',
    features: [
      '全球最大的迪士尼城堡',
      '迪士尼主题乐园',
      '亲子游玩好去处',
      '精彩的夜间烟火表演'
    ],
    tips: [
      '提前在官方APP上查看各项目排队时间',
      '下载迪士尼官方APP，获取快速通行证',
      '建议穿舒适的鞋子，一天下来要走很多路',
      '夜间烟火表演非常精彩，建议提前占位'
    ],
    openTime: '08:30-21:30',
    price: 599,
    discountPrice: 499,
    suggestedDuration: '1天',
    rating: 4.6,
    reviewCount: 8765,
    tags: ['亲子乐园', '网红打卡'],
    images: [
      'https://picsum.photos/id/20/800/600',
      'https://picsum.photos/id/21/800/600',
      'https://picsum.photos/id/22/800/600'
    ],
    phone: '400-180-0000',
    website: 'https://www.shanghaidisneyresort.com',
    reviews: [
      {
        id: 4,
        userName: '幸福一家',
        userAvatar: 'https://picsum.photos/id/1027/200/200',
        rating: 5,
        content: '带孩子来玩，非常开心！每个项目都很有趣，工作人员也很热情。夜间的烟火表演太震撼了！',
        images: ['https://picsum.photos/id/20/400/300'],
        date: '2023-05-20'
      },
      {
        id: 5,
        userName: '迪士尼粉丝',
        userAvatar: 'https://picsum.photos/id/1025/200/200',
        rating: 4,
        content: '迪士尼的氛围真的很棒，项目也很有趣。但是人太多了，排队时间太长，有些项目排了2个小时。',
        images: [],
        date: '2023-04-15'
      }
    ]
  },
  {
    id: 'attraction-3',
    name: '故宫博物院',
    location: '中国 北京',
    description: '北京故宫博物院，是中国明清两代的皇家宫殿，旧称紫禁城，位于北京中轴线中心，是中国古代宫廷建筑之精华。北京故宫以三大殿为中心，占地面积72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。',
    history: '北京故宫于明成祖永乐四年（1406年）开始建设，以南京故宫为蓝本营建，到永乐十八年（1420年）建成。它是一座长方形城池，南北长961米，东西宽753米，四面围有高10米的城墙，城外有宽52米的护城河。',
    features: [
      '世界文化遗产',
      '中国最大的古代文化艺术博物馆',
      '明清两代的皇家宫殿',
      '建筑艺术的瑰宝'
    ],
    tips: [
      '提前在官网预约门票',
      '建议上午参观，光线较好，拍照效果更佳',
      '可租用电子导览器，了解更多历史文化',
      '中轴线游览路线：午门→太和门→太和殿→中和殿→保和殿→乾清门→乾清宫→交泰殿→坤宁宫→御花园→神武门'
    ],
    openTime: '4月1日-10月31日 08:30-17:00；11月1日-次年3月31日 08:30-16:30',
    price: 60,
    suggestedDuration: '3-4小时',
    rating: 4.7,
    reviewCount: 15678,
    tags: ['历史文化', '网红打卡'],
    images: [
      'https://picsum.photos/id/30/800/600',
      'https://picsum.photos/id/31/800/600',
      'https://picsum.photos/id/32/800/600'
    ],
    phone: '010-85007068',
    website: 'https://www.dpm.org.cn',
    reviews: [
      {
        id: 6,
        userName: '历史爱好者',
        userAvatar: 'https://picsum.photos/id/1012/200/200',
        rating: 5,
        content: '历史文化氛围浓厚，建筑保存完好，讲解也很专业。唯一的缺点是节假日人太多了。',
        images: ['https://picsum.photos/id/30/400/300'],
        date: '2023-04-08'
      },
      {
        id: 7,
        userName: '摄影师小李',
        userAvatar: 'https://picsum.photos/id/1025/200/200',
        rating: 4,
        content: '故宫的建筑真的很壮观，每个角落都值得拍照。建议早上去，人少光线好。',
        images: ['https://picsum.photos/id/31/400/300', 'https://picsum.photos/id/32/400/300'],
        date: '2023-03-25'
      }
    ]
  },
  {
    id: 'attraction-4',
    name: '巴厘岛海滩',
    location: '印度尼西亚 巴厘岛',
    description: '巴厘岛是印度尼西亚最著名的旅游胜地之一，以其美丽的海滩、壮观的火山、独特的文化和友好的人民而闻名。这里有清澈的海水、细腻的沙滩、温暖的阳光，是度假和放松的理想之地。',
    history: '巴厘岛是印度尼西亚17000多个岛屿中的一个，位于爪哇岛东部。巴厘岛的文化和宗教深受印度教的影响，岛上有许多寺庙和宗教仪式。',
    features: [
      '世界著名的度假胜地',
      '美丽的海滩和海景',
      '独特的文化和艺术',
      '适合冲浪和潜水'
    ],
    tips: [
      '最佳旅游季节为4-10月，天气晴朗，雨水较少',
      '注意防晒，紫外线较强',
      '尊重当地文化和宗教习俗',
      '可以尝试当地的美食，如烤乳猪、巴厘炒饭等'
    ],
    openTime: '全天开放',
    price: '免费（部分水上活动收费）',
    suggestedDuration: '2-3天',
    rating: 4.9,
    reviewCount: 9876,
    tags: ['自然风光', '网红打卡'],
    images: [
      'https://picsum.photos/id/40/800/600',
      'https://picsum.photos/id/41/800/600',
      'https://picsum.photos/id/42/800/600'
    ],
    phone: '国际区号+62-361-xxxxxxx',
    website: 'https://www.balivisit.com',
    reviews: [
      {
        id: 8,
        userName: '海滩爱好者',
        userAvatar: 'https://picsum.photos/id/1012/200/200',
        rating: 5,
        content: '巴厘岛的海滩太美了！海水清澈见底，沙滩细腻柔软，阳光明媚。在这里度过了一个完美的假期。',
        images: ['https://picsum.photos/id/40/400/300', 'https://picsum.photos/id/41/400/300'],
        date: '2023-05-10'
      },
      {
        id: 9,
        userName: '环球旅行者',
        userAvatar: 'https://picsum.photos/id/1025/200/200',
        rating: 4,
        content: '巴厘岛的文化很独特，人民也很友好。海滩很美，但有些地方商业化比较严重。总体来说是一个值得一去的地方。',
        images: ['https://picsum.photos/id/42/400/300'],
        date: '2023-04-05'
      }
    ]
  },
  {
    id: 'attraction-5',
    name: '巴黎埃菲尔铁塔',
    location: '法国 巴黎',
    description: '埃菲尔铁塔是法国巴黎的标志性建筑，也是世界上最著名的建筑之一。它建于1889年，为了纪念法国大革命100周年而建造，高324米，是当时世界上最高的建筑。埃菲尔铁塔由古斯塔夫·埃菲尔设计，采用了钢铁结构，共有三层观景台，从这里可以俯瞰整个巴黎市区的美景。',
    history: '埃菲尔铁塔建于1889年，为了纪念法国大革命100周年而建造。它由古斯塔夫·埃菲尔设计，采用了钢铁结构，共有三层观景台。最初，埃菲尔铁塔只被计划保留20年，但由于它在无线电通讯方面的重要作用，最终被永久保留下来。',
    features: [
      '世界著名的地标建筑',
      '法国文化的象征',
      '可俯瞰巴黎全景',
      '夜间灯光秀非常壮观'
    ],
    tips: [
      '提前在官网预订门票，避免排队',
      '建议日落时分前往，可以欣赏到美丽的夜景',
      '顶层观景台视野最好，但票价较高',
      '夜间灯光秀每小时整点开始，持续5分钟'
    ],
    openTime: '9:00-23:00（夏季）；9:30-22:30（冬季）',
    price: '电梯到二楼：16欧元；电梯到顶层：25欧元',
    suggestedDuration: '1-2小时',
    rating: 4.8,
    reviewCount: 12345,
    tags: ['历史文化', '网红打卡'],
    images: [
      'https://picsum.photos/id/50/800/600',
      'https://picsum.photos/id/51/800/600',
      'https://picsum.photos/id/52/800/600'
    ],
    phone: '+33-892-701-239',
    website: 'https://www.tour-eiffel.fr',
    reviews: [
      {
        id: 10,
        userName: '浪漫之旅',
        userAvatar: 'https://picsum.photos/id/1012/200/200',
        rating: 5,
        content: '埃菲尔铁塔真的很壮观！我们在日落时分登上铁塔，欣赏到了巴黎的美丽夜景。这是一次非常浪漫的体验。',
        images: ['https://picsum.photos/id/50/400/300'],
        date: '2023-05-01'
      },
      {
        id: 11,
        userName: '摄影师小王',
        userAvatar: 'https://picsum.photos/id/1025/200/200',
        rating: 4,
        content: '埃菲尔铁塔是摄影的绝佳地点，无论从哪个角度拍摄都很美丽。建议在周围的公园拍摄全景，效果更好。',
        images: ['https://picsum.photos/id/51/400/300', 'https://picsum.photos/id/52/400/300'],
        date: '2023-04-12'
      }
    ]
  },
  {
    id: 'attraction-6',
    name: '东京迪士尼海洋',
    location: '日本 东京',
    description: '东京迪士尼海洋是位于日本东京迪士尼度假区的第二座主题乐园，于2001年9月4日开业。这是世界上第一个以海洋为主题的迪士尼乐园，由七大主题海港组成，包括地中海港湾、美国海滨、发现港、失落河三角洲、阿拉伯海岸、美人鱼礁湖和神秘岛。',
    history: '东京迪士尼海洋于2001年9月4日开业，是世界上第一个以海洋为主题的迪士尼乐园。它由华特迪士尼幻想工程设计，以海洋探险为主题，融合了迪士尼的经典故事和角色。',
    features: [
      '世界上第一个以海洋为主题的迪士尼乐园',
      '精彩的水上表演',
      '独特的主题区域',
      '适合全家游玩'
    ],
    tips: [
      '提前在官网查看各项目排队时间',
      '下载官方APP，获取快速通行证',
      '建议穿舒适的鞋子，一天下来要走很多路',
      '夜间的水上表演非常精彩，建议提前占位'
    ],
    openTime: '9:00-22:00（具体时间以官网为准）',
    price: '成人一日票：7,400日元；儿童一日票：5,200日元',
    suggestedDuration: '1天',
    rating: 4.7,
    reviewCount: 7654,
    tags: ['亲子乐园', '网红打卡'],
    images: [
      'https://picsum.photos/id/60/800/600',
      'https://picsum.photos/id/61/800/600',
      'https://picsum.photos/id/62/800/600'
    ],
    phone: '045-330-5211',
    website: 'https://www.tokyodisneyresort.jp',
    reviews: [
      {
        id: 12,
        userName: '迪士尼迷',
        userAvatar: 'https://picsum.photos/id/1012/200/200',
        rating: 5,
        content: '东京迪士尼海洋比迪士尼乐园更有特色，主题区域设计得非常精美。特别是神秘岛的火山和失落河三角洲的探险氛围，让人印象深刻。',
        images: ['https://picsum.photos/id/60/400/300', 'https://picsum.photos/id/61/400/300'],
        date: '2023-05-15'
      },
      {
        id: 13,
        userName: '日本旅行家',
        userAvatar: 'https://picsum.photos/id/1025/200/200',
        rating: 4,
        content: '东京迪士尼海洋的服务非常好，项目也很有趣。但是人太多了，排队时间很长，有些项目排了2个小时。建议避开节假日前往。',
        images: ['https://picsum.photos/id/62/400/300'],
        date: '2023-04-20'
      }
    ]
  }
];

const store = createStore({
  state: {
    attractions: attractions,
    user: {
      username: '',
      nickname: '',
      email: '',
      frequentCity: '',
      preferences: []
    },
    favorites: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = {
        username: '',
        nickname: '',
        email: '',
        frequentCity: '',
        preferences: []
      };
      state.favorites = [];
    },
    UPDATE_USER_INFO(state, userInfo) {
      state.user = {
        ...state.user,
        ...userInfo
      };
    },
    TOGGLE_FAVORITE(state, attractionId) {
      const index = state.favorites.indexOf(attractionId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(attractionId);
      }
    },
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites;
    }
  },
  actions: {
    login({ commit }, user) {
      // 在实际应用中，这里应该是API调用
      commit('SET_USER', user);
      
      // 模拟从服务器获取用户收藏
      const userFavorites = [
        'attraction-1',
        'attraction-3'
      ];
      commit('SET_FAVORITES', userFavorites);
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    register({ commit }, user) {
      // 在实际应用中，这里应该是API调用
      commit('SET_USER', user);
    },
    updateUserInfo({ commit }, userInfo) {
      // 在实际应用中，这里应该是API调用
      commit('UPDATE_USER_INFO', userInfo);
    },
    toggleFavorite({ commit }, attractionId) {
      commit('TOGGLE_FAVORITE', attractionId);
    },
    fetchAttractions({ commit }) {
      // 在实际应用中，这里应该是API调用
      // 这里我们使用模拟数据
      // const response = await axios.get('/api/attractions');
      // commit('SET_ATTRACTIONS', response.data);
    }
  },
  getters: {
    getAttractionById: (state) => (id) => {
      return state.attractions.find(attraction => attraction.id === id);
    },
    getFavorites: (state) => {
      return state.favorites.map(id => 
        state.attractions.find(attraction => attraction.id === id)
      );
    }
  }
});

export default store;
