<template>
  <div class="vc-app w-full h-full box-border flex flex-col m-0 vc-theme_light">
    <VcLoading v-if="loading" active></VcLoading>

    <VcLoginForm
      logo="/assets/logo-white.svg"
      background="/assets/background.jpg"
      :title="$t('SHELL.PASSWORDRESET.TITLE')"
    >
      <VcForm>
        <Field name="password" v-slot="{field, errorMessage, handleChange}" :modelValue="form.password" rules="required">
          <VcInput
            v-bind="field"
            ref="passwordField"
            class="mb-4 mt-1"
            :label="$t('SHELL.PASSWORDRESET.FIELDS.PASSWORD.LABEL')"
            :placeholder="$t('SHELL.PASSWORDRESET.FIELDS.PASSWORD.PLACEHOLDER')"
            type="password"
            :disabled="!form.tokenIsValid"
            v-model="form.password"
            @update:modelValue="(e) => {handleChange(e); validate()}"
            is-required
            :error-message="errorMessage"
          />
        </Field>
        <Field name="confirm_password" v-slot="{field, errorMessage, handleChange}" :modelValue="form.confirmPassword" rules="required">
          <VcInput
            v-bind="field"
            ref="confirmPasswordField"
            class="mb-4"
            :label="$t('SHELL.PASSWORDRESET.FIELDS.CONFIRM_PASSWORD.LABEL')"
            :placeholder="$t('SHELL.PASSWORDRESET.FIELDS.CONFIRM_PASSWORD.PLACEHOLDER')"
            :disabled="!form.tokenIsValid"
            v-model="form.confirmPassword"
            type="password"
            @update:modelValue="(e) => {handleChange(e); validate()}"
            @keyup.enter="resetPassword"
            is-required
            :error-message="errorMessage"
          />
        </Field>
        <div class="flex justify-center items-center pt-2">
          <span v-if="$isDesktop.value" class="grow basis-0"></span>
          <vc-button
            variant="primary"
            :disabled="disableButton"
            @click="resetPassword"
          >
            {{ $t("SHELL.PASSWORDRESET.SAVE_PASSWORD") }}
          </vc-button>
        </div>

        <VcHint
          class="mt-3 !text-[#f14e4e]"
          v-for="error in form.errors"
          :key="error"
        >
          <!-- TODO: stylizing-->
          {{ $t(`SHELL.PASSWORDRESET.ERRORS.${error}`) }}
        </VcHint>
      </VcForm>
    </VcLoginForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import {useForm, useI18n, useUser} from "@vc-shell/framework";
import {Field} from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  userId: {
    type: String,
    default: undefined,
  },
  userName: {
    type: String,
    default: undefined,
  },
  token: {
    type: String,
    default: undefined,
  },
});
const {
  validateToken,
  validatePassword,
  resetPasswordByToken,
  signIn,
  loading,
} = useUser();
const router = useRouter();
const { t } = useI18n();
const { validate: veeValidate } = useForm({ validateOnMount: false });

const form = reactive({
  isValid: false,
  tokenIsValid: false,
  errors: [],
  password: "",
  confirmPassword: "",
});

onMounted(async () => {
  form.tokenIsValid = await validateToken(props.userId, props.token);
  if (!form.tokenIsValid) {
    form.errors.push("Invalid-token");
  }
});

const disableButton = computed(() => {
  return (
    loading.value ||
    !form.password ||
    !form.confirmPassword ||
    (!form.isValid && form.tokenIsValid)
  );
});

const validate = async () => {
  if (form.tokenIsValid) {
    var errors = (await validatePassword(form.password)).errors;
    form.errors = errors.map((x) => x.code);
    if (form.confirmPassword !== form.password) {
      form.errors.push("Repeat-password");
    }
    form.isValid = form.errors.length == 0;
  }
};

const resetPassword = async () => {
  const { valid } = await veeValidate();
  if (valid) {
    var result = await resetPasswordByToken(
      props.userId,
      form.password,
      props.token
    );
    if (result.succeeded) {
      const result = await signIn(props.userName, form.password);
      if (result.succeeded) {
        router.push("/");
      } else {
        form.errors = [result.errorCode];
      }
    } else {
      form.errors = result.errors;
    }
  }
};
</script>
