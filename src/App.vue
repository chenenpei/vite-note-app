<template>
    <div id="app">
        <n-layout>
            <n-layout-header>
                <h1>极简笔记</h1>
                <div class="actions">
                    <n-button @click="handleJump">
                        <span>{{ routeName }} </span>
                    </n-button>
                </div>
            </n-layout-header>
            <n-layout-content>
                <n-message-provider>
                    <router-view />
                </n-message-provider>
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NGridItem,
    NGrid,
    NH1,
    NButton,
    NMessageProvider,
} from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import { ChevronRightFilled } from "@vicons/material";
const store = useStore();
const route = useRoute();
const router = useRouter();
const routeName = computed(() => {
    if (route.name === "main") return "预览";
    if (route.name === "preview") return "编辑";
});

onMounted(() => {
    let myData = localStorage.getItem("myData");
    if (myData) {
        myData = JSON.parse(myData);
        store.commit("updateContent", myData);
    }
    router.replace("preview");
});

const storeData = () => {
    const content = store.state.content;
    localStorage.setItem("myData", JSON.stringify(content));
};
window.addEventListener("beforeunload", storeData);

const handleJump = () => {
    if (route.name === "main") router.push("preview");
    if (route.name === "preview") router.push("main");
};
</script>

<style lang="postcss" scoped>
#app {
    background: #f5f5f5;

    & .n-layout-header {
        /* text-align: center; */
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        justify-content: center;

        & h1 {
            flex: 1;
            text-align: center;
        }

        & .actions {
            position: absolute;
            right: 0;
            padding-right: 16px;
        }
    }

    & .n-layout-content {
        margin: auto;
        padding: 16px;
        max-width: 720px;
    }
}
</style>
