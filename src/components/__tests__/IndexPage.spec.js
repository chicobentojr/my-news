import { describe, expect, it, vi } from "vitest";

import IndexPage from "@/pages/IndexPage.vue";
import { createStore } from "vuex";
import { mount } from "@vue/test-utils";

describe("IndexPage", () => {
  it("renders news list with multiple items successfully", () => {
    const mockStore = createStore({
      state: {
        favoriteNews: [],
      },
    });

    const wrapper = mount(IndexPage, {
      data: () => ({
        sources: ["BBC"],
        filteredNews: [
          { title: "News #1", source: { name: "BBC" } },
          { title: "News #2", source: { name: "BBC" } },
          { title: "News #3", source: { name: "BBC" } },
        ],
        loadingNews: false,
      }),
      global: {
        plugins: [mockStore],
      },
    });

    const items = wrapper.findAll(".news-item");
    expect(items.length).toBe(3);
  });

  it("update news selected successfully", async () => {
    const mockStore = createStore({
      state: {
        favoriteNews: [],
      },
    });

    const wrapper = mount(IndexPage, {
      data: () => ({
        sources: ["BBC"],
        filteredNews: [
          { title: "News #1", source: { name: "BBC" } },
          { title: "News #2", source: { name: "BBC" } },
          { title: "News #3", source: { name: "BBC" } },
        ],
        loadingNews: false,
      }),
      global: {
        plugins: [mockStore],
      },
    });
    expect(wrapper.vm.newsSelected).toBe(null);

    const firstNews = wrapper.findAll(".news-item").at(1);
    expect(firstNews.exists()).toBe(true);
    firstNews.trigger("click");

    expect(wrapper.vm.newsSelected).toBe(wrapper.vm.filteredNews[1]);
  });
});
