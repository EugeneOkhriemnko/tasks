<template>
  <VcBlade
    v-loading="loading"
    :title="
      param && profileDetails
        ? profileDetails.name
        : $t('IMPORT.PAGES.PROFILE_DETAILS.TITLE')
    "
    width="50%"
    :toolbarItems="bladeToolbar"
    @close="$emit('page:close')"
    :closable="closable"
    :expanded="expanded"
  >
    <VcContainer>
      <VcRow>
        <VcCol>
          <VcInput
            class="p-3"
            :label="
              $t(
                'IMPORT.PAGES.PROFILE_DETAILS.IMPORT_INPUTS.PROFILE_NAME.TITLE'
              )
            "
            :placeholder="
              $t(
                'IMPORT.PAGES.PROFILE_DETAILS.IMPORT_INPUTS.PROFILE_NAME.PLACEHOLDER'
              )
            "
            :clearable="true"
            :required="true"
            :tooltip="
              $t(
                'IMPORT.PAGES.PROFILE_DETAILS.IMPORT_INPUTS.PROFILE_NAME.TOOLTIP'
              )
            "
            name="name"
            v-model="profileDetails.name"
          ></VcInput>
          <VcSelect
            class="p-3"
            :label="
              $t('IMPORT.PAGES.PROFILE_DETAILS.IMPORT_INPUTS.IMPORTER.TITLE')
            "
            :isRequired="true"
            :tooltip="
              $t('IMPORT.PAGES.PROFILE_DETAILS.IMPORT_INPUTS.IMPORTER.TOOLTIP')
            "
            name="importer"
            :options="dataImporters"
            :initialItem="importer"
            keyProperty="typeName"
            displayProperty="typeName"
            :isSearchable="true"
            :clearable="false"
            v-model="profileDetails.typeName"
            @update:modelValue="setImporter"
          ></VcSelect>
        </VcCol>
      </VcRow>
      <VcRow class="p-3" v-if="profileDetails.typeName">
        <VcCard
          :header="$t('IMPORT.PAGES.PROFILE_DETAILS.PROFILE_SETTINGS.TITLE')"
        >
          <VcRow>
            <VcCol>
              <div class="p-4">
                <a class="vc-link" :href="sampleTemplateUrl">{{
                  $t("IMPORT.PAGES.TEMPLATE.DOWNLOAD_TEMPLATE")
                }}</a>
                {{ $t("IMPORT.PAGES.TEMPLATE.FOR_REFERENCE") }}
              </div>

              <VcDynamicProperty
                class="px-4 pb-4"
                v-for="(setting, i) in profileDetails.settings"
                :key="`${profileDetails.id}_${i}`"
                :property="setting"
                :getter="getSettingsValue"
                :setter="setSettingsValue"
                :optionsGetter="loadDictionaries"
              >
              </VcDynamicProperty>
            </VcCol>
          </VcRow>
        </VcCard>
      </VcRow>
    </VcContainer>
    <import-confirmation-popup
      v-if="showConfirmation"
      :title="
        $t('IMPORT.PAGES.PROFILE_DETAILS.CONFIRM_POPUP.DELETE_IMPORTER.TITLE')
      "
      @close="showConfirmation = false"
      @confirm="deleteProfile"
    >
      <template v-slot:description>
        <p>
          {{
            $t(
              "IMPORT.PAGES.PROFILE_DETAILS.CONFIRM_POPUP.DELETE_IMPORTER.DESCRIPTION"
            )
          }}
        </p>
      </template>
    </import-confirmation-popup>
  </VcBlade>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, unref } from "vue";

export default defineComponent({
  url: "import-profile-details",
});
</script>

<script lang="ts" setup>
import { IBladeToolbar } from "../../../types";
import { useI18n, useAutosave } from "@vc-shell/core";
import ImportConfirmationPopup from "../components/ImportConfirmationPopup.vue";
import useImport from "../composables/useImport";
import {
  ImportProfile,
  ObjectSettingEntry,
} from "../../../api_client/marketplacevendor";
import { useForm } from "@vc-shell/ui";
import { useIsFormValid } from "vee-validate";

