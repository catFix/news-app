<template>
  <main class="container text-black">
    <transition name="slide-down">
      <NewsSearching v-if="showSearch" @search="handleSearch" @close-search="closeSearch" />
    </transition>

    <h1 class="text-3xl font-bold mb-4 mt-8">Featured Articles</h1>

    <LoadingSpinner :isLoading="isLoading" />

    <div :class="{ 'opacity-50': isLoading }">
      <div class="relative mb-8">
        <div class="flex items-center justify-between mb-4 arrow-container">
          <button @click="scrollLeft" class="arrow-btn">
            <i class="fa fa-arrow-left"></i>
          </button>
          <button @click="scrollRight" class="arrow-btn">
            <i class="fa fa-arrow-right"></i>
          </button>
        </div>
        <div class="button-container">
          <button @click="filterCategory('')" class="btn-filter">All</button>
          <button @click="filterCategory('business')" class="btn-filter">Business</button>
          <button @click="filterCategory('technology')" class="btn-filter">Technology</button>
          <button @click="filterCategory('entertainment')" class="btn-filter">Entertainment</button>
          <button @click="filterCategory('health')" class="btn-filter">Health</button>
          <button @click="filterCategory('science')" class="btn-filter">Science</button>
          <button @click="filterCategory('sports')" class="btn-filter">Sports</button>
        </div>
      </div>

      <div v-if="!isLoading && articles.length === 0 && initialLoadComplete" class="text-center text-gray-500">
        <p>No articles found. Please try a different search or category.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FadeUp v-for="article in displayedArticles" :key="article.url" class="article-card">
          <img @click="openModal(article)" :src="article.urlToImage" :alt="article.source.name" class="w-full h-48 object-cover rounded-t-lg cursor-pointer">
          <div class="p-4">
            <h2 @click="openModal(article)" class="text-xl font-bold cursor-pointer">{{ article.title }}</h2>
            <p class="text-gray-600">{{ article.description }}</p>
            <a :href="article.url" target="_blank" class="text-primary hover:underline">Read more</a>
          </div>
        </FadeUp>
      </div>

      <div v-if="!isLoading && articles.length > displayedArticles.length" class="text-center my-4">
        <button @click="loadMoreArticles" class="btn-load-more">Load more</button>
      </div>
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="closeModal">
      <div v-if="selectedArticle" class="space-y-4">
        <img :src="selectedArticle.urlToImage" alt="" class="w-full h-64 object-cover mb-4 rounded-lg">
        <h2 class="text-2xl font-bold mb-2">{{ selectedArticle.title }}</h2>
        <p class="text-gray-600"><strong>Author:</strong> {{ selectedArticle.author }}</p>
        <p class="text-gray-600"><strong>Source:</strong> {{ selectedArticle.source.name }}</p>
        <p class="text-gray-600"><strong>Published At:</strong> {{ new Date(selectedArticle.publishedAt).toLocaleString() }}</p>
        <p class="text-gray-600"><strong>Description:</strong> {{ selectedArticle.description }}</p>
        <div class="text-gray-600">
          <strong>Content:</strong>
          <p class="whitespace-pre-line">{{ selectedArticle.content }}</p>
        </div>
        <a :href="selectedArticle.url" target="_blank" class="text-primary hover:underline">Read more</a>
      </div>
    </BaseModal>
  </main>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import axios from "axios";
import SiteNav from "../components/SiteNav.vue";
import NewsSearching from "../components/NewsSearching.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import BaseModal from "../components/BaseModal.vue";
import FadeUp from "../components/FadeUp.vue";
import { on, eventBus } from "../utils/eventBus";

