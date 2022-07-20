<template>
  <base-card>
    <base-button
      @click="setSelectedTab('stored-resources')"
      :mode="storedResourcesFlatButtonMode"
      >Stored Resources</base-button
    >
    <base-button
      @click="setSelectedTab('add-resource')"
      :mode="addResourceFlatButtonMode"
      >Add Resource</base-button
    >
    <keep-alive>
      <component :is="selectedTab"></component>
    </keep-alive>
  </base-card>
</template>

<script>
import StoredResources from './StoredResources.vue';
import AddResource from './AddResource.vue';

export default {
  components: {
    StoredResources,
    AddResource,
  },
  data() {
    return {
      selectedTab: 'stored-resources',
      storedResources: [
        {
          id: 'official-guide',
          title: 'Official Guide',
          description: 'Official Vue.js reference',
          link: 'https://vuejs.org',
        },
        {
          id: 'google',
          title: 'Google',
          description: 'Search anything',
          link: 'https://google.com',
        },
      ],
    };
  },
  provide() {
    return {
      resources: this.storedResources,
      addResource: this.addResource,
      deleteResource: this.deleteResource,
    };
  },
  computed: {
    storedResourcesFlatButtonMode() {
      return this.selectedTab === 'stored-resources' ? null : 'flat';
    },
    addResourceFlatButtonMode() {
      return this.selectedTab === 'add-resource' ? null : 'flat';
    },
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    addResource(title, description, url) {
      const newResource = {
        id: new Date().toISOString(),
        title,
        description,
        link: url,
      };
      this.storedResources.unshift(newResource);
      this.selectedTab = 'stored-resources';
    },
    deleteResource(resourceId) {
      const resIndex = this.storedResources.findIndex(
        (r) => r.id === resourceId
      );
      console.log(resIndex);
      this.storedResources.splice(resIndex);
    },
  },
};
</script>
