<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="leaveShow" @mouseenter="enterShow">
          <h2 class="all">全部商品分类</h2>
          <!-- 三级联动 -->
          <transition name="sort">
            <div class="sort" v-show="show">
              <div class="all-sort-list2" @click="goSearch">
                <!-- 一级分类 -->
                <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                  :class="{ cur: currentIndex == index }"
                >
                  <h3 @mouseenter="changeIndex(index)">
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      href="javascript:;"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: currentIndex == index ? 'block' : 'none',
                    }"
                  >
                    <!-- 二级、三级分类 -->
                    <div
                      class="subitem"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            href="javascript:;"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              href="javascript:;"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//是将lodash全部引入
// import _ from 'lodash';
//按需加载
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移入的一级分类的id
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // changeIndex(index) {
    //   //鼠标进入，修改响应式数组currentIndex属性
    //   this.currentIndex = index;
    // },
    //节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
      this.currentIndex = -1;
    },
    goSearch(event) {
      let element = event.target; //获取发生事件的节点，并筛选出带有date-categoryname的节点
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //整理路由跳转需要的参数信息
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //点击了是不是a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候携带params参数，捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    //Search路由组件挂载完毕，show的属性变成false
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数会立即执行一次
      //注入一个参数state，即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    //进入的开始状态
    .sort-enter {
      opacity: 0;
      left: -100%;
      transform: rotate(0deg);
    }
    //进入的结束状态
    .sort-enter-to {
      opacity: 1;
      left: 0;
      transform: rotate(360deg);
    }
    .sort-enter-active {
      transition: all 0.2s linear;
      overflow: hidden;
    }
  }
}
</style>