export default {
  components: {
    SiteNav,
    NewsSearching,
    LoadingSpinner,
    BaseModal,
    FadeUp,
  },
  setup() {
    const articles = ref([]);
    const displayedArticles = ref([]);
    const category = ref("");
    const showSearch = ref(false);
    const isLoading = ref(false);
    const initialLoadComplete = ref(false);
    const modalActive = ref(false);
    const selectedArticle = ref(null);
    let initialLoad = true;
    const articlesPerPage = 18;
    let currentPage = 0;

    const fetchArticles = async (filters = {}) => {
      isLoading.value = true;
      const currentArticles = [...articles.value];
      try {
        let url;
        let params;

        if (Object.keys(filters).length === 0) {
          url = 'https://newsapi.org/v2/top-headlines';
          params = {
            country: 'us',
            category: category.value,
            apiKey: 'e96e0c122aea496696f7d00dd29f6236',
          };
        } else {
          url = 'https://newsapi.org/v2/everything';
          params = {
            q: filters.query,
            from: filters.startDate,
            to: filters.endDate,
            sources: filters.source,
            apiKey: 'e96e0c122aea496696f7d00dd29f6236',
          };
        }

        const responsePromise = axios.get(url, { params });
        const delay = initialLoad ? 0 : 900;
        const timeoutPromise = new Promise(resolve => setTimeout(resolve, delay));

        const [response] = await Promise.all([responsePromise, timeoutPromise]);
        articles.value = response.data.articles.filter(article => 
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.content !== "[Removed]"
        );
        displayedArticles.value = articles.value.slice(0, articlesPerPage);
        nextTick(() => {
          
        });
      } catch (error) {
        console.error("Error fetching articles:", error);
        articles.value = currentArticles;
      } finally {
        isLoading.value = false;
        initialLoadComplete.value = true;
        initialLoad = false;
      }
    };

    const filterCategory = (cat) => {
      category.value = cat;
      fetchArticles();
    };

    const handleSearch = (filters) => {
      fetchArticles(filters);
    };

    const toggleSearch = () => {
      showSearch.value = !showSearch.value;
    };

    const closeSearch = () => {
      showSearch.value = false;
    };

    const scrollLeft = () => {
      const container = document.querySelector('.button-container');
      container.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
      const container = document.querySelector('.button-container');
      container.scrollBy({ left: 200, behavior: 'smooth' });
    };

    const openModal = (article) => {
      selectedArticle.value = article;
      modalActive.value = true;
    };

    const closeModal = () => {
      modalActive.value = false;
    };

    const loadMoreArticles = () => {
      const nextPage = currentPage + 1;
      const start = nextPage * articlesPerPage;
      const end = start + articlesPerPage;
      displayedArticles.value = displayedArticles.value.concat(articles.value.slice(start, end));
      currentPage = nextPage;
    };

    onMounted(() => {
      fetchArticles();
      on('toggle-search', toggleSearch);
    });

    onBeforeUnmount(() => {
      eventBus.value.set('toggle-search', eventBus.value.get('toggle-search').filter(handler => handler !== toggleSearch));
    });

    return {
      articles,
      displayedArticles,
      filterCategory,
      handleSearch,
      showSearch,
      isLoading,
      scrollLeft,
      scrollRight,
      toggleSearch,
      closeSearch,
      initialLoadComplete,
      modalActive,
      selectedArticle,
      openModal,
      closeModal,
      loadMoreArticles,
    };
  }
};
</script>

<style scoped>
.btn-filter {
  @apply bg-primary text-white py-2 px-4 rounded-md border border-transparent hover:bg-white hover:text-primary hover:border-primary duration-150 mx-2;
}

.article-card {
  @apply bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer;
}

.article-card img {
  @apply w-full h-48 object-cover rounded-t-lg;
}

.btn-load-more {
  @apply bg-primary text-white py-2 px-4 rounded-md border border-transparent hover:bg-white hover:text-primary hover:border-primary duration-150 mx-2;
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
}

.slide-down-enter-to, .slide-down-leave-from {
  opacity: 1;
}

.button-container {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.button-container::-webkit-scrollbar {
  display: none;
}

.arrow-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}

.arrow-btn:hover {
  color: #666;
}

@media (max-width: 1020px) {
  .arrow-btn {
    display: block;
  }
  .btn-filter {
    @apply mx-1;
  }
}
</style>
