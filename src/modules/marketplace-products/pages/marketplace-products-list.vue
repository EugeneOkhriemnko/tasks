<template>
  <VcBlade
    :title="$t('MP_PRODUCTS.PAGES.LIST.TITLE')"
    :expanded="expanded"
    :closable="closable"
    width="50%"
    :toolbarItems="bladeToolbar"
    @close="$emit('close:blade')"
  >
    <!-- Blade contents -->
    <VcTable
      class="grow basis-0"
      :loading="loading"
      :expanded="expanded"
      :columns="columns"
      :items="products"
      :itemActionBuilder="actionBuilder"
      :sort="sort"
      :pages="pages"
      :currentPage="currentPage"
      :searchPlaceholder="$t('MP_PRODUCTS.PAGES.LIST.SEARCH.PLACEHOLDER')"
      :totalLabel="$t('MP_PRODUCTS.PAGES.LIST.TABLE.TOTALS')"
      :searchValue="searchValue"
      :activeFilterCount="activeFilterCount"
      :selectedItemId="selectedItemId"
      @search:change="onSearchList"
      :totalCount="totalCount"
      @itemClick="onItemClick"
      @headerClick="onHeaderClick"
      @paginationClick="onPaginationClick"
      @scroll:ptr="reload"
    >
      <!-- Not found template -->
      <template v-slot:notfound>
        <div
          class="w-full h-full box-border flex flex-col items-center justify-center"
        >
          <img :src="emptyImage" />
          <div class="m-4 text-xl font-medium">
            {{ $t("MP_PRODUCTS.PAGES.LIST.NOT_FOUND.EMPTY") }}
          </div>
          <VcButton @click="resetSearch">{{
            $t("MP_PRODUCTS.PAGES.LIST.NOT_FOUND.RESET")
          }}</VcButton>
        </div>
      </template>

      <!-- Empty template -->
      <template v-slot:empty>
        <div
          class="w-full h-full box-border flex flex-col items-center justify-center"
        >
          <img :src="emptyImage" />
          <div class="m-4 text-xl font-medium">
            {{ $t("MP_PRODUCTS.PAGES.LIST.EMPTY.NO_PRODUCTS") }}
          </div>
          <VcButton @click="addProduct">{{
            $t("MP_PRODUCTS.PAGES.LIST.EMPTY.ADD")
          }}</VcButton>
        </div>
      </template>

      <!-- Override name column template -->
      <template v-slot:item_name="itemData">
        <div class="flex flex-col">
          <div class="truncate">
            {{ itemData.item.name }}
          </div>
          <VcHint class="truncate mt-1">
            {{ itemData.item.path }}
          </VcHint>
        </div>
      </template>

      <!-- Override status column template -->
      <template v-slot:item_status="itemData">
        <mp-product-status :status="itemData.item.status" class="mb-1" />
      </template>

      <template v-slot:mobile-item="itemData">
        <div
          class="border-b border-solid border-b-[#e3e7ec] p-3 flex flex-nowrap"
        >
          <VcImage
            class="shrink-0"
            aspect="1x1"
            size="m"
            :bordered="true"
            :src="itemData.item.imgSrc"
          />
          <div class="grow basis-0 ml-3">
            <div class="font-bold text-lg">
              {{ itemData.item.name }}
            </div>
            <VcHint class="mt-1">{{ itemData.item.path }}</VcHint>

            <div class="mt-2 mb-3">
              <mp-product-status class="mt-3" :status="itemData.item.status" />
            </div>

            <div class="mt-3 w-full flex justify-between">
              <div
                class="truncate grow basis-0 mr-2"
              >
                <VcHint>{{
                  $t("MP_PRODUCTS.PAGES.LIST.MOBILE.EAN_GTIN")
                }}</VcHint>
                <div
                  class="truncate mt-1"
                >
                  {{
                    itemData.item.productData && itemData.item.productData.gtin
                  }}
                </div>
              </div>
              <div
                class="truncate grow basis-0 mr-2"
              >
                <VcHint>{{
                  $t("MP_PRODUCTS.PAGES.LIST.MOBILE.CREATED")
                }}</VcHint>
                <div
                  class="truncate mt-1"
                >
                  {{
                    itemData.item.createdDate &&
                    moment(itemData.item.createdDate).fromNow()
                  }}
                </div>
              </div>
              <div
                class="truncate grow basis-0 mr-2"
              >
                <div class="flex flex-col items-center">
                  <VcHint>{{
                    $t("MP_PRODUCTS.PAGES.LIST.MOBILE.PUBLISHED")
                  }}</VcHint>
                  <div
                    class="truncate mt-1"
                  >
                    <VcStatusIcon
                      :status="itemData.item && itemData.item.isPublished"
                    ></VcStatusIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </VcTable>
  </VcBlade>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  shallowRef,
} from "vue";

