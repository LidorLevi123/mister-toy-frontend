<template>
    <article @click="$router.push(`/toy/details/${toy._id}`)" class="toy-preview">
        <Spinner v-if="isImgLoading"/>
        <img class="toy-img" :src="imgUrl" @load="onImgLoad">
        <img v-if="!toy.inStock" class="sold-out-img" src="/out-of-stock.png" alt="outofstock.png">
        <span class="title">{{ toy.name }}</span>
        <span class="price">${{ toy.price }}</span>
    </article>
</template>

<script>
import Spinner from '@/cmps/Spinner.vue'

export default {
    props: {
        toy: { type: Object, required: true },
    },

    data() {
        return {
            isImgLoading: true,
            imgUrl: `https://robohash.org/${this.toy.name}/?set=set13`
        }
    },

    methods: {
        onImgLoad() {
            this.isImgLoading = false
        }
    },

    components: {
        Spinner
    }
}
</script>