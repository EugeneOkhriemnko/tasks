<template>
  <VcBlade
    v-loading="loading || productLoading"
    :title="param ? productDetails?.name : $t('PRODUCTS.PAGES.DETAILS.TITLE')"
    width="50%"
    :expanded="expanded"
    :closable="closable"
    :toolbarItems="bladeToolbar"
    @close="$emit('close:blade')"
  >
    <template v-slot:actions>
      <mp-product-status :status="product.status"></mp-product-status>
    </template>

    <!-- Blade contents -->
    <VcContainer :no-padding="true">
      <div v-if="productDetails" class="product-details__inner">
        <div class="product-details__content">
          <div class="p-4">
            <VcStatus
              :outline="false"
              :extend="true"
              variant="light-danger"
              class="w-full box-border mb-5"
              v-if="statusText && product.status !== 'Published'"
            >
              <div class="flex flex-row items-center">
                <VcIcon
                  icon="fas fa-exclamation-circle"
                  class="product-details__decline-icon"
                  size="xxl"
                ></VcIcon>
                <div>
                  <div class="font-bold">
                    {{ $t("PRODUCTS.PAGES.DETAILS.DECLINE_REASON") }}
                  </div>
                  <div>{{ statusText }}</div>
                </div>
              </div>
            </VcStatus>
            <VcForm>
              <Field
                name="name"
                rules="required|min:3"
                :modelValue="productDetails.name"
                v-slot="{ field, errorMessage, handleChange }"
              >
                <VcInput
                  v-bind="field"
                  class="mb-4"
                  :label="$t('PRODUCTS.PAGES.DETAILS.FIELDS.NAME.TITLE')"
                  v-model="productDetails.name"
                  :clearable="true"
                  :placeholder="
                    $t('PRODUCTS.PAGES.DETAILS.FIELDS.NAME.PLACEHOLDER')
                  "
                  :disabled="readonly"
                  maxchars="64"
                  is-required
                  :error-message="errorMessage"
                  @update:modelValue="handleChange"
                ></VcInput>
              </Field>
              <Field
                name="categoryId"
                rules="required"
                :modelValue="productDetails.categoryId"
                v-slot="{ field, errorMessage, handleChange }"
              >
                <VcSelect
                  v-bind="field"
                  class="mb-4"
                  :label="$t('PRODUCTS.PAGES.DETAILS.FIELDS.CATEGORY.TITLE')"
                  v-model="productDetails.categoryId"
                  :isSearchable="true"
                  :clearable="false"
                  :placeholder="
                    $t('PRODUCTS.PAGES.DETAILS.FIELDS.CATEGORY.PLACEHOLDER')
                  "
                  :options="categories"
                  :initialItem="currentCategory"
                  keyProperty="id"
                  displayProperty="name"
                  :tooltip="
                    $t('PRODUCTS.PAGES.DETAILS.FIELDS.CATEGORY.TOOLTIP')
                  "
                  @search="onCategoriesSearch"
                  @close="onSelectClose"
                  @update:modelValue="
                    (e) => {
                      handleChange(e);
                      setCategory(e);
                    }
                  "
                  :is-disabled="readonly"
                  :onInfiniteScroll="onLoadMore"
                  :optionsTotal="categoriesTotal"
                  is-required
                  :error-message="errorMessage"
                >
                  <template v-slot:item="itemData">
                    <div class="flex items-center py-2 truncate">
                      <div class="grow basis-0 ml-4 truncate">
                        <div class="truncate">
                          {{ itemData.item.path }}
                        </div>
                        <VcHint class="truncate mt-1">
                          {{ $t("PRODUCTS.PAGES.DETAILS.FIELDS.CODE") }}:
                          {{ itemData.item.code }}
                        </VcHint>
                      </div>
                    </div>
                  </template>
                </VcSelect>
              </Field>
              <VcCard
                :header="$t('PRODUCTS.PAGES.DETAILS.FIELDS.TITLE')"
                is-collapsable
                :is-collapsed="restoreCollapsed('product_properties')"
                v-if="product.id || currentCategory"
                @state:collapsed="handleCollapsed('product_properties', $event)"
              >
                <div class="p-4">
                  <Field
                    name="gtin"
                    :rules="validateGtin"
                    :modelValue="productDetails.gtin"
                    v-slot="{ field, errorMessage, handleChange }"
                  >
                    <VcInput
                      v-bind="field"
                      class="mb-4"
                      :label="$t('PRODUCTS.PAGES.DETAILS.FIELDS.GTIN.TITLE')"
                      v-model="productDetails.gtin"
                      :clearable="true"
                      :placeholder="
                        $t('PRODUCTS.PAGES.DETAILS.FIELDS.GTIN.PLACEHOLDER')
                      "
                      :tooltip="
                        $t('PRODUCTS.PAGES.DETAILS.FIELDS.GTIN.TOOLTIP')
                      "
                      :disabled="readonly"
                      maxchars="64"
                      is-required
                      :error-message="errorMessage"
                      @update:modelValue="handleChange"
                    ></VcInput>
                  </Field>
                  <Field
                    name="description"
                    rules="min:3|required"
                    v-slot="{ field, errorMessage, handleChange }"
                  >
                    <VcTextarea
                      v-bind="field"
                      class="mb-4"
                      :label="
                        $t('PRODUCTS.PAGES.DETAILS.FIELDS.DESCRIPTION.TITLE')
                      "
                      v-model="productDetails.description"
                      :placeholder="
                        $t(
                          'PRODUCTS.PAGES.DETAILS.FIELDS.DESCRIPTION.PLACEHOLDER'
                        )
                      "
                      :disabled="readonly"
                      name="description"
                      is-required
                      :error-message="errorMessage"
                      @update:modelValue="handleChange"
                    ></VcTextarea>
                  </Field>

                  <VcDynamicProperty
                    v-for="property in filteredProps"
                    :key="property.id"
                    :property="property"
                    :optionsGetter="loadDictionaries"
                    :getter="getPropertyValue"
                    :setter="setPropertyValue"
                    class="mb-4"
                    :disabled="readonly"
                  >
                  </VcDynamicProperty>
                </div>
              </VcCard>

              <VcCard
                v-if="productDetails.categoryId"
                :header="$t('PRODUCTS.PAGES.DETAILS.FIELDS.IMAGES.TITLE')"
                class="my-3 relative"
                is-collapsable
                :is-collapsed="restoreCollapsed('product_gallery')"
                @state:collapsed="handleCollapsed('product_gallery', $event)"
              >
                <VcLoading :active="fileUploading"></VcLoading>
                <div class="p-2">
                  <VcGallery
                    :images="productDetails.images"
                    @upload="onGalleryUpload"
                    @item:edit="onGalleryItemEdit"
                    @item:remove="onGalleryImageRemove"
                    :disabled="readonly"
                    @sort="onGallerySort"
                    :multiple="true"
                  ></VcGallery>
                </div>
              </VcCard>
            </VcForm>
          </div>
        </div>
        <div class="product-details__widgets">
          <VcWidget
            icon="fas fa-file-alt"
            title="Offers"
            :value="offersCount"
            :disabled="!product.isPublished"
            @click="openOffers"
          >
          </VcWidget>
        </div>
      </div>
    </VcContainer>
  </VcBlade>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  ref,
  unref,
  shallowRef,
} from "vue";

