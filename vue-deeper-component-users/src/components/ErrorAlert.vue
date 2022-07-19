<template>
    <dialog open>
        <slot></slot>
    </dialog>
</template>

<style scoped>
dialog {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
}
</style>
