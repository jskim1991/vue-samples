<template>
    <ul>
        <li v-for="goal in goals" :key="goal">
            <slot :item="goal" anotherProp="additional stuff"></slot>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            goals: ['finish', 'learn'],
        }
    },
}
</script>