export default defineComponent({
  url: "/product",
});
</script>

<script lang="ts" setup>
import {
  useI18n,
  useUser,
  useAutosave,
  useForm,
  min,
  required,
  IParentCallArgs,
  IBladeEvent,
  IBladeToolbar,
  AssetsDetails,
  VcInput,
} from "@vc-shell/framework";
import { useProduct } from "../composables";
import { useOffers } from "../../offers/composables";
import {
  IProperty,
  IPropertyValue,
  PropertyValue,
  PropertyDictionaryItem,
} from "../../../api_client/catalog";
import MpProductStatus from "../components/MpProductStatus.vue";
import { OffersList } from "../../offers";
import { debounce, orderBy } from "lodash-es";
import {
  IImage,
  IProductDetails,
  ISellerProduct,
  Category,
  Image,
  Property,
} from "../../../api_client/marketplacevendor";
import { useIsFormValid, Field } from "vee-validate";

export interface Props {
  expanded?: boolean;
  closable?: boolean;
  param?: string;
}

type IBladeOptions = IBladeEvent & {
  bladeOptions: {
    editableAsset?: Image;
    images?: Image[];
    sortHandler?: (remove: boolean, localImage: IImage) => void;
    sellerProduct?: ISellerProduct;
  };
};

export interface Emits {
  (event: "parent:call", args: IParentCallArgs): void;
  (event: "close:blade"): void;
  (event: "open:blade", blade: IBladeOptions): void;
}

