<template>
  <q-page padding class="flex flex-center bg-grey-1">
    <q-card style="width: 350px">
      <q-card-section>
        <h6 class="no-margin">Chat Application</h6>
      </q-card-section>
      <q-card-section>
        <q-form
          class="q-gutter-md"
        >
          <email-input
            v-model.trim="email"
          />
          <password-input
            v-model.trim="password"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Create new account"
          color="primary"
          flat
          class="q-ml-sm"
          @click="createAccount"
        />
        <q-btn
          label="Login"
          type="submit"
          color="primary"
          @click="onSubmit"
        />
      </q-card-actions>
      <q-inner-loading :showing="isLoading">
        <q-spinner size="50px" color="primary"/>
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Index',
  components: {
    PasswordInput: () => import('components/PasswordInput'),
    EmailInput: () => import('components/EmailInput'),
  },
  data: () => ({
    email: '',
    password: '',
  }),
  async beforeMount() {
    if (this.getUserId) {
      await this.$router.replace({ name: 'Contacts' });
    }
  },
  computed: {
    ...mapGetters('user', [
      'isLoading',
      'getUserId',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'signInUser',
    ]),
    async onSubmit() {
      try {
        await this.signInUser({
          email: this.email,
          password: this.password,
        });
        await this.$router.push({ name: 'Contacts' });
      } catch (e) {
        this.$q.dialog({
          message: e.message,
        });
      }
    },
    createAccount() {
      this.$router.push({ name: 'SignUp' });
    },
  },
};
</script>