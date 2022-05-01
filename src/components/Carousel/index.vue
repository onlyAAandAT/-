<template>
  <div>
    <div class="swiper-container" id="floor2Swiper" ref="cur">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //监听list需要使用immediate进行一次立即监听，否者会因为list未变化而丢失监听
      immediate: true,
      handler() {
        //只能够监听到数据，但是v-for的动态结构还是没有办法确定，因此依旧需要用$nextTick()
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>