export default defineComponent({
  url: "/mp-products",
});
</script>

<script lang="ts" setup>
import {
  IBladeEvent,
  IBladeToolbar,
  useFunctions,
  useI18n,
  useLogger,
  IActionBuilderResult,
  ITableColumns,
} from "@vc-shell/framework";
import moment from "moment";
import { ISellerProduct } from "../../../api_client/marketplacevendor";
import MpProductStatus from "../components/MpProductStatus.vue";
import { useProducts } from "../composables";
import MpProductsEdit from "./marketplace-products-edit.vue";
// eslint-disable-next-line import/no-unresolved
import emptyImage from "/assets/empty.png";

export interface Props {
  expanded?: boolean;
  closable?: boolean;
  param?: string;
}

export interface Emits {
  (event: "close:blade"): void;
  (event: "open:blade", blade: IBladeEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  expanded: true,
  closable: true,
  param: undefined,
});

const emit = defineEmits<Emits>();
const logger = useLogger();
const { debounce } = useFunctions();
const { t } = useI18n();

const {
  products,
  totalCount,
  pages,
  currentPage,
  loadProducts,
  loading,
  searchQuery,
  exportCategories,
} = useProducts({ isPublished: true, searchFromAllSellers: true });
const filter = reactive<{
  status?: string[];
}>({ status: [] });
const appliedFilter = ref({});

const sort = ref("createdDate:DESC");
const searchValue = ref();
const selectedItemId = ref();

watch(sort, async (value) => {
  await loadProducts({ ...searchQuery.value, sort: value });
});

onMounted(async () => {
  selectedItemId.value = props.param;
  await loadProducts({ sort: sort.value });
});

const reload = async () => {
  logger.debug("Products list reload");
  await loadProducts({
    ...searchQuery.value,
    skip: (currentPage.value - 1) * searchQuery.value.take,
    sort: sort.value,
  });
};

const onSearchList = debounce(async (keyword: string) => {
  logger.debug(`Products list search by ${keyword}`);
  searchValue.value = keyword;
  await loadProducts({
    ...searchQuery.value,
    keyword,
  });
}, 200);

const bladeToolbar = ref<IBladeToolbar[]>([
  {
    id: "refresh",
    title: computed(() => t("MP_PRODUCTS.PAGES.LIST.TOOLBAR.REFRESH")),
    icon: "fas fa-sync-alt",
    async clickHandler() {
      await reload();
    },
  },
  {
    id: "add",
    title: computed(() => t("MP_PRODUCTS.PAGES.LIST.TOOLBAR.ADD")),
    icon: "fas fa-plus",
    async clickHandler() {
      emit("open:blade", {
        component: shallowRef(MpProductsEdit),
      });
    },
  },
  {
    id: "export",
    title: computed(() =>
      t("MP_PRODUCTS.PAGES.LIST.TOOLBAR.EXPORT_CATEGORIES")
    ),
    icon: "fas fa-file-export",
    async clickHandler() {
      await exportCategories();
    },
  },
  {
    id: "batchDelete",
    title: computed(() => t("MP_PRODUCTS.PAGES.LIST.TOOLBAR.BULK_DELETE")),
    icon: "fas fa-trash",
    isVisible: false,
    async clickHandler() {
      logger.debug("Delete selected products");
    },
  },
]);