const props = defineProps({
  expanded: {
    type: Boolean,
    default: true,
  },

  closable: {
    type: Boolean,
    default: true,
  },

  param: {
    type: String,
    default: undefined,
  },

  options: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["page:close", "parent:call"]);
const { t } = useI18n();
const {
  dataImporters,
  profileDetails,
  loading,
  profile,
  modified,
  createImportProfile,
  loadImportProfile,
  deleteImportProfile,
  updateImportProfile,
  fetchDataImporters,
  setImporter,
} = useImport();
const { loadAutosaved, resetAutosaved, savedValue } = useAutosave(
  profileDetails,
  modified,
  props.param ?? "importProfile"
);
useForm({ validateOnMount: false });
const isValid = useIsFormValid();
const showConfirmation = ref(false);
const bladeToolbar = ref<IBladeToolbar[]>([
  {
    id: "save",
    title: computed(() => t("IMPORT.PAGES.PROFILE_DETAILS.TOOLBAR.SAVE")),
    icon: "fas fa-save",
    async clickHandler() {
      if (isValid.value) {
        try {
          if (props.param) {
            await updateImportProfile(profileDetails.value);
            emit("parent:call", {
              method: "reloadParent",
            });
          } else {
            await createImportProfile(profileDetails.value);
            emit("parent:call", {
              method: "reload",
            });
          }
          resetAutosaved();
          emit("page:close");
        } catch (err) {
          alert(err.message);
        }
      }
    },
    disabled: computed(() => {
      return (
        !isValid.value ||
        (props.param && !modified.value) ||
        (!props.param && !modified.value)
      );
    }),
  },
  {
    id: "cancel",
    title: computed(() => t("IMPORT.PAGES.PROFILE_DETAILS.TOOLBAR.CANCEL")),
    icon: "fas fa-ban",
    clickHandler() {
      resetAutosaved();
      emit("page:close");
    },
    isVisible: computed(() => !props.param),
  },
  {
    id: "delete",
    title: computed(() => t("IMPORT.PAGES.PROFILE_DETAILS.TOOLBAR.DELETE")),
    icon: "far fa-trash-alt",
    isVisible: computed(() => !!props.param),
    clickHandler() {
      resetAutosaved();
      showConfirmation.value = true;
    },
  },
]);

const sampleTemplateUrl = computed(() => {
  const importer = dataImporters.value.find(
    (x) => x.typeName === profileDetails.value.typeName
  );
  return profile.value.importer
    ? profile.value.importer.metadata &&
        profile.value.importer.metadata.sampleCsvUrl
    : importer
    ? importer.metadata && importer.metadata.sampleCsvUrl
    : "#";
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const title = computed(() =>
  props.options.importer
    ? props.options.importer.typeName
    : t("IMPORT.PAGES.PROFILE_DETAILS.TITLE")
);
const importer = computed(() => profile.value.importer);

onMounted(async () => {
  await fetchDataImporters();
  if (props.param) {
    await loadImportProfile({ id: props.param });
  }

  loadAutosaved();
  if (savedValue.value) {
    profileDetails.value = savedValue.value as ImportProfile;
  }
});

function getSettingsValue(setting: ObjectSettingEntry) {
  return setting.value;
}

function setSettingsValue(
  setting: ObjectSettingEntry,
  value: string | boolean
) {
  setting.value = value;
}

function loadDictionaries(setting: ObjectSettingEntry) {
  if (setting.allowedValues && setting.allowedValues.length) {
    return setting.allowedValues.map((val) => ({
      id: val,
      alias: val,
    }));
  }
}

async function deleteProfile() {
  showConfirmation.value = false;
  await deleteImportProfile({ id: props.param });

  emit("parent:call", {
    method: "reloadParent",
  });
  emit("page:close");
}

async function onBeforeClose() {
  if (modified.value) {
    const confirmationStatus = confirm(
      unref(
        computed(() =>
          t("IMPORT.PAGES.PROFILE_DETAILS.ALERTS.CLOSE_CONFIRMATION")
        )
      )
    );
    if (confirmationStatus) {
      resetAutosaved();
    }
    return confirmationStatus;
  }
}

defineExpose({
  onBeforeClose,
});
</script>