const props = withDefaults(defineProps<Props>(), {
  expanded: true,
  closable: true,
  param: undefined,
});

const emit = defineEmits<Emits>();

const { t } = useI18n();
const {
  product: productData,
  productDetails,
  loading,
  modified,
  validateProduct,
  loadProduct,
  createProduct,
  updateProductDetails,
  fetchCategories,
  revertStagedChanges,
  searchDictionaryItems,
} = useProduct();
const { loadAutosaved, resetAutosaved, savedValue } = useAutosave(
  productDetails,
  modified,
  props.param ?? "productsEdit"
);
const { searchOffers } = useOffers();
const { getAccessToken } = useUser();
const { setValues } = useForm({ validateOnMount: false });
const isValid = useIsFormValid();
const currentCategory = ref<Category>();
const offersCount = ref(0);
const categories = ref<Category[]>([]);
const productLoading = ref(false);
const fileUploading = ref(false);
let isOffersOpened = false;
const categoriesTotal = ref();

const filterTypes = ["Category", "Variation"];

const filteredProps = computed(() =>
  productDetails.value.properties.filter((x) => !filterTypes.includes(x.type))
);

const product = computed(() =>
  props.param ? productData.value : productDetails.value
);

const readonly = computed(
  () => props.param && !productData.value?.canBeModified
);

const validateGtin = [
  (value: string): string | boolean => {
    return min(value, [3]);
  },
  (value: string): string | boolean => {
    return required(value);
  },
  async (value: string): Promise<string | boolean> =>
    await validate("gtin", value),
];

const validate = debounce(
  async (fieldName: string, value: string): Promise<string | boolean> => {
    const sellerProduct = {
      ...product.value,
      [fieldName]: value,
    } as ISellerProduct;
    const productErrors = await validateProduct(sellerProduct);
    const errors = productErrors?.filter(
      (error) => error.propertyName.toLowerCase() === fieldName.toLowerCase()
    );
    return (
      !errors ||
      errors.length === 0 ||
      errors
        .map((error) =>
          t(`PRODUCTS.PAGES.DETAILS.ERRORS.${error?.errorCode}`, {
            value: error?.attemptedValue,
          })
        )
        .join("\n")
    );
  },
  1000,
  { leading: true, trailing: false }
);

const reload = async (fullReload: boolean) => {
  if (!modified.value && fullReload) {
    try {
      productLoading.value = true;
      if (props.param) {
        await loadProduct({ id: props.param });
      }
      loadAutosaved();

      if (savedValue.value) {
        productDetails.value = savedValue.value as IProductDetails;
        setValues({ ...productDetails.value });
      }

      const searchResult = await fetchCategories();
      categories.value = searchResult.results;
      categoriesTotal.value = searchResult.totalCount;
      if (productDetails.value?.categoryId) {
        await setCategoryItem(product.value.categoryId);
      }
    } finally {
      productLoading.value = false;
    }
  }
  //Load offers count to populate widget
  if (props.param) {
    offersCount.value = (
      await searchOffers({
        take: 0,
        sellerProductId: props.param,
      })
    )?.totalCount;
  }
};

onMounted(async () => {
  await reload(true);
});

