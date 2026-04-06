<template>
{{ props.entryviewing.title }}
{{ props.entryviewing.content }}
{{ props.entryviewing.category }}
<button @click="goBack">back</button>
</template>

<script setup>
const props = defineProps({
    entryviewing: {
        title: String,
        category: String,
        date: Date,
        rating: Number,
        content: String
    }
})
const emit = defineEmits(['go-back'])
const goBack = ()=>{
    emit('go-back')
}
</script>