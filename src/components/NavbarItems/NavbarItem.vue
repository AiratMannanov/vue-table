<template>
    <div v-if="!button.hidden" :to="button.link" class="navbarItem" @click="setActive(button.name)">
        <span>{{button.description}}</span>
        <i @click.stop="SET_SORTED(button.name)" v-show="button.active" class="ion-md-arrow-down"></i>
        <i @click="setHidden" class="ion-md-close-circle"></i>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "NavbarItem",
        props: {
            button: {
                type: Object,
                required: true
            }
        },
        data: () => ({
            name: {
                type: String,
                required: true
            }
        }),
        methods: {
            ...mapMutations(['SET_SORTED']),
            setActive: function (payload) {
                this.$store.commit('setActive', payload)
            },
            setHidden: function (event) {
                event.stopPropagation()
                const payload = this.button.name;
                this.$store.commit('setHidden', payload)
            }
        }
    }
</script>

<style lang="scss">
    .navbarItem {
        text-decoration: none;
        display: flex;
        margin-left: 0.5rem;
        font-size: 1.2rem;
        color: black;
        padding: 1rem;
        border-radius: 0.3rem;

        i {
            font-size: 1.3rem;
            margin-left: 0.5rem;
            color: gray;
        }
    }
    .navbarItem:hover {
        background-color: gray;
        color: white;
        i {
            color: white;
        }
    }
</style>