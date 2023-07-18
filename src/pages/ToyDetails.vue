<template>
    <section class="toy-details main-layout" v-if="toy">
        <div class="details">
            <h4><RouterLink to="/toy">Back to list</RouterLink></h4>
            <h1>{{ toy.name }}</h1> <span> {{ toyStock }}</span>
            <p>Time Created: {{ toy.createdAt }}</p>
            <p>Labels: {{ toy.labels }}</p>
            <hr>
            <p>{{ toy.description }}</p>
            <p>Price: ${{ toy.price }}</p>
        </div>
    </section>
</template>

<script>
import { toyService } from '../services/toy.service.local'
import { showErrorMsg } from '../services/event-bus.service'

export default {
    data() {
        return {
            toy: null
        };
    },
    computed: {
        toyStock() {
            return this.toy.inStock ? "In Stock" : "OUT OF STOCK";
        }
    },
    created() {
        this.loadToy();
    },
    methods: {
        loadToy() {
            const { toyId } = this.$route.params;
            if (!toyId)
                return;
            toyService.getById(toyId)
                .then(toy => {
                this.toy = toy;
            })
                .catch(() => {
                showErrorMsg("Cannot load toy");
                this.$router.push("/toy");
            });
        }
    },
    watch: {
        toyId() {
            this.loadToy();
        }
    },
}
</script>
