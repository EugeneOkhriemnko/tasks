import { Ref, ref, computed } from "vue";
import { useLogger, useUser } from "@virtoshell/core";

import {
  VcmpSellerCatalogClient,
  ISellerProduct,
  ISearchProductsQuery,
  SearchProductsQuery,
  SearchProductsResult,
  SellerProductStatus,
} from "../../../../api_client";
import {
  ExportClient,
  ExportDataQuery,
  ExportDataRequest,
  PlatformExportPushNotification,
} from "@virtoshell/api-client";

interface IUseProducts {
  readonly products: Ref<ISellerProduct[]>;
  readonly totalCount: Ref<number>;
  readonly pages: Ref<number>;
  readonly loading: Ref<boolean>;
  searchQuery: Ref<ISearchProductsQuery>;
  currentPage: Ref<number>;
  loadProducts: (query: ISearchProductsQuery) => void;
  SellerProductStatus: typeof SellerProductStatus;
  exportCategories: () => void;
}

interface IUseProductOptions {
  pageSize?: number;
  sort?: string;
  keyword?: string;
  isPublished?: boolean;
  SearchFromAllSellers?: boolean;
}

export default (options?: IUseProductOptions): IUseProducts => {
  const logger = useLogger();

  const pageSize = options?.pageSize || 20;
  const searchQuery = ref<ISearchProductsQuery>({
    take: pageSize,
    sort: options?.sort,
    keyword: options?.keyword,
    isPublished: options?.isPublished,
    SearchFromAllSellers: options?.SearchFromAllSellers,
  });
  const searchResult = ref<SearchProductsResult>();
  const loading = ref(false);

  async function getApiClient(): Promise<VcmpSellerCatalogClient> {
    const { getAccessToken } = useUser();
    const client = new VcmpSellerCatalogClient();
    client.setAuthToken(await getAccessToken());
    return client;
  }

  async function loadProducts(query: ISearchProductsQuery) {
    logger.info(
      `Load products page ${query?.skip || 1} sort by ${
        query?.sort || "default"
      }`
    );

    searchQuery.value = { ...searchQuery.value, ...query };
    const client = await getApiClient();
    try {
      loading.value = true;
      searchResult.value = await client.searchProducts({
        ...searchQuery.value,
      } as SearchProductsQuery);
    } catch (e) {
      logger.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function exportCategories() {
    const { getAccessToken } = useUser();
    const authToken = await getAccessToken();

    try {
      loading.value = true;
      const result = await fetch("/api/vcmp/seller/categories/export", {
        method: "POST",
        body: JSON.stringify({
          exportTypeName:
            "VirtoCommerce.MarketplaceVendorModule.Data.ExportImport.ExportableCategory",
          dataQuery: {
            ExportTypeName: "CategoryExportDataQuery",
            includedProperties: [
              {
                fullName: "Name",
                group: "ExportableCategory",
                displayName: "Name",
                isRequired: false,
              },
            ],
            isPreview: false,
          },
          providerName: "CsvExportProvider",
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json-patch+json",
        },
      });

      const blob = await result.blob();
      const newBlob = new Blob([blob]);

      const blobUrl = window.URL.createObjectURL(newBlob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `exported-categories.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      logger.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function exportCategories(): Promise<PlatformExportPushNotification> {
    const { getAccessToken } = useUser();
    const client = new ExportClient();
    client.setAuthToken(await getAccessToken());

    const command = new ExportDataRequest({
      exportTypeName:
        "VirtoCommerce.MarketplaceVendorModule.Data.ExportImport.ExportableCategory",
      dataQuery: new ExportDataQuery({
        exportTypeName: "CategoryExportDataQuery",
      }),
      providerName: "CsvExportProvider",
    });

    try {
      loading.value = true;
      return await client.runExport(command);
    } catch (e) {
      logger.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    products: computed(() => searchResult.value?.results),
    totalCount: computed(() => searchResult.value?.totalCount),
    pages: computed(() => Math.ceil(searchResult.value?.totalCount / pageSize)),
    currentPage: computed(
      () => (searchQuery.value?.skip || 0) / Math.max(1, pageSize) + 1
    ),
    loading: computed(() => loading.value),
    searchQuery,
    loadProducts,
    exportCategories,
    SellerProductStatus,
  };
};
