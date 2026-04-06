<style lang="css" scoped>
.maina{
    padding: 20px;
}
.title{
    font-family: monospace;
    font-size: 16px;
    letter-spacing: 1px;
    color: #8BABD6
}
.row{
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    color: #506a8d;
}
.normal{
    margin-top: 10px;
    font-family: Calibri;
    font-size: 12px;
}
button{
  background-color: #8BABD6;
  font-family: monospace;
  color: white;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;

}
button:hover{
  background-color: #184e96;
}
</style>
<template>
<div class="maina">
    <div class="title">
    {{ props.entryviewing.title }}
    </div>
    <div class="row">
        {{ props.entryviewing.category }} | {{ props.entryviewing.rating }} / 5 | {{ props.entryviewing.date.toDateString() }}
    </div>
    <div class="normal">
        {{ props.entryviewing.content }}
    </div>
    <button @click="goBack">back</button>
</div>
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