const tableColumns = ref<ITableColumns[]>([
  {
    id: "imgSrc",
    title: computed(() => t("MP_PRODUCTS.PAGES.LIST.TABLE.HEADER.IMAGE")),
    width: 60,
    type: "image",
  },
  {
    id: "name",
    title: computed(() => t("MP_PRODUCTS.PAGES.LIST.TABLE.HEADER.NAME")),
    sortable: true,
    width: 100,
    alwaysVisible: true,
  },
  {
    id: "createdDate",
    title: computed(() =>
      t("MP_PRODUCTS.PAGES.LIST.TABLE.HEADER.CREATED_DATE")
    ),
    width: 140,
    sortable: true,
    type: "date-ago",
  },
  {
    id: "isPublished",
    title: computed(() => t("MP_PRODUCTS.PAGES.LIST.TABLE.HEADER.PUBLISHED")),
    type: "status-icon",
    width: 180,
    align: "center",
    sortable: true,
  },
  {
    id: "status",
    title: computed(() => t("MP_PRODUCTS.PAGES.LIST.TABLE.HEADER.STATUS")),
    width: 180,
    sortable: true,
    alwaysVisible: true,
  },
  {
    id: "gtin",
    field: "productData.gtin",
    title: computed(() => t("MP_PRODUCTS.PAGES.LIST.TABLE.HEADER.GTIN")),
    width: 180,
    alwaysVisible: true,
  },
]);

const columns = computed(() => {
  if (props.expanded) {
    return tableColumns.value;
  } else {
    return tableColumns.value.filter((item) => item.alwaysVisible === true);
  }
});

const title = computed(() => t("MP_PRODUCTS.PAGES.LIST.TITLE"));
const activeFilterCount = computed(
  () => Object.values(appliedFilter.value).filter((item) => !!item).length
);

const onItemClick = (item: { id: string }) => {
  emit("open:blade", {
    component: shallowRef(MpProductsEdit),
    param: item.id,
    onOpen() {
      selectedItemId.value = item.id;
    },
    onClose() {
      selectedItemId.value = undefined;
    },
  });
};

const onHeaderClick = (item: ITableColumns) => {
  const sortBy = [":DESC", ":ASC", ""];
  if (item.sortable) {
    item.sortDirection = (item.sortDirection ?? 0) + 1;
    if (sortBy[item.sortDirection % 3] === "") {
      sort.value = `${sortBy[item.sortDirection % 3]}`;
    } else {
      sort.value = `${item.id}${sortBy[item.sortDirection % 3]}`;
    }
  }
};

const onPaginationClick = async (page: number) => {
  await loadProducts({
    ...searchQuery.value,
    skip: (page - 1) * searchQuery.value.take,
  });
};

const actionBuilder = (product: ISellerProduct): IActionBuilderResult[] => {
  let result = [];

  // const statuses =
  //   product.status?.split(",").map((item) => item.trim()) || [];

  /*if (statuses.includes("Published")) {
        result.push({
          icon: "fas fa-times",
          title: computed(() => t("MP_PRODUCTS.PAGES.LIST.ACTIONS.UNPUBLISH")),
          variant: "danger",
          clickHandler() {
            alert("Unpublish");
          },
        });
      } else {
        result.push({
          icon: "fas fa-check",
          title: computed(() => t("MP_PRODUCTS.PAGES.LIST.ACTIONS.PUBLISH")),
          variant: "success",
          clickHandler() {
            alert("Publish");
          },
        });
      }

      result.push({
        icon: "fas fa-trash",
        title: "Delete",
        variant: "danger",
        leftActions: true,
        clickHandler(item: ISellerProduct) {
          if (window.confirm("Delete " + item.id)) {
          }
        },
      });*/

  /*result.push(
        ...[
          {
            icon: "fas fa-clock",
            title: "Other action",
            clickHandler() {
              alert("Other action");
            },
          },
          {
            icon: "fas fa-clock",
            title: "Other action2",
            clickHandler() {
              alert("Other action");
            },
          },
        ]
      );*/

  return result;
};

async function resetSearch() {
  searchValue.value = "";
  Object.keys(filter).forEach((key: string) => (filter[key] = undefined));
  await loadProducts({
    ...searchQuery.value,
    ...filter,
    keyword: "",
  });
  appliedFilter.value = {};
}

function addProduct() {
  emit("open:blade", {
    component: shallowRef(MpProductsEdit),
  });
}

defineExpose({
  reload,
  title,
});
</script>
