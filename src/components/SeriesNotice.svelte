<!-- DIY自定义系列卡片 -->
<script lang="ts">
import { getPostUrlBySlug } from "../utils/url-utils";

interface SimplePost {
	slug: string;
	data: {
		title: string;
		tags: string[];
		published: Date | string;
	};
}

// 接收参数：当前文章的标签，以及所有文章的列表
export let currentTags: string[] = [];
export let allPosts: SimplePost[] = [];
export let currentSlug = "";

// 1. 定义你想要识别为“系列”的关键词
const seriesKeywords = [
	"CS61B",
	"CS205",
	"408",
	"MeachineLearning",
	"ComputerNetworks",
	"Operating System",
];

// 2. 找出当前文章属于哪个系列
$: seriesTag = currentTags.find((tag) => seriesKeywords.includes(tag));

// 3. 找出同系列的其他文章（排除掉当前这一篇）
$: otherPosts = seriesTag
	? allPosts
			.filter(
				(post) =>
					post.data.tags.includes(seriesTag) && post.slug !== currentSlug,
			)
			.sort(
				(a, b) =>
					new Date(a.data.published).getTime() -
					new Date(b.data.published).getTime(),
			)
	: [];

$: count = otherPosts.length;
</script>

{#if seriesTag && count > 0}
    <div class="mt-12 p-6 rounded-2xl bg-[var(--primary-light)]/10 border border-[var(--primary)]/20 transition-all hover:border-[var(--primary)]/40">
        <div class="flex items-center gap-3 mb-4">
            <div class="px-2 py-1 bg-[var(--primary)] text-white text-[10px] font-bold rounded uppercase tracking-wider">
                专题系列
            </div>
            <span class="text-75 font-bold">
                本文属于 <span class="text-[var(--primary)]">#{seriesTag}</span> 系列
            </span>
        </div>
        
        <p class="text-sm text-50 mb-4">
            该专题下还有 <span class="font-bold text-75">{count}</span> 篇相关笔记，点击继续探索：
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            {#each otherPosts as post}
                <a 
                    href={getPostUrlBySlug(post.slug)} 
                    class="group flex items-center p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
                >
                    <div class="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-[var(--primary)] mr-3 transition-colors"></div>
                    <span class="text-sm text-50 group-hover:text-[var(--primary)] truncate">
                        {post.data.title}
                    </span>
                </a>
            {/each}
        </div>
    </div>
{/if}