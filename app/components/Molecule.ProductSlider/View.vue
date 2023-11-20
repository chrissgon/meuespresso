<template>
  <section
    id="slider"
    class="w-full [&_*]:pointer-events-none [&_*]:select-none max-w-full lg:max-w-[45%] h-[500px] relative rounded-3xl px-10 md:px-14 py-14 flex flex-col justify-center items-center overflow-hidden text-white bg-gray-900"
  >
    <!-- loading -->
    <MoleculeProductSliderLoading v-show="loading" />

    <!-- error -->
    <MoleculeProductSliderError v-show="error" />

    <!-- view -->
    <article
      v-show="!loading && !error"
      class="flex flex-col justify-center items-center bg-gray-900"
      @mouseleave="refreshSlideTimer"
      @mouseenter="stopSlideTimer"
    >
      <!-- image -->
      <figure
        class="h-24 pointer-events-none sm:h-44 md:-mt-24 -mt-14 flex justify-center items-center"
      >
        <img
          :src="getCurrentProduct?.image"
          :alt="getCurrentProduct?.name"
          class="w-full max-w-[500px]"
        >
      </figure>

      <!-- info -->
      <article class="text-center mt-10">
        <h4 class="lora font-bold md:text-2xl text-xl">
          {{ getCurrentProduct?.name }}
        </h4>
        <p class="mt-4 text-lg">
          {{ getCurrentProduct?.description }}
        </p>
      </article>

      <!-- slider -->
      <footer
        class="absolute bottom-16 w-full flex justify-center items-center gap-2"
      >
        <span
          v-for="slide in numberOfSlides"
          :key="slide"
          class="w-2.5 h-2.5 rounded-full bg-white cursor-pointer"
          :class="{ 'opacity-50': !isActive(slide) }"
          @click="setSlide(slide)"
        />
      </footer>
    </article>
  </section>
</template>

<script setup lang="ts">
import { IProduct, IProducts } from "~/types";

// props
interface IProps {
  products: IProducts | null;
  loading?: boolean;
  error?: string;
}
const props = defineProps<IProps>();

// computed
const numberOfSlides = computed<number>(() => {
  if (!props.products) return 0;
  if (props.products.length < 3) {
    return props.products.length;
  }
  return 3;
});
const isActive = computed<Function>(() => (slide: number) => {
  return currentSlide.value === slide;
});
const getCurrentProduct = computed<IProduct | null>(() => {
  if (!props.products) return null;
  return props.products[currentSlide.value - 1];
});

// data
const currentSlide = ref<number>(1);
const slideTimer = ref<any>(null);

// methods
function setSlide(slide: number): void {
  currentSlide.value = slide;
}
function refreshSlideTimer(): void {
  stopSlideTimer();
  slideTimer.value = setInterval(() => {
    setSlide(getNextSlide());
  }, 5000);
}
function getNextSlide(): number {
  return currentSlide.value === numberOfSlides.value
    ? 1
    : currentSlide.value + 1;

  // math expression
  // next = (numberOfSlides.value - (numberOfSlides.value - currentSlide.value)) + 1
  // const total = numberOfSlides.value;
  // const sub = total - currentSlide.value || total;
  // const diff = total - sub;
  // return diff + 1;
}
function getPreviouSlide(): number {
  return currentSlide.value - 1 || numberOfSlides.value;
}
function stopSlideTimer(): void {
  clearInterval(slideTimer.value);
}
function initMouseSlider(): void {
  if (!process.client) return;

  let touchstartX = 0;
  let touchendX = 0;

  function checkDirection() {
    if(Math.abs(touchstartX - touchendX) < 50) return

    if (touchendX < touchstartX) {
      currentSlide.value = getNextSlide();
      refreshSlideTimer();
    }
    if (touchendX > touchstartX) {
      currentSlide.value = getPreviouSlide();
      refreshSlideTimer();
    }
  }

  document.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  });
  document.addEventListener("mousedown", (e) => {
    touchstartX = e.screenX;
  });

  document.addEventListener("mouseup", (e) => {
    touchendX = e.screenX;
    checkDirection();
  });
}
refreshSlideTimer();
initMouseSlider()
</script>

<style scoped></style>
