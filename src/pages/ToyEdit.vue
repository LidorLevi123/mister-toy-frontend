<template>
    <form @submit.prevent="save" class="toy-edit">
        <h2> {{ (toyToEdit._id) ? 'Edit' : 'Add' }} Toy</h2>
        <input v-model="toyToEdit.name" type="text" placeholder="Enter name">
        <input v-model.number="toyToEdit.price" type="number" placeholder="Enter price">
        <input v-model="toyToEdit.inStock" :checked="toyToEdit.inStock" type="checkbox"> In Stock?
        <hr />
        <RouterLink to="/toy">Cancel</RouterLink>
        <button :disabled="!isValid">Save</button>
    </form>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service.local'

export default {
    data() {
        return {
            toyToEdit: toyService.getEmptyToy()
        }
    },

    computed: {
        isValid() {
            return this.toyToEdit.name.length > 0
        }
    },

    created() {
        const { toyId } = this.$route.params
        if (!toyId) return

        toyService.getById(toyId)
            .then(toy => {
                this.toyToEdit = toy
            })
            .catch(err => {
                showErrorMsg('Cannot load toy for edit')
                this.$router.push('/toy')
            })
    },

    methods: {
        save() {
            this.$store.dispatch({type: 'saveToy', toyToSave: this.toyToEdit})
                .then(() => {
                    showSuccessMsg('Toy Saved!')
                    this.toyToEdit = toyService.getEmptyToy()
                    this.$router.push('/toy')
                })
                .catch(() => showErrorMsg('Could not save toy'))
        }
    }
}
</script>
