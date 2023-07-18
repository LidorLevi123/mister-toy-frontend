<template>
    <article @click="$router.push(`/toy/details/${toy._id}`)" class="toy-preview">
        <img :src="`https://robohash.org/ + ${ toy.name }`">
        <span class="title">{{ toy.name }}</span>
        <span class="price">${{ toy.price }}</span>
    </article>
</template>

<script>
export default {
    props: {
        toy: { type: Object, required: true },
    }
}
</script>