<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences"
          >Load Submitted Experiences</base-button
        >
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <ul v-else-if="!isLoading && results.length > 0">
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
      <p v-else>Please share your experience</p>
    </base-card>
  </section>
</template>

<script>
import axios from 'axios';
import SurveyResult from './SurveyResult.vue';

export default {
  props: ['survyResults'],
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: this.survyResults,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadExperiences() {
      this.isLoading = true;
      this.error = null;
      try {
        const { data } = await axios.get(
          'https://vue-learning-experience-fa082-default-rtdb.firebaseio.com/surveys.json'
        );
        console.log(data);
        for (const id in data) {
          this.results.push({
            id: id,
            name: data[id].userName,
            rating: data[id].rating,
          });
        }
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        console.log('fetch error', e);
        this.error = 'Failed to fetch data - try again';
      }
    },
  },
  mounted() {
    this.loadExperiences();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
