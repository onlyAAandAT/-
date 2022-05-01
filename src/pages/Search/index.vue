<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑，按钮带x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑可以用v-if实现，取决于searchParams是否有categoryName -->
          <!-- 分类面包屑 -->
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索keyword面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- trademark品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- props分类属性面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }">
                  <a href="javascript:;" @click="changeOrder('1')"
                    >综合
                    <i
                      :class="{
                        'icon-long-arrow-up': isAsc,
                        'icon-long-arrow-down': isDesc,
                      }"
                      class="iconfont"
                      v-show="isOne"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: isTwo }">
                  <a href="javascript:;" @click="changeOrder('2')"
                    >价格
                    <i
                      :class="{
                        'icon-long-arrow-up': isAsc,
                        'icon-long-arrow-down': isDesc,
                      }"
                      class="iconfont"
                      v-show="isTwo"
                    ></i
                  ></a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>
          <!-- 销售产品列表goodsList -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 使用声明式导航和使用模板字符串动态获取id参数（params参数） -->
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器位置 -->
          <!-- 分页器假数据测试 -->
          <pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        //一级分类的id
        category1Id: "",
        //二级分类的id
        category2Id: "",
        //三级分类的id
        category3Id: "",
        //用户选中分类的名字
        categoryName: "",
        //用户搜索关键字
        keyword: "",
        //排序
        order: "1:desc",
        //分页器参数，代表第几页
        pageNo: 1,
        //每页展示数据个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  // beforeCreate() {
  //   //不能获取响应式数据
  // },
  // created() {
  //created也可以
  // },
  beforeMount() {
    //在发送请求之前，把接口需要传递的参数进行整理，使得服务器能够返回对应的查询的数据
    //Object.assign：ES6新增语法，合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //在发送请求之前让参数发生变化
    this.getData();
  },
  watch: {
    $route(newValue, oldValue) {
      //需要在每次请求前都要进行参数整理
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //更新参数后发送请求
      this.getData();
      //请求完毕应当置空参数对象，保证上传的参数都是最新的
      //为什么只置空这三个等级，而不置空categoryName
      //请求发送消息逻辑：（id1||id2||id3）&& categoryName，这里的categoryName不需要置空，路由发生变化，它百分比会被新数据覆盖
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
  computed: {
    ...mapState({ total: (state) => state.search.searchList.total }),
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    //将请求写在函数中
    //向服务器发请求获取search模块数据（根据参数不同返回不同数据进行展示）
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //两个remove方法的getData()请求发送似乎不用进行
    //两个方法对路由的修改引起了watch的响应，watch中就会有相应的请求发送
    //删除分类的名字
    removeCategoryName() {
      //undefined不会传给服务器，因为本来服务器对某一参数的定义就是可有（包括空串）可无（undefined）
      //因此置为undefined后，可以不传这些参数，省点东西
      //做到这一步发现路径不会因为undefined而改变地址
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      // this.getData();
      //点击面包屑上的x，本意是删除query参数，留下params参数
      //骚操作：路由组件原地跳转，不传递query参数，刷新地址栏的路径
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字，另外附加清空Header中搜索文本框
    removeKeyword() {
      this.searchParams.keyword = undefined;
      // this.getData();
      //通知兄弟组件Header清楚关键字
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    trademarkInfo(trademark) {
      //整理参数样式 id:品牌名称
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    //收集平台属性的回调函数【属性、属性值】
    attrInfo(attr, attrValue) {
      //参数格式整理+数组去重
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重,indexOf==-1表示没这元素
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        //发送请求
        this.getData();
      }
    },
    removeAttr(index) {
      //再次整理参数+再次发请求
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //改变排序
    changeOrder(flag) {
      //flag形参，代表用户点击的是哪个：1:综合；2：价格
      // let orginOrder = this.searchParams.order;
      let orginFlag = this.searchParams.order.split(":")[0];
      let orginSort = this.searchParams.order.split(":")[1];
      let newOrder = "";
      if (flag == orginFlag) {
        newOrder = `${orginFlag}:${orginSort == "desc" ? "asc" : "desc"}`;
      } else {
        //默认desc，要是想变成asc，就得重复点走第一个
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    //自定义时间的回调函数：获取当前第几页
    getPageNo(pageNo) {
      //整理参数
      this.searchParams.pageNo = pageNo;
      //发请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>