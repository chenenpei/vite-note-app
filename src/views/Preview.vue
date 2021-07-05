<template>
    <n-card>
        <div id="content" v-if="content" />
        <div v-else class="empty">暂无内容</div>
    </n-card>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import marked from "marked";
import { NCard, NH4 } from "naive-ui";

const store = useStore();
const content = computed(() => store.state.content);

onMounted(() => {
    if (content.value) {
        document.getElementById("content").innerHTML = marked(content.value);
    }
});
</script>

<style lang="postcss" scoped>
.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
}
</style>
