<template>
  <base-card>
    <base-dialogue
      v-if="inputIsInvalid"
      title="Invalid Input"
      @close="confirmError"
    >
      <template #default>
        <p>At least one value is invalid</p>
        <p>Make sure all inputs are not empty</p>
      </template>
      <template #actions>
        <base-button @click="confirmError">Okay</base-button>
      </template>
    </base-dialogue>
    <form @submit.prevent="submitResource">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" ref="titleInput" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          rows="3"
          ref="descriptionInput"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="link">Title</label>
        <input type="url" name="link" id="link" ref="linkInput" />
      </div>
      <div>
        <base-button type="submit">Add Resource</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import BaseDialogue from '../UI/BaseDialogue.vue';

export default {
  components: { BaseDialogue },
  inject: ['addResource'],
  data() {
    return {
      inputIsInvalid: false,
    };
  },
  methods: {
    confirmError() {
      this.inputIsInvalid = false;
    },
    submitResource() {
      const enteredTitle = this.$refs.titleInput.value;
      const enteredDescription = this.$refs.descriptionInput.value;
      const enteredLink = this.$refs.linkInput.value;

      if (
        enteredTitle.trim() === '' ||
        enteredDescription.trim() === '' ||
        enteredLink.trim() === ''
      ) {
        this.inputIsInvalid = true;
        return;
      }

      this.addResource(enteredTitle, enteredDescription, enteredLink);

      this.$refs.titleInput.value = '';
      this.$refs.descriptionInput.value = '';
      this.$refs.linkInput.value = '';
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
