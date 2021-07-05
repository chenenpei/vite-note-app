<template>
    <textarea id="my-text-area" />
    <n-divider />
    <div class="extra">
        <n-button @click="handleSubmit">提交</n-button>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { NButton, NDivider, useMessage } from "naive-ui";

const router = useRouter();
const store = useStore();
const message = useMessage();
const content = computed(() => store.state.content);

let easyMDE;
let interval;

onMounted(() => {
    const dom = document.getElementById("my-text-area");
    easyMDE = new EasyMDE({
        element: dom,
        toolbar: [
            "bold",
            "italic",
            "heading",
            "|",
            "quote",
            "unordered-list",
            "ordered-list",
            "|",
            "link",
            "image",
        ],
        spellChecker: false
    });
    if (content.value) easyMDE.value(content.value);

    // auto save in every 10s
    interval = setInterval(() => {
        store.commit("updateContent", easyMDE.value());
        message.success('已自动保存')
    }, 30000);
});

onBeforeUnmount(() => {
    clearInterval(interval);
});

const handleSubmit = () => {
    store.commit("updateContent", easyMDE.value());
    message.success('保存成功')
};
</script>

<style lang="postcss" scoped>
.extra {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>
