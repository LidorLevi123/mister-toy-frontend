<template>
    <section class="toy-list">
        <ul class="clean-list">
            <li v-for="toy in toys" :key="toy._id">
                <ToyPreview :toy="toy"/>
                <section class="actions">
                    <button class="btn-edit" @click="goTo(`/toy/edit/${toy._id}`)" title="Edit">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="btn-remove" @click="removeToy(toy)" title="Remove">
                        <i class="fa fa-trash"></i>
                    </button>
                </section>
            </li>
        </ul>
    </section>
</template>

<script>
import ToyPreview from '@/cmps/ToyPreview.vue'

export default {
    props: {
        toys: { type: Array, required: true }
    },

    methods: {
        removeToy(toy){
            this.$emit('remove', toy)
        },
        goTo(path) {
            this.$router.push(path)
        }
    },

    components: {
        ToyPreview,
    }
}
</script>