<template>
  <VcStatus v-bind="statusStyles">
    {{
      $t(
        `IMPORT.PAGES.LIST.TABLE.STATUSES.${camelToSnake(
          statusText
        ).toUpperCase()}`
      )
    }}</VcStatus
  >
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ImportRunHistory } from "../../../api_client/marketplacevendor";
import { camelToSnake } from "@vc-shell/framework";

export interface Props {
  item: ImportRunHistory;
}

const props = withDefaults(defineProps<Props>(), {
  item: undefined,
});

const statusStyles = computed(() => {
  if (
    props.item.finished &&
    props.item.errorsCount >= props.item.processedCount
  ) {
    return {
      outline: false,
      variant: "danger",
    };
  } else if (
    props.item.finished &&
    props.item.errorsCount < props.item.processedCount &&
    props.item.errorsCount > 0
  ) {
    return {
      outline: false,
      variant: "warning",
    };
  } else if (props.item.finished && props.item.errorsCount === 0) {
    return {
      outline: false,
      variant: "success",
    };
  }
  return (
    !props.item.finished && {
      outline: true,
      variant: "warning",
    }
  );
});

const statusText = computed(() => {
  if (
    props.item.finished &&
    props.item.errorsCount >= props.item.processedCount
  ) {
    return "Failed";
  } else if (
    props.item.finished &&
    props.item.errorsCount < props.item.processedCount &&
    props.item.errorsCount > 0
  ) {
    return "CompletedWithErrors";
  } else if (props.item.finished && props.item.errorsCount === 0) {
    return "Completed";
  }
  return !props.item.finished && "Cancelled";
});
</script>
