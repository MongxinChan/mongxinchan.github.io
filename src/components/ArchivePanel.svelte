<script lang="ts">
import { onMount } from "svelte";
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";
import { getPostUrlBySlug } from "../utils/url-utils";

export let tags: string[] = [];
export let categories: string[] = [];
export let sortedPosts: Post[] = [];

// 1. 新增语言选择状态
let selectedLang = "all"; 

const params = new URLSearchParams(window.location.search);
tags = params.has("tag") ? params.getAll("tag") : [];
categories = params.has("category") ? params.getAll("category") : [];
const uncategorized = params.get("uncategorized");

interface Post {
    slug: string;
    data: {
        title: string;
        tags: string[];
        category?: string | null;
        published: Date;
        lang?: string; // ✅ 接口增加 lang 字段
    };
}

interface Group {
    year: number;
    posts: Post[];
}

let groups: Group[] = [];

function formatDate(date: Date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}-${day}`;
}

function formatTag(tagList: string[]) {
    return tagList.map((t) => `#${t}`).join(" ");
}

// 2. 将过滤逻辑封装为响应式函数
function filterAndGroup() {
    let filteredPosts: Post[] = sortedPosts;

    // 原有 标签 过滤
    if (tags.length > 0) {
        filteredPosts = filteredPosts.filter(
            (post) =>
                Array.isArray(post.data.tags) &&
                post.data.tags.some((tag) => tags.includes(tag)),
        );
    }

    // 原有 分类 过滤
    if (categories.length > 0) {
        filteredPosts = filteredPosts.filter(
            (post) => post.data.category && categories.includes(post.data.category),
        );
    }

    if (uncategorized) {
        filteredPosts = filteredPosts.filter((post) => !post.data.category);
    }

    // ✅ 新增：语言过滤逻辑
    if (selectedLang !== "all") {
        filteredPosts = filteredPosts.filter((post) => {
            // 如果文章没写 lang，默认为 zh_CN
            const postLang = post.data.lang || "zh_CN";
            return postLang === selectedLang;
        });
    }

    const grouped = filteredPosts.reduce(
        (acc, post) => {
            const year = post.data.published.getFullYear();
            if (!acc[year]) acc[year] = [];
            acc[year].push(post);
            return acc;
        },
        {} as Record<number, Post[]>,
    );

    const groupedPostsArray = Object.keys(grouped).map((yearStr) => ({
        year: Number.parseInt(yearStr, 10),
        posts: grouped[Number.parseInt(yearStr, 10)],
    }));

    groupedPostsArray.sort((a, b) => b.year - a.year);
    groups = groupedPostsArray;
}

// 3. 监听选择变化并执行更新
$: if (selectedLang || sortedPosts) {
    filterAndGroup();
}

onMount(async () => {
    filterAndGroup();
});
</script>

<div class="card-base px-8 py-6">
    <div class="flex flex-row gap-2 mb-6 bg-black/5 dark:bg-white/5 p-1 rounded-xl w-fit">
        {#each [
            { id: 'all', label: '全部' },
            { id: 'zh_CN', label: '中文' },
            { id: 'en', label: 'English' }
        ] as tab}
            <button 
                on:click={() => selectedLang = tab.id}
                class="px-4 py-1.5 rounded-lg text-sm transition-all {selectedLang === tab.id ? 'bg-white dark:bg-zinc-800 shadow-sm text-[var(--primary)] font-bold' : 'text-50 hover:text-75'}"
            >
                {tab.label}
            </button>
        {/each}
    </div>

    {#each groups as group}
        <div>
            <div class="flex flex-row w-full items-center h-[3.75rem]">
                <div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
                    {group.year}
                </div>
                <div class="w-[15%] md:w-[10%]">
                    <div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div>
                </div>
                <div class="w-[70%] md:w-[80%] transition text-left text-50">
                    {group.posts.length} {i18n(group.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount)}
                </div>
            </div>

            {#each group.posts as post}
                <a
                    href={getPostUrlBySlug(post.slug)}
                    aria-label={post.data.title}
                    class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
                >
                    <div class="flex flex-row justify-start items-center h-full">
                        <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                            {formatDate(post.data.published)}
                        </div>

                        <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                            <div class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5 bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)] outline outline-4 z-50 outline-[var(--card-bg)] group-hover:outline-[var(--btn-plain-bg-hover)]"></div>
                        </div>

                        <div class="flex items-center w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)] text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden">
                            <span>{post.data.title}</span>
                            
                            {#if post.data.lang === 'en'}
                                <span class="ml-2 text-[9px] px-1.5 py-0.5 border border-[var(--primary)]/30 text-[var(--primary)] rounded uppercase font-mono leading-none">
                                    EN
                                </span>
                            {/if}
                        </div>

                        <div class="hidden md:block md:w-[15%] text-left text-sm transition whitespace-nowrap overflow-ellipsis overflow-hidden text-30">
                            {formatTag(post.data.tags)}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/each}

    {#if groups.length === 0}
        <div class="text-center py-20 text-50 italic">
            没有找到对应语言的文章
        </div>
    {/if}
</div>