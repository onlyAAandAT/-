<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-show="categoryView.category1Name">{{categoryView.category1Name}}</span>
        <span v-show="categoryView.category2Name">{{categoryView.category2Name}}</span>
        <span v-show="categoryView.category3Name">{{categoryView.category3Name}}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuImageList="skuImageList" />
          <!-- 要根据点击轮播图的缩略图的index切换，是两个兄弟组件之间的通信 -->
          <!-- 小图列表 -->
          <ImageList :skuImageList="skuImageList" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{skuInfo.skuName}}
            </h3>
            <p class="news">
              {{skuInfo.skuDesc}}
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{skuInfo.price}}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray"
                    >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                  >
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="spuSaleAttr in spuSaleAttrList" :key="spuSaleAttr.id">
                <dt class="title">选择{{ spuSaleAttr.saleAttrName }}</dt>
                <dd
                  changepirce="0"
                  :class="{ active: spuSaleAttrValue.isChecked == '1' }"
                  v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                  :key="spuSaleAttrValue.id"
                  @click="
                    changeActive(
                      spuSaleAttrValue,
                      spuSaleAttr.spuSaleAttrValueList
                    )
                  "
                >
                  {{ spuSaleAttrValue.saleAttrValueName }}
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input
                  autocomplete="off"
                  class="itxt"
                  v-model.number="skuNum"
                  @change="changeSkuNum"
                />
                <a href="javascript:" class="plus" @click="skuNum++">+</a>
                <a
                  href="javascript:"
                  class="mins"
                  @click="skuNum > 1 ? skuNum-- : (skuNum = 1)"
                  >-</a
                >
              </div>
              <div class="add">
                <!-- 以前的路由跳转，从A路由跳转到B路由，这里加入购物车，进行跳转之前，
                发送请求把信息发送给服务器，进行相应的存储 -->
                <a @click="addShopCar">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <aside class="aside">
        <div class="tabWraped">
          <h4 class="active">相关分类</h4>
          <h4>推荐品牌</h4>
        </div>
        <div class="tabContent">
          <div class="tab-pane active">
            <ul class="partList">
              <li>手机</li>
              <li>手机壳</li>
              <li>内存卡</li>
              <li>Iphone配件</li>
              <li>贴膜</li>
              <li>手机耳机</li>
              <li>移动电源</li>
              <li>平板电脑</li>
            </ul>
            <ul class="goodsList">
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part01.png" />
                  </div>
                  <div class="attr">Apple苹果iPhone 6s (A1699)</div>
                  <div class="price">
                    <em>¥</em>
                    <i>6088.00</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-pane">
            <p>推荐品牌</p>
          </div>
        </div>
      </aside>
      <div class="detail">
        <div class="fitting">
          <h4 class="kt">选择搭配</h4>
          <div class="good-suits">
            <div class="master">
              <img src="./images/l-m01.png" />
              <p>￥5299</p>
              <i>+</i>
            </div>
            <ul class="suits">
              <li class="suitsItem">
                <img src="./images/dp01.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="39" />
                  <span>39</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp02.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="50" />
                  <span>50</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp03.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="59" />
                  <span>59</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp04.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="99" />
                  <span>99</span>
                </label>
              </li>
            </ul>
            <div class="result">
              <div class="num">已选购0件商品</div>
              <div class="price-tit">套餐价</div>
              <div class="price">￥5299</div>
              <button class="addshopcar">加入购物车</button>
            </div>
          </div>
        </div>
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###"> 商品介绍 </a>
            </li>
            <li>
              <a href="###"> 规格与包装 </a>
            </li>
            <li>
              <a href="###"> 售后保障 </a>
            </li>
            <li>
              <a href="###"> 商品评价 </a>
            </li>
            <li>
              <a href="###"> 手机社区 </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>分辨率：1920*1080(FHD)</li>
                <li>后置摄像头：1200万像素</li>
                <li>前置摄像头：500万像素</li>
                <li>核 数：其他</li>
                <li>频 率：以官网信息为准</li>
                <li>品牌： Apple</li>
                <li>商品名称：APPLEiPhone 6s Plus</li>
                <li>商品编号：1861098</li>
                <li>商品毛重：0.51kg</li>
                <li>商品产地：中国大陆</li>
                <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                <li>系统：苹果（IOS）</li>
                <li>像素：1000-1600万</li>
                <li>机身内存：64GB</li>
              </ul>
              <div class="intro-detail">
                <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" />
              </div>
            </div>
            <div id="two" class="tab-pane">
              <p>规格与包装</p>
            </div>
            <div id="three" class="tab-pane">
              <p>售后保障</p>
            </div>
            <div id="four" class="tab-pane">
              <p>商品评价</p>
            </div>
            <div id="five" class="tab-pane">
              <p>手机社区</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";

