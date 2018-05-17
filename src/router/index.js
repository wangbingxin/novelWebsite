import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

export default new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
	  path: '/',
	  component: function (resolve) {
	    require(["../views/index.vue"], resolve);
	  },
	  meta: { scrollToTop: true }
	},
  {
    path: "/book/:book_id",
    name: "book",
    component: function (resolve) {
      require(["../views/bookinfo.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/rank",
    component: function (resolve) {
      require(["../views/rank.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/user",
    component: function (resolve) {
      require(["../views/user.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/library",
    component: function (resolve) {
      require(["../views/library.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/account",
    component: function (resolve) {
      require(["../views/account.vue"], resolve);
    },
    children: [
      {
        path: "/account",
        name: "recharge",
        component: function (resolve) {
          require(["../components/account/recharge.vue"], resolve);
        }
      },
      {
        path: "/account/consume",
        name: "consume",
        component: function (resolve) {
          require(["../components/account/consume.vue"], resolve);
        }
      },
      {
        path: "/account/reward",
        name: "reward",
        component: function (resolve) {
          require(["../components/account/reward.vue"], resolve);
        }
      },
      {
        path: "/account/purchase",
        name: "purchase",
        component: function (resolve) {
          require(["../components/account/purchase.vue"], resolve);
        }
      }
    ],
    meta: { scrollToTop: true }
  },
  {
    path: "/search",
    component: function (resolve) {
      require(["../views/search.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/sign",
    component: function (resolve) {
      require(["../views/sign.vue"], resolve);
    }
  },
  {
    path: "/bookshelf",
    component: function (resolve) {
      require(["../views/bookshelf.vue"], resolve);
    },
    children:[
      {
        path: "/bookshelf",
        name: "recent",
        component: function (resolve) {
          require(["../components/bookshelf/RecentReading.vue"], resolve);
        }
      },
      {
        path: "/bookshelf/save",
        name: "save",
        component: function (resolve) {
          require(["../components/bookshelf/BookSave.vue"], resolve);
        }
      }
    ],
    meta: { scrollToTop: true }
  },
  {
    path: "/read/:book_id/:chapter_id",
    name: "read",
    component: function (resolve) {
      require(["../views/reader.vue"], resolve);
    }
  },
  {
    path: "/bookcomment",
    component: function (resolve) {
      require(["../views/bookcomment.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/message",
    component: function (resolve) {
      require(["../views/message.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/level",
    component: function (resolve) {
      require(["../views/level.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/myreply",
    component: function (resolve) {
      require(["../views/reply.vue"], resolve);
    }
  },
  {
    path: "/helpcenter",
    component: function (resolve) {
      require(["../views/HelpCenter.vue"], resolve);
    },
    children: [
      {
        path: "/helpcenter",
        component: function (resolve) {
          require(["../components/helpcenter/CommonQuestion.vue"], resolve);
        }
      },
      {
        path: "/helpcenter/readerhelp",
        component: function (resolve) {
          require(["../components/helpcenter/ReaderHelp.vue"], resolve);
        }
      }
    ],
    meta: { scrollToTop: true }
  },
  {
    path: "/catalog/:book_id",
    name: "catalog",
    component: function (resolve) {
      require(["../views/catalog.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/commentinfo/:comment_id",
    name: "commentinfo",
    component: function (resolve) {
      require(["../views/commentinfo.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/lastchapter",
    component: function (resolve) {
      require(["../views/lastchapter.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/subscribe",
    component: function (resolve) {
      require(["../views/subscribe.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/login",
    // name: "login",
    component: function (resolve) {
      require(["../views/login.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/notsell",
    component: function (resolve) {
      require(["../views/notsell.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "/notfound",
    component: function (resolve) {
      require(["../views/notfound.vue"], resolve);
    },
    meta: { scrollToTop: true }
  },
  {
    path: "*",
    component: function (resolve) {
      require(["../views/404.vue"], resolve);
    }
  }
  ]
})
