<template>
  <div class="home">
    <Scene />
    <BigScreen />
  </div>
</template>

<script setup>
import Scene from "@/components/scene.vue";
import BigScreen from "@/components/BigScreen.vue";
import { onMounted, reactive } from "vue";
import { getSmartCityList } from "@/api/api";

const dataInfo = reactive({});

onMounted(async () => {
  const res = await getSmartCityList();
  dataInfo.iot = res.data.iot;
  dataInfo.event = res.data.event;
  dataInfo.power = res.data.power;
  dataInfo.test = res.data.test;
});
</script>