export default {
  name: "Detail",
  data() {
    return {
      // 购买产品的个数
      skuNum: 1,
    };
  },
  computed: {
    ...mapGetters(["categoryView", "skuInfo", "spuSaleAttrList"]),
    skuImageList() {
      return this.skuInfo.skuImageList || [];
    },
  },
  components: {
    ImageList,
    Zoom,
  },
  methods: {
    // 产品的售卖属性值切换高亮
    changeActive(saleAttrValue, arr) {
      arr.forEach((item) => {
        item.isChecked = "0";
      });
      saleAttrValue.isChecked = "1";
    },
    // 表单元素修改产品的个数
    changeSkuNum(event) {
      let value = event.target.value * 1; // 输入值*1 非法字符会NaN
      if (isNaN(value) || value < 1) {
        this.skuNum = 1;
      } else {
        this.skuNum = parseInt(value); //
      }
    },
    // 加入购物车的回调
    async addShopCar(event){
      // 发送带参请求，将产品加入数据库
      // 派发了action，但是拿不到返回的状态结果，但是action代码调用了仓库中对应的函数
      // action的返回值是一个promise对象
      // 成功：服务器存储，进行路由跳转
      // 失败：提示用户
      try {
        await this.$store.dispatch('addOrUpdateShopCart',{skuId:this.$route.params.skuid,skuNum:this.skuNum})
        // 路由跳转
        // 产品信息传递给购物车路由组件  个数，产品名字，产品价格等 在skuInfo下
        // query参数直接传，地址栏会很乱，也可以运行
        // 为了不让它太乱，就只传一个购买数量
        // 可以使用本地存储（一直留着，5M），或者会话存储（关闭会话后清除）
        // 简单的数据用query传给路由组件，复杂数据用会话存储，会话结束，数据消失
        // 存储的是字符串
        sessionStorage.setItem("SKUINFO",JSON.stringify(this.skuInfo))
        this.$router.push({name:'addcarsuccess',query:{skuNum:this.skuNum}})
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    //派发action获取产品详情
    this.$store.dispatch("getGoodInfo", this.$route.params.skuid);
  },
};
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;

    .aside {
      width: 210px;
      float: left;
      border: 1px solid #ccc;

      .tabWraped {
        height: 40px;

        h4 {
          border-top: 3px solid #fff;
          float: left;
          line-height: 37px;
          width: 105px;
          text-align: center;
          border-bottom: 1px solid #ccc;

          &.active {
            border-top: 3px solid #e1251b;
            border-bottom: 0;
            font-weight: normal;
          }
        }
      }

      .tabContent {
        padding: 10px;

        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .partList {
              overflow: hidden;

              li {
                width: 50%;
                float: left;
                border-bottom: 1px dashed #ededed;
                line-height: 28px;
              }
            }

            .goodsList {
              & > li {
                margin: 5px 0 15px;
                border-bottom: 1px solid #ededed;
                padding-bottom: 5px;

                .list-wrap {
                  .p-img {
                    text-align: center;

                    img {
                      width: 152px;
                    }
                  }

                  .price {
                    font-size: 16px;
                    color: #c81623;
                  }

                  .operate {
                    text-align: center;
                    margin: 5px 0;

                    a {
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      display: inline-block;
                      padding: 2px 14px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail {
      width: 980px;
      float: right;

      .fitting {
        border: 1px solid #ddd;
        margin-bottom: 15px;

        .kt {
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          padding: 5px 0 5px 15px;
        }

        .good-suits {
          height: 170px;
          padding-top: 10px;

          .master {
            width: 127px;
            height: 165px;
            text-align: center;
            position: relative;
            float: left;

            img {
              width: 87px;
            }

            p {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }

            i {
              position: absolute;
              top: 48px;
              right: -25px;
              font-size: 16px;
            }
          }

          .suits {
            width: 668px;
            height: 165px;
            float: left;

            .suitsItem {
              float: left;
              width: 127px;
              padding: 0 20px;
              text-align: center;

              img {
                width: 120px;
                height: 130px;
              }

              p {
                font-size: 12px;
              }

              label {
                display: block;
                position: relative;

                input {
                  vertical-align: middle;
                }

                span {
                  vertical-align: middle;
                }
              }
            }
          }

          .result {
            border-left: 1px solid #ddd;
            width: 153px;
            height: 165px;
            padding-left: 20px;
            float: left;

            .num {
              font-size: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
            }

            .price-tit {
              font-weight: bold;
              margin-bottom: 10px;
            }

            .price {
              color: #b1191a;
              font-size: 16px;
              margin-bottom: 10px;
            }

            .addshopcar {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
              display: inline-block;
              box-sizing: border-box;
            }
          }
        }
      }

      .intro {
        .tab-wraped {
          background: #ededed;
          // border: 1px solid #ddd;
          overflow: hidden;

          li {
            float: left;

            & + li > a {
              border-left: 1px solid #ddd;
            }

            &.active {
              a {
                // border: 0;
                background: #e1251b;
                color: #fff;
              }
            }

            a {
              display: block;
              height: 40px;
              line-height: 40px;
              padding: 0 11px;
              text-align: center;
              color: #666;
              background: #fcfcfc;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }
          }
        }

        .tab-content {
          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .goods-intro {
                padding-left: 10px;

                li {
                  margin: 10px 0;
                }
              }

              .intro-detail {
                img {
                  width: 100%;
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