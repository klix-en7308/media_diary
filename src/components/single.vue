<template>
    {{ props.title }}
    {{ props.category }}
    <button @click="deleteEntry">delete</button>
    <button @click="view">view</button>
</template>
<script setup>
const props = defineProps({
    id: Number,
    title: String,
    category: String,
    date: Date,
    rating: Number,
    content: String
});
const emit = defineEmits(['delete-entry', 'view-entry']);
const deleteEntry = ()=>{
    console.log(props.id);
    emit('delete-entry', props.id)
}
const view = ()=>[
    emit('view-entry', props.id)
]
</script>