const bladeToolbar = ref<IBladeToolbar[]>([
  {
    id: "save",
    title: computed(() => t("PRODUCTS.PAGES.DETAILS.TOOLBAR.SAVE.TITLE")),
    icon: "fas fa-save",
    async clickHandler() {
      if (isValid.value) {
        try {
          if (props.param) {
            await updateProductDetails(
              productData.value.id,
              productDetails.value
            );
          } else {
            await createProduct(productDetails.value);
          }
          resetAutosaved();
          emit("parent:call", {
            method: "reload",
          });
          if (!props.param) {
            emit("close:blade");
          }
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert(
          unref(
            computed(() => t("PRODUCTS.PAGES.DETAILS.TOOLBAR.SAVE.NOT_VALID"))
          )
        );
      }
    },
    disabled: computed(
      () =>
        !isValid.value ||
        (props.param &&
          !(productData.value?.canBeModified || modified.value)) ||
        (!props.param && !modified.value)
    ),
  },
  {
    id: "saveAndSendToApprove",
    title: computed(() =>
      t("PRODUCTS.PAGES.DETAILS.TOOLBAR.SAVEANDAPPROVE.TITLE")
    ),
    icon: "fas fa-share-square",
    isVisible: computed(() => !!props.param),
    async clickHandler() {
      if (isValid.value) {
        try {
          await updateProductDetails(
            productData.value.id,
            { ...productDetails.value },
            true
          );
          resetAutosaved();
          emit("parent:call", {
            method: "reload",
          });
          if (!props.param) {
            emit("close:blade");
          }
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert(
          unref(
            computed(() =>
              t("PRODUCTS.PAGES.DETAILS.TOOLBAR.SAVEANDAPPROVE.NOT_VALID")
            )
          )
        );
      }
    },
    disabled: computed(
      () =>
        !isValid.value ||
        !(
          productData.value?.canBeModified &&
          (productData.value?.hasStagedChanges || modified.value)
        )
    ),
  },
  {
    id: "revertStagedChanges",
    title: computed(() => t("PRODUCTS.PAGES.DETAILS.TOOLBAR.REVERT")),
    icon: "fas fa-undo",
    isVisible: computed(() => !!props.param),
    async clickHandler() {
      await revertStagedChanges(productData.value.id);
      resetAutosaved();
      emit("parent:call", {
        method: "reload",
      });
    },
    disabled: computed(
      () =>
        !(
          productData.value?.isPublished &&
          productData.value?.hasStagedChanges &&
          productData.value?.canBeModified
        )
    ),
  },
]);

const statusText = computed(() => {
  if (
    productData.value.publicationRequests &&
    productData.value.publicationRequests.length
  ) {
    return orderBy(
      productData.value.publicationRequests,
      ["createdDate"],
      ["desc"]
    )[0].comment;
  }
  return null;
});

const onGalleryUpload = async (files: FileList) => {
  try {
    fileUploading.value = true;
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      const authToken = await getAccessToken();
      const result = await fetch(
        `/api/assets?folderUrl=/catalog/${
          productData.value.id || productData.value.categoryId
        }`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const response = await result.json();
      if (response?.length) {
        const image = new Image(response[0]);
        image.createdDate = new Date();
        if (productDetails.value.images && productDetails.value.images.length) {
          const lastImageSortOrder =
            productDetails.value.images[productDetails.value.images.length - 1]
              .sortOrder;
          image.sortOrder = lastImageSortOrder + 1;
        } else {
          image.sortOrder = 0;
        }
        productDetails.value.images.push(image);
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    fileUploading.value = false;
  }

  files = null;
};

const onGalleryItemEdit = (item: Image) => {
  emit("open:blade", {
    component: shallowRef(AssetsDetails),
    bladeOptions: {
      editableAsset: item,
      images: productDetails.value.images,
      sortHandler: sortImage,
    },
  });
};

function sortImage(remove = false, localImage: IImage) {
  const images = productDetails.value.images;
  const image = new Image(localImage);
  if (images.length) {
    const imageIndex = images.findIndex((img) => img.id === localImage.id);

    remove ? images.splice(imageIndex, 1) : (images[imageIndex] = image);

    editImages(images);
  }
}

const editImages = (args: Image[]) => {
  productDetails.value.images = args;
};

const onGallerySort = (images: Image[]) => {
  productDetails.value.images = images;
};

const onGalleryImageRemove = (image: Image) => {
  if (
    window.confirm(
      unref(
        computed(() => t("PRODUCTS.PAGES.DETAILS.ALERTS.DELETE_CONFIRMATION"))
      )
    )
  ) {
    const imageIndex = productDetails.value.images.findIndex((img) => {
      if (img.id && image.id) {
        return img.id === image.id;
      } else {
        return img.url === image.url;
      }
    });
    productDetails.value.images.splice(imageIndex, 1);
  }
};

const setCategory = async (id: string) => {
  currentCategory.value = categories.value?.find((x) => x.id === id);
  if (!currentCategory.value) {
    await setCategoryItem(id);
  }

  const currentProperties = [...(productDetails.value?.properties || [])];
  productDetails.value.properties = [
    ...(currentCategory.value?.properties?.map(
      (prop) => new Property({ ...prop, isReadOnly: false })
    ) || []),
  ];
  productDetails.value.properties.forEach((property) => {
    const previousPropertyValue = currentProperties?.find(
      (item) => item.id === property.id
    );
    if (previousPropertyValue) {
      property.values = previousPropertyValue.values.map(
        (item) => new PropertyValue(item)
      );
    }
  });
};

async function setCategoryItem(id: string) {
  const fetchedCategory = await fetchCategories(undefined, 0, [id]);
  if (fetchedCategory.results && fetchedCategory.results.length) {
    currentCategory.value = fetchedCategory.results[0];
  }
}

async function loadDictionaries(
  property: IProperty,
  keyword?: string,
  skip?: number
) {
  return await searchDictionaryItems([property.id], keyword, skip);
}

const onCategoriesSearch = debounce(async (value: string) => {
  const searchResult = await fetchCategories(value);
  categories.value = searchResult.results;
  categoriesTotal.value = searchResult.totalCount;
}, 500);

const onSelectClose = async () => {
  const searchResult = await fetchCategories();
  categories.value = searchResult.results;
  if (
    currentCategory.value &&
    !categories.value.some((x) => x.id === currentCategory.value.id)
  ) {
    categories.value.push(currentCategory.value);
  }
};

async function onLoadMore() {
  const data = await fetchCategories(undefined, categories.value.length);
  categories.value.push(...data.results);
}

async function openOffers() {
  if (!isOffersOpened) {
    emit("open:blade", {
      component: shallowRef(OffersList),
      bladeOptions: {
        sellerProduct: productData.value,
      },
      onOpen() {
        isOffersOpened = true;
      },
      onClose() {
        isOffersOpened = false;
      },
    });
  }
}

async function onBeforeClose() {
  if (modified.value) {
    const confirmationStatus = confirm(
      unref(
        computed(() => t("PRODUCTS.PAGES.DETAILS.ALERTS.CLOSE_CONFIRMATION"))
      )
    );
    if (confirmationStatus) {
      resetAutosaved();
    }
    return confirmationStatus;
  }
}

function handleDictionaryValue(
  property: IProperty,
  valueId: string,
  dictionary: PropertyDictionaryItem[]
) {
  let valueName;
  const dictionaryItem = dictionary.find((x) => x.id === valueId);
  if (dictionaryItem) {
    valueName = dictionaryItem.alias;
  } else {
    valueName = property.name;
  }

  return {
    value: valueName,
    valueId,
  };
}

function setPropertyValue(
  property: IProperty,
  value: IPropertyValue,
  dictionary?: PropertyDictionaryItem[]
) {
  if (
    typeof value === "object" &&
    Object.prototype.hasOwnProperty.call(value, "length")
  ) {
    if (dictionary && dictionary.length) {
      property.values = (value as IPropertyValue[]).map((item) => {
        const handledValue = handleDictionaryValue(
          property,
          item.valueId,
          dictionary
        );
        return new PropertyValue(handledValue);
      });
    } else {
      property.values = (value as IPropertyValue[]).map(
        (item) => new PropertyValue(item)
      );
    }
  } else {
    if (dictionary && dictionary.length) {
      const handledValue = handleDictionaryValue(
        property,
        value as string,
        dictionary
      );
      property.values[0] = new PropertyValue({
        ...handledValue,
        isInherited: false,
      });
    } else {
      if (property.values[0]) {
        property.values[0].value = value;
      } else {
        property.values[0] = new PropertyValue({
          value,
          isInherited: false,
        });
      }
    }
  }
}

function getPropertyValue(
  property: IProperty,
  isDictionary?: boolean
): Record<string, unknown> {
  if (isDictionary) {
    return (
      property.values[0] &&
      (property.values[0].valueId as unknown as Record<string, unknown>)
    );
  }
  return property.values[0] && property.values[0].value;
}

function handleCollapsed(key: string, value: boolean): void {
  localStorage?.setItem(key, `${value}`);
}

function restoreCollapsed(key: string): boolean {
  return localStorage?.getItem(key) === "true";
}

defineExpose({
  editImages,
  onBeforeClose,
});
</script>

<style lang="scss">
.product-details {
  &__inner {
    @apply overflow-hidden min-h-full flex grow basis-0;
  }

  &__content {
    @apply border-r border-solid border-r-[#eaedf3] overflow-hidden grow basis-0;
  }

  &__decline-icon {
    @apply text-[#ff4a4a] mr-3;
  }

  .vc-app_phone &__inner {
    @apply flex-col;
  }

  .vc-app_phone &__content {
    @apply border-r-0 border-b border-solid border-b-[#eaedf3] overflow-visible;
  }

  .vc-app_phone &__widgets {
    @apply flex flex-row;
  }
}
</style>
