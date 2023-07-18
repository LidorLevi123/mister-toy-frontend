<template>
    <section class="toy-filter">
        <div class="radio-inputs">
            <label class="radio">
                <input type="radio" name="radio" @click="onSetFilterBy(null)" checked="">
                <span class="name">All</span>
            </label>
            <label class="radio">
                <input type="radio" name="radio" @click="onSetFilterBy(true)">
                <span class="name">In Stock</span>
            </label>
            
            <label class="radio">
                <input type="radio" name="radio" @click="onSetFilterBy(false)">
                <span class="name">Out of stock</span>
            </label>
        </div>

        <input placeholder="Search Toy" type="text" v-model="filterBy.name" >
    </section>
</template>

<script>
import { utilService } from '../services/util.service.js'

export default {
    data() {
        return {
            filterBy: {
                name: '',
                inStock: null
            },
        }
    },

    created() {
        this.filter = utilService.debounce(() => {
            this.$emit('filter', this.filterBy)
        }, 600)
    },

    methods: {
        onSetFilterBy(inStock) {
            this.filterBy.inStock = inStock
        }
    },

    watch: {
        filterBy: {
            handler() {
                this.filter()
            },
            deep: true,
        },
    },
}
</script>
