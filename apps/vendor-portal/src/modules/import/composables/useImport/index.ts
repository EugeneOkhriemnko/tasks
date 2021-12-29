import { Ref, ref, watch, computed } from "vue";
import {
  IImporterMetadata,
  ImporterMetadata,
  VcmpSellerImportClient,
  PreviewDataQuery,
  ImportProfile,
  ImportProfileOptions,
  ImportDataPreview,
  ImportCancellationRequest,
  ImportPushNotification,
  ImportDataCommand,
} from "../../../../api_client/api-client";
import { useUser, useLogger, useNotifications } from "@virtoshell/core";

export interface IImportStatus {
  notification?: ImportPushNotification;
  jobId?: string;
  inProgress: boolean;
  progress: number;
}

export interface IUploadedFile {
  contentType?: string;
  createdDate?: string;
  name: string;
  relativeUrl?: string;
  size: number | string;
  type?: string;
  url?: string;
}

interface IUseImport {
  loading: Ref<boolean>;
  selectedImporter: Ref<IImporterMetadata>;
  uploadedFile: Ref<IUploadedFile>;
  importStatus: Ref<IImportStatus>;
  isValid: Ref<boolean>;
  importHistory: Ref<ImportPushNotification[]>;
  setFile(file: IUploadedFile): void;
  selectImporter(importer: IImporterMetadata): void;
  fetchDataImporters(): Promise<ImporterMetadata[]>;
  previewData(): Promise<ImportDataPreview>;
  startImport(): Promise<void>;
  cancelImport(): Promise<void>;
  clearImport(): void;
}
export default (): IUseImport => {
  const logger = useLogger();
  const { notifications } = useNotifications();
  const { getAccessToken } = useUser();
  const importCommand = ref<ImportDataCommand>({
    importProfile: { options: {} as ImportProfileOptions } as ImportProfile,
  } as ImportDataCommand);
  const importStatus = ref<IImportStatus>();
  const loading = ref(false);
  const uploadedFile = ref<IUploadedFile>();
  const selectedImporter = ref<IImporterMetadata>();
  const importHistory = ref<ImportPushNotification[]>([]);

  //subscribe to pushnotifcation and update the import progress status
  watch(
    () => notifications,
    (newVal) => {
      const notification = importStatus.value
        ? (newVal.value.find(
            (x) => x.id === importStatus.value.notification.id
          ) as ImportPushNotification)
        : // TODO: this is a temporary workaround to fill history from push notifications and it will be removed when we add support of execution history for import jobs to Api.
          (newVal.value.find(
            (x: ImportPushNotification) => x.jobId
          ) as ImportPushNotification);

      if (notification) {
        updateStatus(notification);
      }
      createImportHistory(newVal.value as ImportPushNotification[]);
    },
    { deep: true, immediate: true }
  );

  function createImportHistory(notifications: ImportPushNotification[]) {
    const finishedImports = notifications.filter(
      (notification) => notification.finished
    );

    if (finishedImports && finishedImports.length) {
      importHistory.value = finishedImports;
    }
  }

  function selectImporter(importer: IImporterMetadata) {
    importCommand.value.importProfile = new ImportProfile({
      dataImporterType: importer.importerType,
      options: importer.importerOptions,
    });
    selectedImporter.value = importer;
  }

  function setFile(file: IUploadedFile) {
    importCommand.value.importProfile.options.importFileUrl = file.url;
    uploadedFile.value = file;
  }

  function updateStatus(notification: ImportPushNotification) {
    importStatus.value = {
      notification: notification,
      jobId: notification.jobId,
      inProgress: !notification.finished,
      progress: (notification.processedCount / notification.totalCount) * 100,
    };
  }

  async function getApiClient() {
    const client = new VcmpSellerImportClient();
    client.setAuthToken(await getAccessToken());
    return client;
  }

  async function fetchDataImporters() {
    // TODO temporary workaround to get raw importers data
    const token = await getAccessToken();
    if (token) {
      const importers = await fetch("/api/vcmp/import/importers", {
        method: "GET",
        headers: {
          Accept: "text/plain",
          authorization: `Bearer ${token}`,
        },
      });

      return importers.text().then((response) => {
        return <ImporterMetadata[]>JSON.parse(response);
      });
    } else {
      return [];
    }
  }

  async function previewData() {
    const client = await getApiClient();
    try {
      loading.value = true;
      const previewDataQuery = new PreviewDataQuery({
        importProfile: importCommand.value.importProfile,
      });
      return client.preview(previewDataQuery);
    } catch (e) {
      logger.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function startImport() {
    const client = await getApiClient();
    try {
      loading.value = true;
      const notification = await client.runImport(importCommand.value);
      updateStatus(notification);
    } catch (e) {
      logger.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function cancelImport() {
    const client = await getApiClient();
    try {
      if (importStatus.value.inProgress) {
        await client.cancelJob(
          new ImportCancellationRequest({ jobId: importStatus.value.jobId })
        );
      }
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  function clearImport() {
    setFile({
      url: undefined,
      name: undefined,
      size: 0,
    });
    importStatus.value = undefined;
  }

  return {
    loading: computed(() => loading.value),
    selectedImporter: computed(() => selectedImporter.value),
    uploadedFile: computed(() => uploadedFile.value),
    importStatus: computed(() => importStatus.value),
    isValid: computed(() => !!(selectedImporter.value && uploadedFile.value)),
    importHistory: computed(() => importHistory.value),
    setFile,
    selectImporter,
    fetchDataImporters,
    previewData,
    startImport,
    cancelImport,
    clearImport,
  };
};
