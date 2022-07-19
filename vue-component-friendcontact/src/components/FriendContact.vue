<template>
    <li>
        <h2>{{ name }} {{ isFavorite ? '⭐️' : '' }}</h2>
        <button @click="toggleDetails">
            {{ detailsShown ? 'Hide' : 'Show' }} Details
        </button>
        <button @click="toggleFavorite">Toggle Favorite</button>
        <ul v-if="detailsShown">
            <li><strong>Phone:</strong> {{ phoneNumber }}</li>
            <li><strong>Email:</strong> {{ emailAddress }}</li>
        </ul>
        <button @click="$emit('delete', id)">Delete</button>
    </li>
</template>

<script>
export default {
    // props: ['name', 'phoneNumber', 'emailAddress'],
    /* props validation using props definitions
        https://v3.vuejs.org/guide/component-props.html
    */
    props: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        emailAddress: {
            type: String,
            required: true,
            validator: function (value) {
                console.log(value)
                return true
            },
        },
        isFavorite: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    // emits: ['toggle-favorite'],
    /* custom event definition and validation */
    emits: {
        'toggle-favorite': function (id) {
            if (id) {
                console.log('id:', id)
                return true
            } else {
                console.warn('id is missing')
                return false
            }
        },
        delete: function () {
            return true
        },
    },
    data() {
        return {
            detailsShown: false,
        }
    },
    methods: {
        toggleDetails() {
            this.detailsShown = !this.detailsShown
        },
        toggleFavorite() {
            this.$emit('toggle-favorite', this.id)
        },
    },
}
</script>
